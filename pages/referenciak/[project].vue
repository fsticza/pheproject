<template>
  <article>
    <div class="head-img head-img--small">
      <HeadImg />
      <h1 class="head__title">
        <span class="first-line">mérnöki <strong>megoldások</strong></span>
        mindenki számára
      </h1>
    </div>

    <div v-if="project" class="actual-content">
      <div class="row">
        <div class="col-sm-6">
          <div class="img-canvas" style="height: 400px">
            <img
              :srcset="
                `
                ${imgPath}${project.image}?nf_resize=fit&w=780 1650w,
                ${imgPath}${project.image}?nf_resize=fit&w=540 1110w,
                ${imgPath}${project.image}?nf_resize=fit&w=450  930w,
                ${imgPath}${project.image}?nf_resize=fit&w=240  690w
                `
              "
              :src="`${imgPath}${project.image}?nf_resize=fit&w=540`"
              :alt="`${project.title} | PHE`"
              class="img"
              loading="lazy"
              sizes="(min-width: 1680px) 1650px, (min-width: 1200px) 1110px, (min-width: 992px) 930px, (min-width: 768px) 690px"
            />
          </div>
        </div>
        <div class="col-sm-6">
          <h1 class="h3 pt-3 mb-4">{{ project.title }}</h1>
          <div v-html="$md.render(project.body)" class="text-justify" />
        </div>
      </div>

      <ImageLightbox
        :images="project.galleryImages"
        :img-path="imgPath"
        :index="galleryIndex"
        :alt-prefix="`${project.title} | PHE gallery image`"
        @close="galleryIndex = null"
        @change="galleryIndex = $event"
      />

      <div class="images-wrapper mt-4">
        <div class="row">
          <div
            v-for="(url, imageIndex) in project.galleryImages"
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
                :alt="`${project.title} | PHE gallery image #${imageIndex + 1}`"
                @click="galleryIndex = imageIndex"
                class="img"
                style="cursor:pointer;"
                loading="lazy"
                sizes="(min-width: 768px) 690px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="actual-content">
      <p class="text-muted">Betoltes...</p>
    </div>
  </article>
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
  async asyncData({ params, route, req }) {
    const routePath = route && route.path ? String(route.path) : ''
    const routeSlug = routePath.split('/').filter(Boolean).pop() || ''
    const slug = params && params.project ? String(params.project) : routeSlug

    if (isInvalidSlug(slug)) {
      return {
        project: null
      }
    }

    try {
      const project = await fetchApiJson(`/api/content/referenciak/${slug}`, req)
      return {
        project
      }
    } catch (err) {
      return {
        project: null
      }
    }
  },
  data() {
    return {
      imgPath: '',
      galleryIndex: null
    }
  },
  mounted() {
    if (!this.project) {
      this.loadProject()
    }
  },
  watch: {
    '$route.fullPath'() {
      this.loadProject()
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
    async loadProject() {
      let pathname = ''

      if (typeof window !== 'undefined' && window.location) {
        pathname = window.location.pathname
      } else if (this.$route && this.$route.path) {
        pathname = this.$route.path
      }

      const slug = this.extractSlugFromPath(pathname)

      if (isInvalidSlug(slug)) {
        this.project = null
        return
      }

      try {
        this.project = await fetchApiJson(`/api/content/referenciak/${slug}`)
      } catch (err) {
        this.project = null
      }
    }
  },
  head() {
    return {
      title: this.project
        ? `${this.project.title} - PHE project development & consulting`
        : 'PHE project development & consulting'
    }
  }
})
</script>
