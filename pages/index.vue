<template>
  <div class="container">
    <img height="600" class="img-fluid" src="img/index-head.jpg" alt="" />
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
