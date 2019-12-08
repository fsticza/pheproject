<template>
  <div>
    <div class="head-img">
      <img class="img" loading="lazy" src="/img/office-head.jpg" alt="" />
    </div>

    <div class="mt-4">
      <div class="row mt-4">
        <div class="col-sm-6">
          <h1>Rólunk</h1>
          <p class="mt-4">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu.
          </p>
        </div>
        <div class="col-sm-6">
          <h2 class="mt-1">Víziónk</h2>
          <blockquote class="blockquote">
            Lorem ipsum dolor <strong>sit amet</strong>, <br />
            consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
            <strong>Aenean massa</strong>. Cum sociis natoque.
          </blockquote>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {}
}
</script>

<style lang="scss">
@import '~/assets/scss/variables';
.blockquote {
  padding: 1rem 0;
  margin: 1rem 0;
  border-top: 1px solid $body-color;
  border-bottom: 1px solid $body-color;
}
</style>
