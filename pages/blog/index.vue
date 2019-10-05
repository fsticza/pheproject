<template>
  <section>
    blog index
    <article v-for="post in blogPosts" :key="post.id">
      <h1>{{ post.title }}</h1>
      <div>yolo</div>
    </article>
  </section>
</template>
<script>
export default {
  computed: {
    blogPosts() {
      return this.$store.state.blogPosts
    }
  }
}
</script>
