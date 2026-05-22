<template>
  <div>
    <div class="head-img">
      <HeadImg />
      <h1 class="head__title">
        <span class="first-line">mérnöki <strong>megoldások</strong></span>
        mindenki számára
      </h1>
    </div>

    <div class="actual-content">
      <section class="mt-4">
        <service-list :services-data="servicesData" />
      </section>

      <div class="separator"></div>

      <div
        id="blog-carousel"
        @mouseover="onCarouselMouseover"
        @mouseout="onCarouselMouseout"
        class="blog-carousel carousel slide"
      >
        <ol class="carousel-indicators">
          <li
            v-for="(post, idx) in blogPosts"
            :key="`post-${idx}`"
            :class="idx === activeCarouselIndex ? 'active' : ''"
            @click="onCarouselIndicatorClick(idx)"
          ></li>
        </ol>
        <transition-group name="carousel" tag="div" class="carousel-inner">
          <div
            v-for="(post, idx) in blogPosts"
            :key="`post-${idx}`"
            :class="idx === activeCarouselIndex ? 'active' : ''"
            class="carousel-item"
          >
            <div class="row">
              <div class="col-sm-5">
                <div class="img-canvas carousel-img-wrapper">
                  <img
                    :srcset="
                      `
                      ${imgPath}${post.cover}?nf_resize=fit&w=670 1650w,
                      `
                    "
                    :src="`${imgPath}${post.cover}?nf_resize=fit&w=530`"
                    :alt="`${post.title} | PHE`"
                    class="carousel-img img"
                    loading="lazy"
                    sizes="(min-width: 1680px) 1650px"
                  />
                </div>
              </div>
              <div class="col-sm-7">
                <div class="d-flex h-100 flex-column carousel-post">
                  <h1 class="h3 pt-3 pt-sm-1">{{ post.title }}</h1>
                  <p class="mb-auto">
                    {{ post.description }}
                  </p>
                  <div>
                    <NuxtLink
                      :to="{
                        name: 'blog-blog',
                        params: { blog: post.slug }
                      }"
                      class="more-link"
                    >
                      Bővebben
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition-group>
      </div>

      <div class="separator"></div>

      <section class="mt-4">
        <reference-list :projects-data="projectsData"></reference-list>
      </section>
    </div>
  </div>
</template>

<script>
import ServiceList from '../components/ServiceList'
import ReferenceList from '../components/ReferenceList'
import HeadImg from '../components/HeadImg'
import { fetchApiJson } from '../utils/apiFetch'
import { defineNuxtComponent } from '#imports'

export default defineNuxtComponent({
  components: {
    ServiceList,
    ReferenceList,
    HeadImg
  },
  async asyncData({ req }) {
    const [blogPostsData, projectsData, servicesData] = await Promise.all([
      fetchApiJson('/api/content/blog', req),
      fetchApiJson('/api/content/referenciak', req),
      fetchApiJson('/api/content/service', req)
    ])

    return {
      blogPostsData,
      projectsData,
      servicesData
    }
  },
  data() {
    return {
      imgPath:
        process.env.NODE_ENV === 'development'
          ? ''
          : '',
      blogPostsData: [],
      projectsData: [],
      servicesData: [],
      activeCarouselIndex: 0,
      carouselInterval: null
    }
  },
  head() {
    return {
      script: [
        { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }
      ]
    }
  },
  computed: {
    blogPosts() {
      let source = []

      if (this.blogPostsData && this.blogPostsData.length) {
        source = this.blogPostsData
      } else if (this.$store && this.$store.state) {
        source = this.$store.state.blogPosts || []
      }

      return source.filter((post) => {
        return post.isHighlighted
      })
    }
  },
  mounted() {
    this.initCarousel()
  },
  beforeUnmount() {
    this.stopCarousel()
  },
  beforeDestroy() {
    this.stopCarousel()
  },
  methods: {
    stopCarousel() {
      if (this.carouselInterval) {
        clearInterval(this.carouselInterval)
      }
    },
    initCarousel() {
      const max = this.blogPosts.length
      this.stopCarousel()

      if (!max) {
        return
      }

      this.carouselInterval = setInterval(() => {
        const index =
          this.activeCarouselIndex + 1 === max
            ? 0
            : this.activeCarouselIndex + 1
        this.activeCarouselIndex = index
      }, 6000)
    },
    onCarouselMouseover() {
      this.stopCarousel()
    },
    onCarouselMouseout() {
      this.initCarousel()
    },
    onCarouselIndicatorClick(idx) {
      this.activeCarouselIndex = idx
    }
  }
})
</script>

<style lang="scss">
@use '~/assets/scss/variables' as *;

.separator {
  margin: 50px 0;
  height: 1px;
  background-color: #ededed;
}

.blog-carousel {
  margin-top: 50px;
  margin-bottom: 70px;
  z-index: 4;

  .carousel-indicators {
    margin-bottom: -30px;
  }

  .carousel-img-wrapper {
    height: 200px;

    @include media-breakpoint-up(md) {
      height: 220px;
    }
  }

  .carousel-item {
    opacity: 0;
    display: block;
    transition: all 1s ease;
    z-index: 10;

    .carousel-img {
      transform: translate(-50px, -50px);
      transition: all 1s ease;
    }
    .carousel-post {
      transform: translate(50px, 50px);
      transition: all 1s ease;
    }

    &.active {
      opacity: 1;
      z-index: 11;

      .carousel-img {
        transform: translate(0, 0);
      }
      .carousel-post {
        transform: translate(0, 0);
      }
    }
  }
}
</style>
