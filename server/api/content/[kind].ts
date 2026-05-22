import { createError, defineEventHandler, getRouterParam } from 'h3'
import { getCollectionItems } from '../../utils/contentStore'

type CollectionKind = 'blog' | 'referenciak' | 'service'

const COLLECTIONS: CollectionKind[] = ['blog', 'referenciak', 'service']

export default defineEventHandler((event) => {
  const kind = getRouterParam(event, 'kind') as CollectionKind

  if (!kind || !COLLECTIONS.includes(kind)) {
    throw createError({ statusCode: 404, statusMessage: 'Unknown collection' })
  }

  return getCollectionItems(kind)
})
