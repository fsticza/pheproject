<template>
  <article>
    <div class="mt-4">
      <div>
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
