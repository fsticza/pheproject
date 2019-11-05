<template>
  <div>
    <div
      class="head-img"
      style="background-image: url('img/construction-head-4.jpg')"
    ></div>
    <section>
      <article v-for="post in blogPosts" :key="post.id">
        <h1>{{ post.title }}</h1>
        <div>
          <NLink :to="{ name: 'blog-blog', params: { blog: post.slug } }">
            tovább
          </NLink>
        </div>
      </article>
    </section>
  </div>
</template>
<script>
export default {
  computed: {
    blogPosts() {
      console.log(this.$store.state.blogPosts)
      return this.$store.state.blogPosts
    }
  }
}
</script>
