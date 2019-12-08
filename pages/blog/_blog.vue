<template>
  <article>
    <div class="head-img">
      <img class="img" loading="lazy" :src="blogPost.cover" alt="" />
    </div>

    <div class="mt-4">
      <h1>{{ blogPost.title }}</h1>
      <div v-html="$md.render(blogPost.body)" />
    </div>
  </article>
</template>
<script>
export default {
  async asyncData({ params, payload }) {
    if (payload) return { blogPost: payload }
    else
      return {
        blogPost: await require(`~/assets/content/blog/${params.blog}.json`)
      }
  }
}
</script>
