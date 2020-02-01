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
        <service-list :is-extended="true" />
      </section>
    </div>
  </div>
</template>

<script>
import ServiceList from '../../components/ServiceList'

export default {
  components: {
    ServiceList
  },
  head() {
    return {
      title: 'PHE project development & consulting - Szolgáltatások'
    }
  }
}
</script>

<style lang="scss"></style>
