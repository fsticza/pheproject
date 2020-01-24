<template>
  <div class="default-layout">
    <div class="main-padder">
      <header class="container-fluid">
        <b-navbar class="main-navbar" toggleable="lg" type="light">
          <b-navbar-brand href="/">
            <img
              height="100"
              class="brand-img brand-img--first"
              src="~assets/img/PHE-logo.svg"
              alt=""
            />
            <img
              height="100"
              class="brand-img ml-2 brand-img--second"
              src="~assets/img/PHE-logo-2.svg"
              alt=""
            />
          </b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <div class="ml-auto">
            <div class="text-center mt-2 mt-md-0">
              <a class="main-nav-contact-link" href="mailto:info@pheproject.hu">
                <EmailIcon class="contact-link-icon" />
                info@pheproject.hu
              </a>
              <a class="main-nav-contact-link" href="tel:+36705263135">
                <PhoneIcon class="contact-link-icon" />
                +3670 526 3135
              </a>
              <a
                class="main-nav-contact-link"
                target="_blank"
                href="https://goo.gl/maps/njg9EcpNG8JhFRjx6"
              >
                <MapIcon class="contact-link-icon" />
                1096 Budapest, Tűzoltó utca 50.
              </a>
            </div>

            <div class="separator-top"></div>

            <b-collapse id="nav-collapse" is-nav>
              <b-navbar-nav class="ml-auto">
                <NLink class="nav-item nav-link" to="/szolgaltatasok"
                  >szolgáltatásaink</NLink
                >
                <NLink class="nav-item nav-link" to="/rolunk">rólunk</NLink>
                <NLink class="nav-item nav-link" to="/referenciak"
                  >referenciák</NLink
                >
                <NLink class="nav-item nav-link" to="/kapcsolat">kontakt</NLink>
                <NLink class="nav-item nav-link" to="/blog">extra</NLink>
              </b-navbar-nav>
              <!-- <b-navbar-nav class="">
                HU | EN
              </b-navbar-nav> -->
            </b-collapse>
          </div>
        </b-navbar>
      </header>
      <div class="main-content">
        <div class="container-fluid">
          <nuxt />
        </div>
      </div>
    </div>
    <GmapMap
      ref="gMap"
      :center="{ lat: 47.4817237, lng: 19.0761946 }"
      :zoom="15"
      style="height: 25vh"
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
        <div class="row">
          <a
            class="footer-link col-sm-4 my-1"
            target="_blank"
            href="https://goo.gl/maps/njg9EcpNG8JhFRjx6"
          >
            <MapIcon class="footer-link-icon" />
            1096 Budapest, Tűzoltó utca 50. Manta Office
          </a>
          <a class="footer-link col-sm-3 my-1" href="mailto:info@pheproject.hu">
            <EmailIcon class="footer-link-icon" />
            info@pheproject.hu
          </a>
          <a class="footer-link col-sm-2 my-1" href="tel:+36705263135">
            <PhoneIcon class="footer-link-icon" />
            +3670 526 3135
          </a>
          <a
            class="ml-auto text-center text-sm-right col-sm-3 my-1"
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
import MapIcon from '~/assets/img/map-icon.svg?inline'
import EmailIcon from '~/assets/img/email-icon.svg?inline'
import PhoneIcon from '~/assets/img/phone-icon.svg?inline'

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
  components: {
    MapIcon,
    EmailIcon,
    PhoneIcon
  },
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
.main-nav-contact-link {
  color: rgba(0, 0, 0, 0.5);
  text-decoration: none;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 0.875rem;
}
.separator-top {
  margin: 1em 0 0.5em;
  height: 1px;
  background-color: #ededed;
}
.default-layout {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
.main-padder {
  margin: 0 5%;
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
  padding-right: 5px;
}
</style>
