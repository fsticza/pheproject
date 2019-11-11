<template>
  <div>
    <div class="head-img">
      <img
        class="img"
        loading="lazy"
        src="/img/construction-head-3.jpg"
        alt=""
      />
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

        <div class="separator"></div>

        <section class="my-4">
          <h1 class="sr-only">Referenciák</h1>
          <ul class="nav nav-pills nav-fill">
            <li v-for="tag in projectTags" :key="tag.value" class="nav-item">
              <a
                class="nav-link project-nav-link"
                :class="projectFilter === tag.value ? 'active' : ''"
                href="#"
                @click.prevent="setProjectFilter(tag.value)"
                >{{ tag.label }}</a
              >
            </li>
          </ul>
          <div class="row mb-4">
            <div
              v-if="!filteredProjects.length"
              class="alert alert-info my-4 col-sm-6 offset-sm-3 text-center"
            >
              Még nincs projekt ebben a kategóriában
            </div>
            <article
              v-for="(project, idx) in filteredProjects"
              v-else
              :key="idx"
              class="my-4 col-sm-4"
              :class="idx === 0 ? 'active' : ''"
            >
              <div class="img-canvas" style="height: 200px">
                <img
                  loading="lazy"
                  :src="project.image"
                  class="img"
                  alt="..."
                />
              </div>
              <h1 class="h3 mt-2">{{ project.title }}</h1>
              <p>{{ project.description }}</p>
              <NLink
                :to="{
                  name: 'referenciak-project',
                  params: { project: project.slug }
                }"
              >
                Bővebben
              </NLink>
            </article>
          </div>
        </section>

        <div class="separator"></div>

        <section class="my-4">
          <h1 class="sr-only">Szolgáltatások</h1>
          <div class="row">
            <div class="col-sm-4">
              <nav>
                <ul class="nav flex-column">
                  <li
                    v-for="tag in serviceTags"
                    :key="tag.value"
                    class="nav-item"
                  >
                    <a
                      class="nav-link"
                      :class="serviceFilter === tag.value ? 'active' : ''"
                      href="#"
                      @click.prevent="setServiceFilter(tag.value)"
                      >{{ tag.label }}</a
                    >
                  </li>
                </ul>
              </nav>
            </div>
            <div class="col-sm-8">
              <article
                v-for="(service, idx) in services"
                v-show="serviceFilter === service.tag"
                :key="idx"
                :class="idx === 0 ? 'active' : ''"
              >
                <div class="img-canvas" style="height: 200px">
                  <img
                    loading="lazy"
                    :src="service.image"
                    class="img"
                    alt="..."
                  />
                </div>
                <h1 class="h3 mt-2">{{ service.title }}</h1>
                <p>{{ service.description }}</p>
                <NLink
                  :to="{
                    name: 'szolgaltatasok-service',
                    params: { service: service.slug }
                  }"
                >
                  Bővebben
                </NLink>
              </article>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      projectFilter: 'ALL',
      serviceFilter: 'IMPL',
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
    },
    projects() {
      return this.$store.state.projects
    },
    services() {
      return this.$store.state.services
    },
    filteredProjects() {
      if (this.projectFilter === 'ALL') {
        return this.projects
      }
      return this.projects.filter((project) => {
        return project.tags.includes(this.projectFilter)
      })
    },
    projectTags() {
      return this.$store.state.projectTags
    },
    serviceTags() {
      return this.$store.state.projectTags.filter((tag) => tag.value !== 'ALL')
    }
  },
  methods: {
    setActiveCarouselIndex(idx) {
      this.activeCarouselIndex = idx
    },
    setProjectFilter(value) {
      this.projectFilter = value
    },
    setServiceFilter(value) {
      this.serviceFilter = value
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
.nav-pills {
  .project-nav-link {
    text-decoration: none;
    font-size: 0.875rem;
    color: $secondary;

    &.active {
      background-color: $secondary;
      color: #fff;
    }
  }
}
</style>
