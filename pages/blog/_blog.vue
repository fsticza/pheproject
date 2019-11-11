<template>
  <article>
    <div class="head-img">
      <img class="img" loading="lazy" :src="blogPost.cover" alt="" />
    </div>

    <h1>{{ blogPost.title }}</h1>
    <div v-html="$md.render(blogPost.body)" />
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
