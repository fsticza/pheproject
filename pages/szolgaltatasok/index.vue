<template>
  <div>
    <div class="head-img">
      <img class="img" loading="lazy" src="/img/references-head.jpg" alt="" />
    </div>

    <div class="row mt-4">
      <div class="col-sm-10 offset-sm-1">
        <section>
          <service-list :is-extended="true" />
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import ServiceList from '../../components/ServiceList'

export default {
  components: {
    ServiceList
  }
}
</script>

<style lang="scss"></style>
