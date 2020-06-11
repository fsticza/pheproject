<template>
  <div>
    <div class="head-img head-img--small">
      <img
        :srcset="
          `
          ${imgPath}/img/index-head2.jpg?nf_resize=fit&w=1590 1650w,
          ${imgPath}/img/index-head2.jpg?nf_resize=fit&w=1110 1110w,
          ${imgPath}/img/index-head2.jpg?nf_resize=fit&w=930   930w,
          ${imgPath}/img/index-head2.jpg?nf_resize=fit&w=690   690w
        `
        "
        :src="`${imgPath}/img/index-head2.jpg?nf_resize=fit&w=520`"
        class="img"
        sizes="(min-width: 1680px) 1650px, (min-width: 1200px) 1110px, (min-width: 992px) 930px, (min-width: 768px) 690px"
        alt="PHE | Mérnöki megoldásoktól mindenkinek"
      />
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
          :class="idx === 0 ? 'active' : ''"
          class="my-4"
        >
          <div class="row">
            <div class="col-sm-4">
              <div class="img-canvas" style="height: 200px">
                <img
                  :srcset="
                    `
                    ${imgPath}${post.cover}?nf_resize=fit&w=520 1650w,
                    ${imgPath}${post.cover}?nf_resize=fit&w=350 1110w,
                    ${imgPath}${post.cover}?nf_resize=fit&w=290   930w,
                    ${imgPath}${post.cover}?nf_resize=fit&w=210   690w
                    `
                  "
                  :src="`${imgPath}${post.cover}?nf_resize=fit&w=520`"
                  :alt="`${post.title} | PHE`"
                  class="img"
                  loading="lazy"
                  sizes="(min-width: 1680px) 1650px, (min-width: 1200px) 1110px, (min-width: 992px) 930px, (min-width: 768px) 690px"
                />
              </div>
            </div>
            <div class="col-sm-8">
              <div class="d-flex h-100 flex-column">
                <h1 class="h3 pt-1">{{ post.title }}</h1>
                <p class="mb-auto">
                  {{ post.description }}
                </p>
                <NLink
                  :to="{ name: 'blog-blog', params: { blog: post.slug } }"
                  class="more-link mt-2 mb-md-2"
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
  data() {
    return {
      imgPath:
        process.env.NODE_ENV === 'development'
          ? ''
          : 'https://d1loboc6rox52k.cloudfront.net'
    }
  },
  computed: {
    blogPosts() {
      return this.$store.state.blogPosts
    }
  },
  head() {
    return {
      title: 'PHE project development & consulting - Extrák'
    }
  }
}
</script>
