import { createError, defineEventHandler, getRouterParam } from 'h3'
import { getCollectionItem } from '../../../utils/contentStore'

type CollectionKind = 'blog' | 'referenciak' | 'service'

const COLLECTIONS: CollectionKind[] = ['blog', 'referenciak', 'service']

export default defineEventHandler((event) => {
  const kind = getRouterParam(event, 'kind') as CollectionKind
  const slug = getRouterParam(event, 'slug')

  if (!kind || !COLLECTIONS.includes(kind)) {
    throw createError({ statusCode: 404, statusMessage: 'Unknown collection' })
  }

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing slug' })
  }

  const payload = getCollectionItem(kind, slug)

  if (!payload) {
    throw createError({ statusCode: 404, statusMessage: 'Content item not found' })
  }

  return payload
})
