import { computed } from 'vue'
import { defineNuxtPlugin, useHead, useRoute } from '#imports'

const TITLE_BY_PATH: Record<string, string> = {
  '/szolgaltatasok': 'PHE project development & consulting - Szolgáltatások',
  '/rolunk': 'PHE project development & consulting - Rólunk',
  '/referenciak': 'PHE project development & consulting - Referenciák',
  '/blog': 'PHE project development & consulting - Extrák',
  '/kapcsolat': 'PHE project development & consulting - Kapcsolat'
}

export default defineNuxtPlugin(() => {
  const route = useRoute()

  useHead(
    computed(() => {
      const title = TITLE_BY_PATH[route.path]

      if (!title) {
        return {}
      }

      return { title }
    })
  )
})
