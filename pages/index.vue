<template>
  <div>
    <div class="head-img">
      <img class="img" src="/img/construction-head-3.jpg" alt="" />
    </div>

    <div class="row">
      <div class="col-sm-10 offset-sm-1">
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
                <div class="col-sm-6">
                  <div class="img-canvas carousel-img-wrapper">
                    <img :src="post.cover" class="carousel-img img" alt="..." />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="d-flex h-100 flex-column">
                    <h1 class="mt-auto h2">{{ post.title }}</h1>
                    <p>
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
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
      console.log(this.$store.state.blogPosts)
      return this.$store.state.blogPosts.filter((post) => {
        return post.isHighlighted
      })
    }
  },
  methods: {
    setActiveCarouselIndex(idx) {
      this.activeCarouselIndex = idx
    }
  }
}
</script>

<style lang="scss">
.more-link {
  text-transform: uppercase;
  text-decoration: none;
}

.blog-carousel {
  margin-top: -100px;
  margin-bottom: 50px;

  .carousel-indicators {
    margin-bottom: -30px;
  }

  .carousel-img-wrapper {
    height: 300px;
  }

  .carousel-item {
    opacity: 0;
    transition: opacity 2s ease;

    &.active {
      opacity: 1;
    }
  }
}
</style>
