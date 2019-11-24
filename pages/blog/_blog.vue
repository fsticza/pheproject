<template>
  <article>
    <div class="head-img">
      <img class="img" loading="lazy" :src="blogPost.cover" alt="" />
    </div>

    <div class="row mt-4">
      <div class="col-sm-10 offset-sm-1">
        <h1>{{ blogPost.title }}</h1>
        <div v-html="$md.render(blogPost.body)" />
      </div>
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
