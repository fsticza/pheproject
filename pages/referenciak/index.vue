<template>
  <div>
    <div class="head-img head-img--small">
      <img
        :srcset="
          `
          ${imgPath}/img/index-head2.jpg?nf_resize=fit&w=1590 1650w,
          ${imgPath}/img/index-head2.jpg?nf_resize=fit&w=1110 1110w,
          ${imgPath}/img/index-head2.jpg?nf_resize=fit&w=930   930w,
          ${imgPath}/img/index-head2.jpg?nf_resize=fit&w=690   690w
        `
        "
        :src="`${imgPath}/img/index-head2.jpg?nf_resize=fit&w=520`"
        class="img"
        sizes="(min-width: 1680px) 1650px, (min-width: 1200px) 1110px, (min-width: 992px) 930px, (min-width: 768px) 690px"
        alt="PHE | Mérnöki megoldásoktól mindenkinek"
      />
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
import ReferenceList from '../../components/ReferenceList'
export default {
  components: {
    ReferenceList
  },
  data() {
    return {
      imgPath:
        process.env.NODE_ENV === 'development'
          ? ''
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
