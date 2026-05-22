const parseContentEndpoint = (endpoint) => {
  const parts = endpoint
    .split('?')[0]
    .split('/')
    .filter(Boolean)

  if (parts.length < 3 || parts[0] !== 'api' || parts[1] !== 'content') {
    return null
  }

  return {
    kind: parts[2],
    slug: parts[3] || null
  }
}

const loadContentLocally = async (endpoint) => {
  const parsed = parseContentEndpoint(endpoint)

  if (!parsed) {
    return null
  }

  const [
    { readFileSync, readdirSync, existsSync },
    pathModule
  ] = await Promise.all([import('node:fs'), import('node:path')])

  const levels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const kindPathCandidates = levels.map((level) => {
    const up = new Array(level).fill('..')
    return pathModule.resolve(
      process.cwd(),
      ...up,
      'assets/content',
      parsed.kind
    )
  })

  const kindPath = kindPathCandidates.find((candidate) => existsSync(candidate))

  if (!kindPath) {
    return null
  }

  if (parsed.slug) {
    const filePath = pathModule.join(kindPath, `${parsed.slug}.json`)

    if (!existsSync(filePath)) {
      return null
    }

    const payload = JSON.parse(readFileSync(filePath, 'utf8'))
    payload.slug = parsed.slug
    return payload
  }

  const items = readdirSync(kindPath)
    .filter((fileName) => fileName.endsWith('.json'))
    .map((fileName) => {
      const filePath = pathModule.join(kindPath, fileName)
      const payload = JSON.parse(readFileSync(filePath, 'utf8'))
      payload.slug = fileName.slice(0, -5)
      return payload
    })

  if (parsed.kind === 'blog') {
    items.sort((a, b) => {
      const aDate = new Date(String(a.date)).getTime()
      const bDate = new Date(String(b.date)).getTime()
      return bDate - aDate
    })
  }

  return items
}

export async function fetchApiJson(endpoint, req) {
  const hasHost = Boolean(req && req.headers && req.headers.host)
  const isDevelopment = process.env.NODE_ENV === 'development'
  const isBrowser = typeof window !== 'undefined'
  const isServerRuntime = !isBrowser

  if (isServerRuntime && isDevelopment) {
    const localContent = await loadContentLocally(endpoint)

    if (localContent !== null) {
      return localContent
    }
  }

  if (isServerRuntime && !hasHost) {
    const localContent = await loadContentLocally(endpoint)

    if (localContent !== null) {
      return localContent
    }
  }

  const forwardedProtoHeader =
    req && req.headers ? req.headers['x-forwarded-proto'] : ''
  const forwardedProto = String(forwardedProtoHeader || '')
    .split(',')[0]
    .trim()
  const protocol = forwardedProto || 'http'

  const envBaseUrl =
    process.env.URL ||
    process.env.DEPLOY_URL ||
    process.env.DEPLOY_PRIME_URL ||
    process.env.SITE_URL ||
    ''
  const normalizedEnvBaseUrl = envBaseUrl
    ? envBaseUrl.startsWith('http')
      ? envBaseUrl
      : `https://${envBaseUrl}`
    : ''

  const baseUrl = isServerRuntime
    ? req && req.headers && req.headers.host
      ? `${protocol}://${req.headers.host}`
      : normalizedEnvBaseUrl
    : ''

  let response

  try {
    response = await fetch(`${baseUrl}${endpoint}`)
  } catch (error) {
    if (isServerRuntime) {
      const localContent = await loadContentLocally(endpoint)

      if (localContent !== null) {
        return localContent
      }
    }

    throw error
  }

  if (!response.ok) {
    throw new Error(`API request failed (${response.status}): ${endpoint}`)
  }

  return response.json()
}
