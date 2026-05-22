#!/usr/bin/env node

import { spawn } from 'node:child_process'

const baseUrl = process.env.POSTDEPLOY_BASE_URL || process.argv[2]

if (!baseUrl) {
  console.error(
    'Usage: POSTDEPLOY_BASE_URL=https://<host> node scripts/postdeploy-verify.mjs'
  )
  process.exit(1)
}

const normalizedBase = baseUrl.replace(/\/$/, '')

const run = (command, args, extraEnv = {}) => {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      env: { ...process.env, ...extraEnv }
    })

    child.on('close', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(
          new Error(`${command} ${args.join(' ')} failed with code ${code}`)
        )
      }
    })
  })
}

const verifyContactPageMarkup = async () => {
  const response = await fetch(`${normalizedBase}/kapcsolat`, {
    redirect: 'follow'
  })

  if (!response.ok) {
    throw new Error(`/kapcsolat returned HTTP ${response.status}`)
  }

  const html = await response.text()

  if (!/action=['"]\/kapcsolat\/['"]/i.test(html)) {
    throw new Error(
      'Contact form action /kapcsolat/ not found in response HTML'
    )
  }

  if (!/method=['"]post['"]/i.test(html)) {
    throw new Error('Contact form POST method is missing from /kapcsolat HTML')
  }

  if (!html.includes('<textarea') || !html.includes('</textarea>')) {
    throw new Error(
      'Contact message textarea markup is incomplete in /kapcsolat HTML'
    )
  }

  if (html.match(/<textarea[^>]*\/>/i)) {
    throw new Error('Detected self-closing textarea in /kapcsolat HTML')
  }

  if (!/name=['"]form-name['"]/i.test(html)) {
    console.error(
      'WARN /kapcsolat: Netlify form-name hidden input not found in HTML snapshot'
    )
  }

  if (!/name=['"]bot-field['"]/i.test(html)) {
    console.error(
      'WARN /kapcsolat: Netlify honeypot field not found in HTML snapshot'
    )
  }

  console.log('PASS /kapcsolat contact form markup verified')
}

const main = async () => {
  console.log('Running post-deploy verification...')

  await run('npm', ['run', 'smoke:routes'], {
    SMOKE_BASE_URL: normalizedBase,
    SMOKE_STRICT_DYNAMIC: '1'
  })

  await run('npm', ['run', 'monitor:runtime'], {
    MONITOR_BASE_URL: normalizedBase
  })

  await verifyContactPageMarkup()

  console.log('Post-deploy verification passed.')
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
