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
        <reference-list />
      </section>
    </div>
  </div>
</template>

<script>
import HeadImg from '../../components/HeadImg'
import ReferenceList from '../../components/ReferenceList'
export default {
  components: {
    HeadImg,
    ReferenceList
  },
  data() {
    return {
      imgPath:
        process.env.NODE_ENV === 'development'
          ? 'https://d1loboc6rox52k.cloudfront.net'
          : 'https://d1loboc6rox52k.cloudfront.net'
    }
  },
  head() {
    return {
      title: 'PHE project development & consulting - Referenciák'
    }
  },
  computed: {
    projects() {
      return this.$store.state.projects
    }
  }
}
</script>
