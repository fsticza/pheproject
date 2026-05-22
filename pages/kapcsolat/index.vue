<template>
  <div>
    <div class="head-img head-img--small">
      <HeadImg />
      <h1 class="head__title">
        <span class="first-line">mérnöki <strong>megoldások</strong></span>
        mindenki számára
      </h1>
    </div>

    <div class="actual-content">
      <div class="row my-4 align-items-center">
        <div class="col-md-6">
          <img
            :src="`${imgPath}/img/mantra-office-2.png`"
            height="540"
            class="img-cover"
            loading="lazy"
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
              <img
                class="contact-link-icon"
                src="~assets/img/map-icon.svg"
                alt=""
              />
              1096 Budapest, Tűzoltó utca 50. Manta Office
            </a>
            <a class="contact-link" href="mailto:info@pheproject.hu">
              <img
                class="contact-link-icon"
                src="~assets/img/email-icon.svg"
                alt=""
              />
              info@pheproject.hu
            </a>
            <a class="contact-link" href="tel:+36705263135">
              <img
                class="contact-link-icon"
                src="~assets/img/phone-icon.svg"
                alt=""
              />
              +3670 526 3135
            </a>
          </div>

          <form
            @submit.prevent="onContactSubmit"
            name="contact"
            class="my-4 contact-form"
            method="POST"
            action="/kapcsolat/"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value="contact" />
            <input type="hidden" name="bot-field" />
            <div id="success" v-show="isSuccess" class="alert alert-success">
              Az üzenetet sikeresen megkaptuk, köszönjük!
            </div>
            <div class="form-group">
              <label for="form-name">Név:</label>
              <input
                id="form-name"
                v-model="name"
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
                v-model="email"
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
                v-model="message"
                required
                class="form-control"
                name="message"
              ></textarea>
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
import HeadImg from '../../components/HeadImg'
import { defineNuxtComponent } from '#imports'

export default defineNuxtComponent({
  components: {
    HeadImg
  },
  data() {
    return {
      imgPath:
        process.env.NODE_ENV === 'development'
          ? ''
          : '',
      isSuccess: false,
      name: '',
      email: '',
      message: ''
    }
  },
  head() {
    return {
      title: 'PHE project development & consulting - Kapcsolat'
    }
  },
  methods: {
    onContactSubmit(ev) {
      const formData = new FormData()
      formData.append('form-name', 'contact')
      formData.append('name', this.name)
      formData.append('email', this.email)
      formData.append('message', this.message)
      fetch(ev.target.action, {
        method: 'POST',
        body: formData
      }).then(() => (this.isSuccess = true))
    }
  }
})
</script>

<style lang="scss">
@use '~/assets/scss/variables' as *;
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
