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
      <section>
        <service-list :is-extended="true" :services-data="servicesData" />
      </section>
    </div>
  </div>
</template>

<script>
import HeadImg from '../../components/HeadImg'
import ServiceList from '../../components/ServiceList'
import { fetchApiJson } from '../../utils/apiFetch'
import { defineNuxtComponent } from '#imports'

export default defineNuxtComponent({
  components: {
    HeadImg,
    ServiceList
  },
  async asyncData({ req }) {
    return {
      servicesData: await fetchApiJson('/api/content/service', req)
    }
  },
  data() {
    return {
      imgPath:
        process.env.NODE_ENV === 'development'
          ? ''
          : '',
      servicesData: []
    }
  },
  head() {
    return {
      title: 'PHE project development & consulting - Szolgáltatások'
    }
  }
})
</script>

<style lang="scss"></style>
