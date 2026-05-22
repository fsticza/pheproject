import bundledContent from './contentBundle.json'

type CollectionKind = 'blog' | 'referenciak' | 'service'

type ContentItem = Record<string, unknown>

const collections = bundledContent as Record<
  CollectionKind,
  Array<ContentItem & { slug: string }>
>

export const getCollectionItems = (kind: CollectionKind) => {
  const items = collections[kind] || []

  if (kind === 'blog') {
    return [...items].sort((a, b) => {
      const aDate = new Date(String(a.date)).getTime()
      const bDate = new Date(String(b.date)).getTime()
      return bDate - aDate
    })
  }

  return [...items]
}

export const getCollectionItem = (kind: CollectionKind, slug: string) => {
  const items = collections[kind] || []
  return items.find((item) => item.slug === slug) || null
}
