export const state = () => ({
  blogPosts: [],
  projects: []
})

export const mutations = {
  setBlogPosts(state, list) {
    state.blogPosts = list
  },
  setProjects(state, list) {
    state.projects = list
  }
}

export const actions = {
  async nuxtServerInit({ commit }) {
    const blogFiles = await require.context(
      '~/assets/content/blog/',
      false,
      /\.json$/
    )
    const blogPosts = blogFiles.keys().map((key) => {
      const res = blogFiles(key)
      res.slug = key.slice(2, -5)
      return res
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
  }
}
