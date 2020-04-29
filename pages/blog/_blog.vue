<template>
  <div>
    <div class="head-img head-img--small">
      <img
        class="img"
        srcset="
          /img/index-head2.jpg?nf_resize=fit&w=1590 1590w,
          /img/index-head2.jpg?nf_resize=fit&w=1110 1110w,
          /img/index-head2.jpg?nf_resize=fit&w=930   930w,
          /img/index-head2.jpg?nf_resize=fit&w=690   690w
        "
        sizes="(min-width: 1680px) 1590px, (min-width: 1200px) 1110px, (min-width: 992px) 930px, (min-width: 768px) 690px"
        src="/img/index-head2.jpg?nf_resize=fit&w=520"
        alt="PHE | Mérnöki megoldásoktól mindenkinek"
      />
      <h1 class="head__title">
        <span class="first-line">mérnöki <strong>megoldások</strong></span>
        mindenki számára
      </h1>
    </div>
    <article class="actual-content">
      <div class="row">
        <div class="col-sm-6">
          <div class="img-canvas" style="height: 400px">
            <img
              :srcset="
                `
                ${blogPost.cover}?nf_resize=fit&w=780 1590w,
                ${blogPost.cover}?nf_resize=fit&w=540 1110w,
                ${blogPost.cover}?nf_resize=fit&w=450   930w,
                ${blogPost.cover}?nf_resize=fit&w=240   690w
                `
              "
              :src="`${blogPost.cover}?nf_resize=fit&w=520`"
              :alt="`${blogPost.title} | PHE`"
              class="img"
              loading="lazy"
              sizes="(min-width: 1680px) 1590px, (min-width: 1200px) 1110px, (min-width: 992px) 930px, (min-width: 768px) 690px"
            />
          </div>
        </div>
        <div class="col-sm-6">
          <h1 class="h3 pt-3 mb-4">{{ blogPost.title }}</h1>
          <div v-html="$md.render(blogPost.body)" class="text-justify" />
        </div>
      </div>

      <LightGallery
        :images="blogPost.galleryImages"
        :index="galleryIndex"
        :disable-scroll="true"
        @close="galleryIndex = null"
      />

      <div class="images-wrapper mt-4">
        <div class="row">
          <div
            v-for="(url, imageIndex) in blogPost.galleryImages"
            :key="imageIndex"
            class="col-sm-6 col-md-4 col-lg-3 col-xl-2"
          >
            <div class="img-canvas my-2" style="height: 200px">
              <img
                :srcset="
                  `
                  ${url}?nf_resize=fit&w=240 1590w,
                  ${url}?nf_resize=fit&w=200 1110w,
                  ${url}?nf_resize=fit&w=200   930w,
                  ${url}?nf_resize=fit&w=240   690w
                  `
                "
                :src="`${url}?nf_resize=fit&w=520`"
                :alt="
                  `${blogPost.title} | PHE gallery image #${imageIndex + 1}`
                "
                @click="galleryIndex = imageIndex"
                class="img"
                style="cursor:pointer;"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>
<script>
export default {
  data() {
    return {
      galleryIndex: null
    }
  },
  async asyncData({ params, payload }) {
    if (payload) return { blogPost: payload }
    else
      return {
        blogPost: await require(`~/assets/content/blog/${params.blog}.json`)
      }
  },
  head() {
    return {
      title: `${this.blogPost.title} - PHE project development & consulting`
    }
  }
}
</script>
