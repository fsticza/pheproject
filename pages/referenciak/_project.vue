<template>
  <article>
    <div class="head-img">
      <img class="img" loading="lazy" :src="project.image" alt="" />
    </div>

    <div class="mt-4">
      <h1>{{ project.title }}</h1>
      <div v-html="$md.render(project.body)" />
    </div>
  </article>
</template>
<script>
export default {
  async asyncData({ params, payload }) {
    if (payload) return { project: payload }
    else
      return {
        project: await require(`~/assets/content/project/${params.project}.json`)
      }
  }
}
</script>
