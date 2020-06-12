<template>
  <img
    :srcset="
      `${imgPath}/img/index-head2.jpg?nf_resize=fit&w=1650 1650w,
      ${imgPath}/img/index-head2.jpg?nf_resize=fit&w=1110   930w
    `
    "
    :src="`${imgPath}/img/index-head2.jpg?nf_resize=fit&w=690`"
    class="img"
    sizes="(min-width: 1680px) 1650px, (min-width: 992px) 930px"
    alt="PHE | Mérnöki megoldásoktól mindenkinek"
  />
</template>

<script>
export default {
  data() {
    return {
      imgPath: 'https://d1loboc6rox52k.cloudfront.net'
    }
  }
}
</script>
