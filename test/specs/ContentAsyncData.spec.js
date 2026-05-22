const test = require('ava').default

let fetchApiJson

test.before(async () => {
  const mod = await import('../../utils/apiFetch.js')
  fetchApiJson = mod.fetchApiJson
})

test.afterEach.always(() => {
  if (global.__originalFetch) {
    global.fetch = global.__originalFetch
    delete global.__originalFetch
  }
})

test('fetchApiJson loads blog detail from local content without host', async (t) => {
  const result = await fetchApiJson(
    '/api/content/blog/ercsiben-elkeszult-a-gyartocsarnok-es-mar-csak-a-hivatalos-atadasra-var'
  )

  t.truthy(result)
  t.truthy(result.title)
  t.is(
    result.slug,
    'ercsiben-elkeszult-a-gyartocsarnok-es-mar-csak-a-hivatalos-atadasra-var'
  )
})

test('fetchApiJson loads references list from local content without host', async (t) => {
  const result = await fetchApiJson('/api/content/referenciak')

  t.true(Array.isArray(result))
  t.true(result.length > 0)
  t.truthy(result[0].slug)
})

test('fetchApiJson throws if endpoint is missing and no local fallback exists', async (t) => {
  global.__originalFetch = global.fetch
  global.fetch = () => Promise.resolve({ ok: false, status: 404 })

  const error = await t.throwsAsync(() => fetchApiJson('/api/content/unknown'))
  t.true(String(error.message).includes('API request failed (404)'))
})
