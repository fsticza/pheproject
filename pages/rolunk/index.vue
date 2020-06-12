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
      <div class="mt-4">
        <h1 class="h3">Rólunk</h1>
        <p class="mt-4 text-justify">
          Cégünk a PHE Project development & consulting azzal a céllal jött
          létre, hogy külföldi tapasztalatainkat kamatoztatva, napjaink
          elvárásának megfelelő, magas színvonalú mérnöki támogatást nyújtsunk
          közép- és nagy léptékű építőipari beruházások megvalósításában.
          Tevékenységünk kiterjed a projektmenedzsment, a beruházás lebonyolítás
          és a műszaki ellenőrzési feladatokra, illetve kiemelten kezeljük
          Megrendelőink szakmai támogatását és műszaki tanácsadását a közös
          munka során. Tapasztalt kollégáinkkal a szakági területeken, az
          épületgépészeti és az épületvillamossági, illetve épületautomatizálási
          és üzemeltetési kérdésekben is megfelelő javaslatokat és megoldásokat
          kínálunk.
        </p>
        <p>
          Ezek mellett kisebb léptékű, saját ingatlanfejlesztési és
          ingatlanhasznosítási projekteken dolgozunk Magyarországon és
          külföldön.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import HeadImg from '../../components/HeadImg'
export default {
  components: {
    HeadImg
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
      title: 'PHE project development & consulting - Rólunk'
    }
  }
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
