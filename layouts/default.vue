<template>
  <div class="default-layout">
    <header class="container">
      <b-navbar class="main-navbar" toggleable="lg" type="light">
        <b-navbar-brand href="#">
          <img height="140" class="brand-img" src="/img/PHE-logo.svg" alt="" />
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class=" ml-auto">
            <NLink class="nav-item nav-link" to="/">Főoldal</NLink>
            <NLink class="nav-item nav-link" to="/rolunk">Rólunk</NLink>
            <NLink class="nav-item nav-link" to="/referenciak"
              >Referenciáink</NLink
            >
            <NLink class="nav-item nav-link" to="/szolgaltatasok"
              >Szolgáltatások</NLink
            >
            <NLink class="nav-item nav-link" to="/blog">Híreink</NLink>
            <NLink class="nav-item nav-link" to="/kapcsolat"
              >Elérhetőségek</NLink
            >
          </b-navbar-nav>
          <!-- <b-navbar-nav class="">
            HU | EN
          </b-navbar-nav> -->
        </b-collapse>
      </b-navbar>
    </header>
    <div class="main-content">
      <div class="container">
        <nuxt />
      </div>
    </div>
    <GmapMap
      ref="gMap"
      :center="{ lat: 47.4817237, lng: 19.0761946 }"
      :zoom="18"
      style="height: 36vh"
      :options="options"
    >
      <GmapMarker
        :position="{ lat: 47.4817237, lng: 19.0761946 }"
        :icon="{
          url: '/img/phe-maps-icon.png'
        }"
      />
    </GmapMap>
    <footer class="main-footer">
      <div class="container">
        <div class="d-flex">
          <a class="footer-link" href="">
            <img class="footer-link-icon" src="~assets/img/map-icon.svg" />
            1096 Budapest, Tűzoltó utca 50. Manta Office
          </a>
          <a class="footer-link" href="mailto:info@pheproject.hu">
            <img class="footer-link-icon" src="~assets/img/email-icon.svg" />
            info@pheproject.hu
          </a>
          <a class="footer-link" href="tel:+36705263135">
            <img class="footer-link-icon" src="~assets/img/phone-icon.svg" />
            +3670 526 3135
          </a>
          <a
            class="ml-auto"
            href="https://www.facebook.com/pheproject.hu/"
            target="_blank"
          >
            <img class="footer-link-icon" src="~assets/img/facebook-icon.svg" />
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
const customStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#212121'
      }
    ]
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575'
      }
    ]
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#212121'
      }
    ]
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [
      {
        color: '#757575'
      }
    ]
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e'
      }
    ]
  },
  {
    featureType: 'administrative.land_parcel',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#181818'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1b1b1b'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#2c2c2c'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8a8a8a'
      }
    ]
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#373737'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#3c3c3c'
      }
    ]
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [
      {
        color: '#4e4e4e'
      }
    ]
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161'
      }
    ]
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#3d3d3d'
      }
    ]
  }
]
const options = {
  zoomControl: false,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: true,
  rotateControl: false,
  fullscreenControl: true,
  styles: customStyle
}
export default {
  data() {
    return {
      options
    }
  },
  asyncData(context) {
    return {
      options
    }
  },
  mounted() {
    this.$refs.gMap.$el.style.width = `${document.body.clientWidth}px`

    window.onresize = () => {
      this.$refs.gMap.$el.style.width = `${document.body.clientWidth}px`
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/scss/app';

body {
  overflow-y: scroll;
}
.brand-img {
  position: relative;
  z-index: 10;
}
.default-layout {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
.main-content {
  display: flex;
  flex: 1;
}

.main-navbar {
  padding: 0;
  .navbar-brand {
    padding-bottom: 0;
    padding-top: 0;
    margin-bottom: -78px;
    border-right: 5px solid $body-bg;
    border-bottom: 5px solid $body-bg;
  }
  .nav-link {
    text-transform: uppercase;
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
  margin-right: 20px;
  font-size: 0.875rem;

  &:hover {
    color: #fff;
  }
}
.footer-link-icon {
  padding-right: 5px;
}
</style>
