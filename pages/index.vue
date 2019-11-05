<template>
  <div>
    <div
      class="head-img"
      style="background-image: url('img/construction-head-3.jpg')"
    ></div>
  </div>
</template>

<script>
export default {
  components: {},
  head() {
    return {
      script: [
        { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }
      ]
    }
  }
}
</script>

<style lang="scss"></style>
