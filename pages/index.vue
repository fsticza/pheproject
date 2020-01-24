<template>
  <div>
    <div class="head-img">
      <img class="img" loading="lazy" src="/img/index-head2.jpg" alt="" />
      <h1 class="head__title">
        <span class="first-line">mérnöki <strong>megoldások</strong></span>
        mindenki számára
      </h1>
    </div>

    <div class="actual-content">
      <section class="mt-4">
        <service-list />
      </section>

      <div class="separator"></div>

      <div id="blog-carousel" class="blog-carousel carousel slide">
        <ol class="carousel-indicators">
          <li
            v-for="(post, idx) in blogPosts"
            :key="`post-${idx}`"
            :class="idx === activeCarouselIndex ? 'active' : ''"
            @click="setActiveCarouselIndex(idx)"
          ></li>
        </ol>
        <transition-group name="carousel" tag="div" class="carousel-inner">
          <div
            v-for="(post, idx) in blogPosts"
            :key="`post-${idx}`"
            class="carousel-item"
            :class="idx === activeCarouselIndex ? 'active' : ''"
          >
            <div class="row">
              <div class="col-sm-5">
                <div class="img-canvas carousel-img-wrapper">
                  <img
                    :src="post.cover"
                    loading="lazy"
                    class="carousel-img img"
                    alt="..."
                  />
                </div>
              </div>
              <div class="col-sm-7">
                <div class="d-flex h-100 flex-column carousel-post">
                  <h1 class="h3 pt-2">{{ post.title }}</h1>
                  <p class="mb-auto">
                    {{ post.description }}
                  </p>
                  <div>
                    <NLink
                      class="more-link"
                      :to="{
                        name: 'blog-blog',
                        params: { blog: post.slug }
                      }"
                    >
                      Bővebben
                    </NLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition-group>
      </div>

      <div class="separator"></div>

      <section class="my-4">
        <reference-list></reference-list>
      </section>
    </div>
  </div>
</template>

<script>
import ServiceList from '../components/ServiceList'
import ReferenceList from '../components/ReferenceList'

export default {
  components: {
    ServiceList,
    ReferenceList
  },
  data() {
    return {
      activeCarouselIndex: 0
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
      return this.$store.state.blogPosts.filter((post) => {
        return post.isHighlighted
      })
    }
  },
  mounted() {
    const max = this.blogPosts.length
    setInterval(() => {
      const index =
        this.activeCarouselIndex + 1 === max ? 0 : this.activeCarouselIndex + 1
      this.activeCarouselIndex = index
    }, 10000)
  },
  methods: {
    setActiveCarouselIndex(idx) {
      this.activeCarouselIndex = idx
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/scss/variables';

.more-link {
  text-transform: uppercase;
  text-decoration: none;
}

.separator {
  margin: 3em 0;
  height: 1px;
  background-color: #ededed;
}

.blog-carousel {
  margin-top: 50px;
  margin-bottom: 50px;
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
