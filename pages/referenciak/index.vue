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
  computed: {
    projects() {
      return this.$store.state.projects
    }
  }
}
</script>
