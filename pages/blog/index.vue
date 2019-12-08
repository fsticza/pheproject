<template>
  <div>
    <div class="head-img">
      <img
        class="img"
        loading="lazy"
        src="/img/construction-head-4.jpg"
        alt=""
      />
    </div>

    <div class="mt-4">
      <section>
        <article
          v-for="(post, idx) in blogPosts"
          :key="idx"
          class="my-4"
          :class="idx === 0 ? 'active' : ''"
        >
          <div class="row align-items-center">
            <div class="col-sm-4">
              <div class="img-canvas" style="height: 200px">
                <img loading="lazy" :src="post.cover" class="img" alt="..." />
              </div>
            </div>
            <div class="col-sm-8">
              <h1>{{ post.title }}</h1>
              <p>
                {{ post.description }}
              </p>
              <div>
                <NLink :to="{ name: 'blog-blog', params: { blog: post.slug } }">
                  Bővebben
                </NLink>
              </div>
            </div>
          </div>
        </article>
      </section>
    </div>
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
