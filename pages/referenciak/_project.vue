<template>
  <article>
    <div class="head-img head-img--small">
      <img class="img" loading="lazy" src="/img/index-head2.jpg" alt="" />
      <h1 class="head__title">
        <span class="first-line">mérnöki <strong>megoldások</strong></span>
        mindenki számára
      </h1>
    </div>

    <div class="actual-content">
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
