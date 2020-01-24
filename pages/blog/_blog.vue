<template>
  <div>
    <div class="head-img head-img--small">
      <img class="img" loading="lazy" src="/img/index-head2.jpg" alt="" />
      <h1 class="head__title">
        <span class="first-line">mérnöki <strong>megoldások</strong></span>
        mindenki számára
      </h1>
    </div>
    <article class="actual-content">
      <img
        class="img float-left mr-4 mb-4"
        width="50%"
        loading="lazy"
        :src="blogPost.cover"
        alt=""
      />
      <div>
        <h1 class="h3 mb-4">{{ blogPost.title }}</h1>
        <div class="text-justify" v-html="$md.render(blogPost.body)" />
      </div>
    </article>
  </div>
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
