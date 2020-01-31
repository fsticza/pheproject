<template>
  <div>
    <div class="head-img head-img--small">
      <img class="img" loading="lazy" src="/img/index-head2.jpg" alt="" />
      <h1 class="head__title">
        <span class="first-line">mérnöki <strong>megoldások</strong></span>
        mindenki számára
      </h1>
    </div>

    <div class="actual-content">
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
              <h1 class="h3 pt-3">{{ post.title }}</h1>
              <p>
                {{ post.description }}
              </p>
              <div>
                <NLink
                  class="more-link"
                  :to="{ name: 'blog-blog', params: { blog: post.slug } }"
                >
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
      return this.$store.state.blogPosts
    }
  }
}
</script>
