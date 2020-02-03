<template>
  <div>
    <div class="head-img head-img--small">
      <img class="img" loading="lazy" src="/img/index-head2.jpg" alt="" />
      <h1 class="head__title">
        <span class="first-line">mérnöki <strong>megoldások</strong></span>
        mindenki számára
      </h1>
    </div>

    <div class="actual-content">
      <div class="row my-4 align-items-center">
        <div class="col-md-6">
          <img
            height="540"
            class="img-cover"
            loading="lazy"
            src="/img/mantra-office-2.png"
            alt=""
          />
        </div>
        <div class="col-md-6">
          <div class="contact-links">
            <a
              class="contact-link"
              target="_blank"
              href="https://goo.gl/maps/njg9EcpNG8JhFRjx6"
            >
              <MapIcon class="contact-link-icon" />
              1096 Budapest, Tűzoltó utca 50. Manta Office
            </a>
            <a class="contact-link" href="mailto:info@pheproject.hu">
              <EmailIcon class="contact-link-icon" />
              info@pheproject.hu
            </a>
            <a class="contact-link" href="tel:+36705263135">
              <PhoneIcon class="contact-link-icon" />
              +3670 526 3135
            </a>
          </div>

          <form
            name="contact"
            class="my-4 contact-form"
            method="POST"
            action="/kapcsolat/#success"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            <div id="success" v-show="isSuccess" class="alert alert-success">
              Az üzenetet sikeresen megkaptuk, köszönjük!
            </div>
            <div class="form-group">
              <label for="form-name">Név:</label>
              <input
                id="form-name"
                required
                class="form-control"
                type="text"
                name="name"
              />
            </div>
            <div class="form-group">
              <label for="form-email">Email:</label>
              <input
                id="form-email"
                required
                class="form-control"
                type="email"
                name="email"
              />
            </div>
            <div class="form-group">
              <label for="form-message">Üzenet:</label>
              <textarea
                id="form-message"
                required
                class="form-control"
                name="message"
              />
            </div>
            <div>
              <button class="btn btn-primary" type="submit">Elküldöm</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MapIcon from '~/assets/img/map-icon.svg?inline'
import EmailIcon from '~/assets/img/email-icon.svg?inline'
import PhoneIcon from '~/assets/img/phone-icon.svg?inline'

export default {
  components: {
    MapIcon,
    EmailIcon,
    PhoneIcon
  },
  data() {
    return {
      isSuccess: false
    }
  },
  head() {
    return {
      title: 'PHE project development & consulting - Kapcsolat'
    }
  },
  mounted() {
    this.isSuccess = location.hash === '#success'
  }
}
</script>

<style lang="scss">
@import '~/assets/scss/variables';
.contact-links {
  @include media-breakpoint-up(xl) {
    display: flex;
    justify-content: space-between;
  }
}
.contact-link {
  text-decoration: none;
  display: block;
  text-align: center;
  margin: 1rem 0;
}
.contact-form {
  padding: 1.5rem;
  border: 10px solid #f2f2f2;
}
</style>
