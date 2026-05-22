#!/usr/bin/env node

import { spawn } from 'node:child_process'

const baseUrl = process.env.CUTOVER_BASE_URL || process.argv[2]
const strictDynamic = process.env.CUTOVER_STRICT_DYNAMIC === '1'

if (!baseUrl) {
  console.error(
    'Usage: CUTOVER_BASE_URL=https://<host> node scripts/cutover-preflight.mjs'
  )
  process.exit(1)
}

const run = (command, args, extraEnv = {}, options = {}) => {
  const { captureOutput = false } = options

  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: captureOutput ? 'pipe' : 'inherit',
      env: { ...process.env, ...extraEnv }
    })

    let output = ''

    if (captureOutput) {
      child.stdout.on('data', (chunk) => {
        const text = chunk.toString()
        output += text
        process.stdout.write(text)
      })

      child.stderr.on('data', (chunk) => {
        const text = chunk.toString()
        output += text
        process.stderr.write(text)
      })
    }

    child.on('close', (code) => {
      if (code === 0) {
        resolve(output)
      } else {
        reject(
          new Error(`${command} ${args.join(' ')} failed with code ${code}`)
        )
      }
    })
  })
}

const main = async () => {
  const hiddenBuildErrorPattern = /\[500\]|internal server error|Nuxt Fatal Error/i

  console.log('Running cutover preflight...')

  await run('npm', ['run', 'lint'])
  await run('npm', ['test'])
  const buildOutput = await run(
    'npm',
    ['run', 'build'],
    {},
    {
      captureOutput: true
    }
  )

  if (hiddenBuildErrorPattern.test(buildOutput)) {
    throw new Error(
      'npm run build produced hidden prerender/runtime errors in logs.'
    )
  }

  await run('npm', ['run', 'smoke:routes'], {
    SMOKE_BASE_URL: baseUrl,
    SMOKE_STRICT_DYNAMIC: strictDynamic ? '1' : '0'
  })

  await run('npm', ['run', 'monitor:runtime'], {
    MONITOR_BASE_URL: baseUrl
  })

  console.log('Cutover preflight passed.')
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
