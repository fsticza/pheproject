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
            <div class="img-canvas" style="height: 200px">
              <img loading="lazy" :src="service.image" class="img" alt="..." />
            </div>
            <h1 class="h3 mt-2">{{ service.title }}</h1>
            <p>{{ service.description }}</p>
            <div v-if="isExtended" v-html="service.body"></div>
            <NLink v-else class="more-link" to="/szolgaltatasok">
              Bővebben
            </NLink>
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
      return this.$store.state.services
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
  .nav-link {
    text-decoration: none;
    color: #999;

    .service-link-icon {
      opacity: 0.3;
    }

    &.active {
      font-weight: bold;
      color: $body-color;

      .service-link-icon {
        opacity: 1;
      }
    }
  }
}
.service-wrapper {
  position: relative;
  min-height: 360px;

  .service-item {
    opacity: 0;
    position: absolute;
    width: 100%;
    transition: all 0.5s ease;

    &.active {
      opacity: 1;
    }
  }
}
</style>
