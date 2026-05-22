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
        <reference-list :projects-data="projectsData" />
      </section>
    </div>
  </div>
</template>

<script>
import HeadImg from '../../components/HeadImg'
import ReferenceList from '../../components/ReferenceList'
import { fetchApiJson } from '../../utils/apiFetch'
import { defineNuxtComponent } from '#imports'

export default defineNuxtComponent({
  components: {
    HeadImg,
    ReferenceList
  },
  async asyncData({ req }) {
    return {
      projectsData: await fetchApiJson('/api/content/referenciak', req)
    }
  },
  head() {
    return {
      title: 'PHE project development & consulting - Referenciák'
    }
  },
  computed: {}
})
</script>
