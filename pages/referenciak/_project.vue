<template>
  <article>
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
      <div class="row">
        <div class="col-sm-6">
          <div class="img-canvas" style="height: 400px">
            <img
              :srcset="
                `
                ${imgPath}${project.image}?nf_resize=fit&w=780 1650w,
                ${imgPath}${project.image}?nf_resize=fit&w=540 1110w,
                ${imgPath}${project.image}?nf_resize=fit&w=450   930w,
                ${imgPath}${project.image}?nf_resize=fit&w=240   690w
                `
              "
              :src="`${imgPath}${project.image}?nf_resize=fit&w=520`"
              :alt="`${project.title} | PHE`"
              class="img"
              loading="lazy"
              sizes="(min-width: 1680px) 1650px, (min-width: 1200px) 1110px, (min-width: 992px) 930px, (min-width: 768px) 690px"
            />
          </div>
        </div>
        <div class="col-sm-6">
          <h1 class="h3 pt-3 mb-4">{{ project.title }}</h1>
          <div v-html="$md.render(project.body)" class="text-justify" />
        </div>
      </div>

      <LightGallery
        :images="project.galleryImages"
        :index="galleryIndex"
        :disable-scroll="true"
        @close="galleryIndex = null"
      />

      <div class="images-wrapper mt-4">
        <div class="row">
          <div
            v-for="(url, imageIndex) in project.galleryImages"
            :key="imageIndex"
            class="col-sm-6 col-md-4 col-lg-3 col-xl-2"
          >
            <div class="img-canvas my-2" style="height: 200px">
              <img
                :srcset="
                  `
                  ${imgPath}${url}?nf_resize=fit&w=240 1650w,
                  ${imgPath}${url}?nf_resize=fit&w=200 1110w,
                  ${imgPath}${url}?nf_resize=fit&w=200   930w,
                  ${imgPath}${url}?nf_resize=fit&w=240   690w
                  `
                "
                :src="`${imgPath}${url}?nf_resize=fit&w=520`"
                :alt="`${project.title} | PHE gallery image #${imageIndex + 1}`"
                @click="galleryIndex = imageIndex"
                class="img"
                style="cursor:pointer;"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      imgPath:
        process.env.NODE_ENV === 'development'
          ? ''
          : 'https://d1loboc6rox52k.cloudfront.net',
      galleryIndex: null
    }
  },
  async asyncData({ params, payload }) {
    if (payload) return { project: payload }
    else
      return {
        project: await require(`~/assets/content/referenciak/${params.project}.json`)
      }
  },
  head() {
    return {
      title: `${this.project.title} - PHE project development & consulting`
    }
  }
}
</script>
