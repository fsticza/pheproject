export const state = () => ({
  blogPosts: [],
  projects: [],
  projectTags: [
    { label: 'Minden típus', value: 'ALL' },
    { label: 'Lebonyolítás', value: 'IMPL' },
    { label: 'Projektmenedzsment', value: 'PM' },
    { label: 'Műszaki ellenőrzés', value: 'TS' },
    { label: 'Műszaki tanácsadás', value: 'TC' },
    { label: 'Ingatlanfejelsztés', value: 'RED' }
  ]
})

export const mutations = {
  setBlogPosts(state, list) {
    state.blogPosts = list
  },
  setProjects(state, list) {
    state.projects = list
  },
  setServices(state, list) {
    state.services = list
  }
}

export const actions = {
  async nuxtServerInit({ commit }) {
    const blogFiles = await require.context(
      '~/assets/content/blog/',
      false,
      /\.json$/
    )
    const blogPosts = blogFiles
      .keys()
      .map((key) => {
        const res = blogFiles(key)
        res.slug = key.slice(2, -5)
        return res
      })
      .sort((post1, post2) => {
        return new Date(post1.date).getTime() > new Date(post2.date).getTime()
          ? -1
          : 1
      })
    await commit('setBlogPosts', blogPosts)

    const projectFiles = await require.context(
      '~/assets/content/project/',
      false,
      /\.json$/
    )
    const projects = projectFiles.keys().map((key) => {
      const res = projectFiles(key)
      res.slug = key.slice(2, -5)
      return res
    })
    await commit('setProjects', projects)

    const serviceFiles = await require.context(
      '~/assets/content/service/',
      false,
      /\.json$/
    )
    const services = serviceFiles.keys().map((key) => {
      const res = serviceFiles(key)
      res.slug = key.slice(2, -5)
      return res
    })
    await commit('setServices', services)
  }
}
