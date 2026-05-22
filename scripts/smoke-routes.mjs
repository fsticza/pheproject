#!/usr/bin/env node

const baseUrl = process.env.SMOKE_BASE_URL || process.argv[2]
const strictDynamic = process.env.SMOKE_STRICT_DYNAMIC === '1'

if (!baseUrl) {
  console.error(
    'Usage: SMOKE_BASE_URL=https://<host> node scripts/smoke-routes.mjs'
  )
  process.exit(1)
}

const normalizedBase = baseUrl.replace(/\/$/, '')

const routes = [
  { path: '/', expectTitle: 'PHE project development & consulting' },
  { path: '/szolgaltatasok', expectStatus: 200, expectTitle: 'Szolgáltatások' },
  { path: '/rolunk', expectStatus: 200, expectTitle: 'Rólunk' },
  { path: '/referenciak', expectStatus: 200, expectTitle: 'Referenciák' },
  { path: '/blog', expectStatus: 200, expectTitle: 'Extrák' },
  { path: '/kapcsolat', expectStatus: 200, expectTitle: 'Kapcsolat' },
  {
    path: '/admin/',
    expectStatus: 200,
    expectContainsAny: ['Decap CMS', 'netlify-cms', 'Content Manager']
  }
]

const decodeHtmlEntities = (value) => {
  return value
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
}

const extractTitle = (html) => {
  const match = html.match(/<title[^>]*>(.*?)<\/title>/is)
  return match ? decodeHtmlEntities(match[1]).trim() : ''
}

const fetchHtml = async (path) => {
  const response = await fetch(`${normalizedBase}${path}`, {
    redirect: 'follow'
  })

  if (!response.ok) {
    throw new Error(`Page ${path} failed with HTTP ${response.status}`)
  }

  return response.text()
}

const discoverSlugFromHtml = (html, sectionPath) => {
  const escapedSection = sectionPath.replace('/', '\\/')
  const regex = new RegExp(`${escapedSection}\\/([a-z0-9-]+)`, 'gi')
  const matches = [...html.matchAll(regex)]

  for (const match of matches) {
    const slug = match[1]
    if (slug && slug !== 'does-not-exist') {
      return slug
    }
  }

  return null
}

let failed = false

const fetchJson = async (path) => {
  const response = await fetch(`${normalizedBase}${path}`, {
    redirect: 'follow'
  })

  if (!response.ok) {
    throw new Error(`API ${path} failed with HTTP ${response.status}`)
  }

  return response.json()
}

try {
  const [blogItems, referenceItems] = await Promise.all([
    fetchJson('/api/content/blog'),
    fetchJson('/api/content/referenciak')
  ])

  if (Array.isArray(blogItems) && blogItems[0] && blogItems[0].slug) {
    routes.push({ path: `/blog/${blogItems[0].slug}`, expectStatus: 200 })
  }

  if (
    Array.isArray(referenceItems) &&
    referenceItems[0] &&
    referenceItems[0].slug
  ) {
    routes.push({
      path: `/referenciak/${referenceItems[0].slug}`,
      expectStatus: 200
    })
  }

  routes.push({ path: '/blog/does-not-exist', expectStatus: 404 })
  routes.push({ path: '/referenciak/does-not-exist', expectStatus: 404 })
} catch (error) {
  let discoveredBlogSlug = null
  let discoveredReferenceSlug = null

  try {
    const [blogHtml, referenceHtml] = await Promise.all([
      fetchHtml('/blog'),
      fetchHtml('/referenciak')
    ])

    discoveredBlogSlug = discoverSlugFromHtml(blogHtml, '/blog')
    discoveredReferenceSlug = discoverSlugFromHtml(
      referenceHtml,
      '/referenciak'
    )
  } catch (htmlError) {
    console.error(
      `WARN setup: HTML fallback discovery failed: ${htmlError.message}`
    )
  }

  if (discoveredBlogSlug) {
    routes.push({ path: `/blog/${discoveredBlogSlug}`, expectStatus: 200 })
  }

  if (discoveredReferenceSlug) {
    routes.push({
      path: `/referenciak/${discoveredReferenceSlug}`,
      expectStatus: 200
    })
  }

  routes.push({ path: '/blog/does-not-exist', expectStatus: 404 })
  routes.push({ path: '/referenciak/does-not-exist', expectStatus: 404 })

  if (discoveredBlogSlug && discoveredReferenceSlug) {
    console.error(
      `WARN setup: ${error.message}; using HTML fallback for dynamic route discovery`
    )
  } else {
    const prefix = strictDynamic ? 'FAIL' : 'WARN'
    console.error(`${prefix} setup: ${error.message}`)

    if (strictDynamic) {
      failed = true
    }
  }
}

for (const route of routes) {
  const url = `${normalizedBase}${route.path}`

  try {
    const response = await fetch(url, { redirect: 'follow' })

    if (route.expectStatus && response.status !== route.expectStatus) {
      failed = true
      console.error(
        `FAIL ${route.path}: expected HTTP ${route.expectStatus}, got ${response.status}`
      )
      continue
    }

    if (!route.expectStatus && !response.ok) {
      failed = true
      console.error(`FAIL ${route.path}: HTTP ${response.status}`)
      continue
    }

    const body = await response.text()

    if (route.expectTitle) {
      const title = extractTitle(body)
      if (!title.includes(route.expectTitle)) {
        failed = true
        console.error(
          `FAIL ${route.path}: expected title containing "${route.expectTitle}", got "${title}"`
        )
        continue
      }
    }

    if (route.expectContains && !body.includes(route.expectContains)) {
      failed = true
      console.error(
        `FAIL ${route.path}: expected body containing "${route.expectContains}"`
      )
      continue
    }

    if (route.expectContainsAny) {
      const found = route.expectContainsAny.some((marker) =>
        body.includes(marker)
      )

      if (!found) {
        failed = true
        console.error(
          `FAIL ${route.path}: expected body containing one of ${JSON.stringify(
            route.expectContainsAny
          )}`
        )
        continue
      }
    }

    console.log(`PASS ${route.path}`)
  } catch (error) {
    failed = true
    console.error(`FAIL ${route.path}: ${error.message}`)
  }
}

if (failed) {
  process.exit(1)
}

console.log('Smoke checks passed.')
