<template>
  <div>
    <h1 class="sr-only">Szolgáltatások</h1>
    <div class="row">
      <div class="col-sm-4">
        <nav>
          <ul class="nav flex-column service-nav">
            <li v-for="service in services" :key="service.tag" class="nav-item">
              <a
                class="nav-link"
                :class="serviceFilter === service.tag ? 'active' : ''"
                href="#"
                @click.prevent="setServiceFilter(service.tag)"
              >
                <img class="service-link-icon" :src="service.icon" />
                {{ service.title }}
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="col-sm-8">
        <transition-group name="service" tag="div" class="service-wrapper">
          <article
            v-for="service in services"
            :key="service.tag"
            class="service-item"
            :class="serviceFilter === service.tag ? 'active' : ''"
          >
            <div class="row">
              <div class="col-md-6">
                <div class="img-canvas mt-3" style="height: 220px">
                  <img
                    loading="lazy"
                    :src="`${service.image}?nf_resize=fit&h=440`"
                    class="img"
                    alt="..."
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="d-flex h-100 flex-column">
                  <h1 class="h3 mt-2">{{ service.title }}</h1>
                  <div class="mb-auto text-justify">
                    {{ service.description }}
                    <div
                      v-if="isExtended"
                      class="mt-2"
                      v-html="service.body"
                    ></div>
                  </div>
                  <NLink
                    v-if="!isExtended"
                    class="more-link mb-3"
                    to="/szolgaltatasok"
                  >
                    Bővebben
                  </NLink>
                </div>
              </div>
            </div>
          </article>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    isExtended: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      serviceFilter: 'IMPL'
    }
  },
  computed: {
    services() {
      const { state } = this.$store
      const sortedTags = state.projectTags.map(({ value }) => value)
      return [...state.services].sort((a, b) => {
        return sortedTags.indexOf(a.tag) - sortedTags.indexOf(b.tag)
      })
    }
  },
  mounted() {
    const tag = this.$store.$router.history.current.query.tag
    if (tag) {
      this.serviceFilter = tag
    }
  },
  methods: {
    setServiceFilter(value) {
      this.serviceFilter = value
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/scss/variables';
.service-nav {
  position: relative;
  z-index: 10;
  .nav-link {
    text-decoration: none;
    font-size: 1.25rem;
    color: #999;
    padding-left: 0;

    .service-link-icon {
      opacity: 0.3;
    }

    &.active {
      *font-weight: bold;
      color: $body-color;

      .service-link-icon {
        opacity: 1;
      }
    }
  }
}
.service-wrapper {
  overflow: hidden;

  .service-item {
    opacity: 0;
    width: 100%;
    position: absolute;
    transform: translateY(-100%);
    transition: all 0.5s ease;
    z-index: 0;

    &.active {
      transform: translateY(0);
      opacity: 1;
      position: relative;
      z-index: 11;
    }
  }
}
</style>
