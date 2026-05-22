#!/usr/bin/env node

const baseUrl = process.env.MONITOR_BASE_URL || process.argv[2]
const maxMs = Number(process.env.MONITOR_MAX_MS || 3000)

if (!baseUrl) {
  console.error(
    'Usage: MONITOR_BASE_URL=https://<host> node scripts/monitor-runtime.mjs'
  )
  process.exit(1)
}

const normalizedBase = baseUrl.replace(/\/$/, '')

const checks = [
  { path: '/' },
  { path: '/szolgaltatasok' },
  { path: '/rolunk' },
  { path: '/referenciak' },
  { path: '/blog' },
  { path: '/kapcsolat' },
  { path: '/admin/' }
]

let failed = false

for (const check of checks) {
  const url = `${normalizedBase}${check.path}`
  const started = Date.now()

  try {
    const response = await fetch(url, { redirect: 'follow' })
    const elapsedMs = Date.now() - started

    if (!response.ok) {
      failed = true
      console.error(
        `FAIL ${check.path} status=${response.status} time=${elapsedMs}ms`
      )
      continue
    }

    if (elapsedMs > maxMs) {
      failed = true
      console.error(
        `FAIL ${check.path} slow=${elapsedMs}ms threshold=${maxMs}ms`
      )
      continue
    }

    console.log(
      `PASS ${check.path} status=${response.status} time=${elapsedMs}ms`
    )
  } catch (error) {
    failed = true
    const elapsedMs = Date.now() - started
    console.error(
      `FAIL ${check.path} error=${error.message} time=${elapsedMs}ms`
    )
  }
}

if (failed) {
  process.exit(1)
}

console.log('Runtime monitor checks passed.')
