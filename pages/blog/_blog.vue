<template>
  <div>
    <div class="head-img head-img--small">
      <HeadImg />
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
                ${imgPath}${blogPost.cover}?nf_resize=fit&w=810 1650w
                `
              "
              :src="`${imgPath}${blogPost.cover}?nf_resize=fit&w=540`"
              :alt="`${blogPost.title} | PHE`"
              class="img"
              loading="lazy"
              sizes="(min-width: 1680px) 1650px"
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
                  ${imgPath}${url}?nf_resize=fit&w=240 690w
                  `
                "
                :src="`${imgPath}${url}?nf_resize=fit&w=520`"
                :alt="
                  `${blogPost.title} | PHE gallery image #${imageIndex + 1}`
                "
                @click="galleryIndex = imageIndex"
                sizes="(min-width: 768px) 690px"
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
import HeadImg from '../../components/HeadImg'
export default {
  components: {
    HeadImg
  },
  data() {
    return {
      imgPath:
        process.env.NODE_ENV === 'development'
          ? 'https://d1loboc6rox52k.cloudfront.net'
          : 'https://d1loboc6rox52k.cloudfront.net',
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
