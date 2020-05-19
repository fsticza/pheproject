<template>
  <div>
    <div class="head-img head-img--small">
      <img
        class="img"
        srcset="
          /img/index-head2.jpg?nf_resize=fit&w=1590 1650w,
          /img/index-head2.jpg?nf_resize=fit&w=1110 1110w,
          /img/index-head2.jpg?nf_resize=fit&w=930   930w,
          /img/index-head2.jpg?nf_resize=fit&w=690   690w
        "
        sizes="(min-width: 1680px) 1650px, (min-width: 1200px) 1110px, (min-width: 992px) 930px, (min-width: 768px) 690px"
        src="/img/index-head2.jpg?nf_resize=fit&w=520"
        alt="PHE | Mérnöki megoldásoktól mindenkinek"
      />
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
