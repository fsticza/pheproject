#!/usr/bin/env node

import fs from 'node:fs'
import { spawn } from 'node:child_process'

const outputEntry = '.output/server/index.mjs'

const runBuild = () => {
  return new Promise((resolve, reject) => {
    const child = spawn('npm', ['run', 'build'], {
      stdio: 'inherit',
      env: process.env
    })

    child.on('close', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`npm run build failed with code ${code}`))
      }
    })
  })
}

const main = async () => {
  if (fs.existsSync(outputEntry)) {
    return
  }

  console.log(`Missing ${outputEntry}. Running npm run build before start...`)
  await runBuild()

  if (!fs.existsSync(outputEntry)) {
    throw new Error(
      `Build completed but ${outputEntry} was not generated. Cannot continue.`
    )
  }
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
