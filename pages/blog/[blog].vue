<template>
  <div>
    <div class="head-img head-img--small">
      <HeadImg />
      <h1 class="head__title">
        <span class="first-line">mérnöki <strong>megoldások</strong></span>
        mindenki számára
      </h1>
    </div>
    <article v-if="blogPost" class="actual-content">
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

      <ImageLightbox
        :images="blogPost.galleryImages"
        :img-path="imgPath"
        :index="galleryIndex"
        :alt-prefix="`${blogPost.title} | PHE gallery image`"
        @close="galleryIndex = null"
        @change="galleryIndex = $event"
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
    <article v-else class="actual-content">
      <p class="text-muted">Betoltes...</p>
    </article>
  </div>
</template>
<script>
import HeadImg from '../../components/HeadImg'
import ImageLightbox from '../../components/ImageLightbox'
import { fetchApiJson } from '../../utils/apiFetch'
import { defineNuxtComponent } from '#imports'

const isInvalidSlug = (slug) => {
  return !slug || slug === 'undefined' || /^\[.+\]$/.test(slug)
}

export default defineNuxtComponent({
  components: {
    HeadImg,
    ImageLightbox
  },
  data() {
    return {
      imgPath: '',
      galleryIndex: null,
      blogPost: null
    }
  },
  mounted() {
    this.loadBlogPost()
  },
  watch: {
    '$route.fullPath'() {
      this.loadBlogPost()
    }
  },
  methods: {
    extractSlugFromPath(pathname) {
      if (!pathname) {
        return ''
      }

      const fromPath = pathname
        .split('/')
        .filter(Boolean)
        .pop()

      return fromPath ? String(fromPath) : ''
    },
    async loadBlogPost() {
      let pathname = ''

      if (typeof window !== 'undefined' && window.location) {
        pathname = window.location.pathname
      } else if (this.$route && this.$route.path) {
        pathname = this.$route.path
      }

      const slug = this.extractSlugFromPath(pathname)

      if (isInvalidSlug(slug)) {
        this.blogPost = null
        return
      }

      try {
        this.blogPost = await fetchApiJson(`/api/content/blog/${slug}`)
      } catch (err) {
        this.blogPost = null
      }
    }
  },
  head() {
    return {
      title: this.blogPost
        ? `${this.blogPost.title} - PHE project development & consulting`
        : 'PHE project development & consulting'
    }
  }
})
</script>
