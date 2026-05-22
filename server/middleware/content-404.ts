import {
  createError,
  defineEventHandler,
  getRequestURL,
  setResponseStatus
} from 'h3'
import { getCollectionItem } from '../utils/contentStore'

type Kind = 'blog' | 'referenciak'

export default defineEventHandler((event) => {
  const pathname = getRequestURL(event).pathname

  if (pathname.startsWith('/api/')) {
    return
  }

  const blogMatch = pathname.match(/^\/blog\/([^/]+)\/?$/)
  const refMatch = pathname.match(/^\/referenciak\/([^/]+)\/?$/)

  const kind: Kind | null = blogMatch ? 'blog' : refMatch ? 'referenciak' : null
  const slug = blogMatch?.[1] || refMatch?.[1] || null

  if (!kind || !slug) {
    return
  }

  const decodedSlug = decodeURIComponent(slug)
  const item = getCollectionItem(kind, decodedSlug)

  if (!item) {
    setResponseStatus(event, 404)
    throw createError({ statusCode: 404, statusMessage: 'Content item not found' })
  }
})
