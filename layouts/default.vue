<template>
  <div class="default-layout">
    <div class="main-padder">
      <header class="container">
        <nav class="main-navbar navbar navbar-light navbar-expand-lg">
          <NuxtLink class="navbar-brand" to="/" @click="closeNav">
            <img
              height="100"
              class="brand-img brand-img--first"
              src="~assets/img/PHE-logo.svg"
              alt=""
            />
            <img
              height="80"
              class="brand-img ml-2 brand-img--second"
              src="~assets/img/PHE-logo-2.png"
              alt=""
            />
          </NuxtLink>

          <button
            class="navbar-toggler ml-auto"
            type="button"
            aria-controls="nav-collapse"
            :aria-expanded="isNavOpen.toString()"
            aria-label="Toggle navigation"
            @click="isNavOpen = !isNavOpen"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div
            id="nav-collapse"
            class="main-nav-collapse ml-lg-auto collapse navbar-collapse"
            :class="{ show: isNavOpen }"
          >
            <div class="main-nav-items navbar-nav">
              <NuxtLink
                class="nav-item nav-link"
                active-class="active"
                to="/szolgaltatasok"
                @click="closeNav"
                >szolgáltatásaink</NuxtLink
              >
              <NuxtLink
                class="nav-item nav-link"
                active-class="active"
                to="/rolunk"
                @click="closeNav"
                >rólunk</NuxtLink
              >
              <NuxtLink
                class="nav-item nav-link"
                active-class="active"
                to="/referenciak"
                @click="closeNav"
                >referenciák</NuxtLink
              >
              <NuxtLink
                class="nav-item nav-link"
                active-class="active"
                to="/kapcsolat"
                @click="closeNav"
                >kontakt</NuxtLink
              >
              <NuxtLink
                class="nav-item nav-link"
                active-class="active"
                to="/blog"
                @click="closeNav"
                >extra</NuxtLink
              >
            </div>
            <!-- <div class="navbar-nav">
                HU | EN
              </div> -->

            <div class="separator-top"></div>

            <div class="text-center main-nav-contact mt-2 mt-md-0">
              <a class="main-nav-contact-link" href="mailto:info@pheproject.hu">
                <span
                  class="contact-link-icon icon-mask icon-mask--email"
                  aria-hidden="true"
                ></span>
                info@pheproject.hu
              </a>
              <a class="main-nav-contact-link" href="tel:+36705263135">
                <span
                  class="contact-link-icon icon-mask icon-mask--phone"
                  aria-hidden="true"
                ></span>
                +3670 526 3135
              </a>
              <a
                class="main-nav-contact-link"
                target="_blank"
                href="https://goo.gl/maps/njg9EcpNG8JhFRjx6"
              >
                <span
                  class="contact-link-icon icon-mask icon-mask--map"
                  aria-hidden="true"
                ></span>
                1096 Budapest, Tűzoltó utca 50.
              </a>
            </div>
          </div>
        </nav>
      </header>
      <div class="main-content">
        <div class="container">
          <slot />
        </div>
      </div>
    </div>

    <!-- <GmapMap
      ref="gMap"
      :center="{ lat: 47.4817237, lng: 19.0761946 }"
      :zoom="15"
      :options="options"
      style="height: 200px"
    >
      <GmapMarker
        :position="{ lat: 47.4817237, lng: 19.0761946 }"
        :icon="{
          url: '/img/phe-maps-icon.png'
        }"
      />
    </GmapMap> -->

    <a
      class="img-canvas d-block"
      style="height: 200px"
      target="_blank"
      href="https://goo.gl/maps/njg9EcpNG8JhFRjx6"
    >
      <img
        src="~assets/img/maps.png"
        style="height: 200px"
        loading="lazy"
        class="img"
      />
    </a>

    <footer class="main-footer">
      <div class="container">
        <div class="row">
          <a
            class="footer-link col-sm-4 my-1"
            target="_blank"
            href="https://goo.gl/maps/njg9EcpNG8JhFRjx6"
          >
            <span
              class="footer-link-icon icon-mask icon-mask--map"
              aria-hidden="true"
            ></span>
            1096 Budapest, Tűzoltó utca 50. Manta Office
          </a>
          <a class="footer-link col-sm-3 my-1" href="mailto:info@pheproject.hu">
            <span
              class="footer-link-icon icon-mask icon-mask--email"
              aria-hidden="true"
            ></span>
            info@pheproject.hu
          </a>
          <a class="footer-link col-sm-2 my-1" href="tel:+36705263135">
            <span
              class="footer-link-icon icon-mask icon-mask--phone"
              aria-hidden="true"
            ></span>
            +3670 526 3135
          </a>
          <a
            class="ml-auto text-center text-sm-right col-sm-3 my-1"
            href="https://www.facebook.com/pheproject.hu/"
            target="_blank"
            aria-label="Facebook"
          >
            <span
              class="footer-link-icon icon-mask icon-mask--facebook"
              aria-hidden="true"
            ></span>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isNavOpen: false
    }
  },
  watch: {
    $route() {
      this.closeNav()
    }
  },
  methods: {
    closeNav() {
      this.isNavOpen = false
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/scss/app';

body {
  overflow-y: scroll;
}
.main-nav-collapse {
  flex-direction: column;
  width: 100%;

  .nav-link {
    text-align: center;
  }
  .main-nav-contact-link {
    display: block;
    margin-bottom: 0.5rem;
  }

  @include media-breakpoint-up(md) {
    flex-grow: initial;
    width: auto;

    .main-nav-contact-link {
      display: inline-block;
    }
  }
}
.main-nav-items {
  width: 100%;
  justify-content: space-between;
}
.main-nav-contact {
  width: 100%;
  justify-content: space-between;
}
.main-nav-contact-link {
  color: rgba(0, 0, 0, 0.5);
  text-decoration: none;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  font-size: 0.875rem;
}
.separator-top {
  margin: 0.25em 0 0.5em;
  width: 100%;
  height: 1px;
  background-color: #ededed;
}
.default-layout {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
.main-padder {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.main-navbar {
  padding: 13px 0;
  .navbar-brand {
    text-decoration: none;
    padding-bottom: 0;
    padding-top: 0;
    position: relative;
    z-index: 10;
  }
  .nav-link {
    text-decoration: none;

    &.active {
      font-weight: bold;
    }
  }
}
.main-footer {
  background-color: $secondary;
  color: #fff;
  padding: 30px 0;
}
.footer-link {
  color: #fff;
  text-decoration: none;
  display: inline-block;
  font-size: 0.875rem;

  &:hover {
    color: #fff;
  }
}
.footer-link-icon {
  margin-right: 5px;
}

.icon-mask {
  display: inline-block;
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  background-color: currentColor;
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  -webkit-mask-size: contain;
}

.icon-mask--email {
  mask-image: url('/img/email-icon.svg');
  -webkit-mask-image: url('/img/email-icon.svg');
}

.icon-mask--phone {
  mask-image: url('/img/phone-icon.svg');
  -webkit-mask-image: url('/img/phone-icon.svg');
}

.icon-mask--map {
  mask-image: url('/img/map-icon.svg');
  -webkit-mask-image: url('/img/map-icon.svg');
}

.icon-mask--facebook {
  mask-image: url('/img/facebook-icon.svg');
  -webkit-mask-image: url('/img/facebook-icon.svg');
}
</style>
