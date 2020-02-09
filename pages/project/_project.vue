<template>
  <article>
    <div class="head-img head-img--small">
      <img class="img" loading="lazy" src="/img/index-head2.jpg" alt="" />
      <h1 class="head__title">
        <span class="first-line">mérnöki <strong>megoldások</strong></span>
        mindenki számára
      </h1>
    </div>

    <div class="actual-content">
      <div class="row">
        <div class="col-sm-6">
          <div class="img-canvas" style="height: 400px">
            <img class="img" loading="lazy" :src="project.image" alt="" />
          </div>
        </div>
        <div class="col-sm-6">
          <h1 class="h3 pt-3 mb-4">{{ project.title }}</h1>
          <div class="text-justify" v-html="$md.render(project.body)" />
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
                class="img"
                style="cursor:pointer;"
                loading="lazy"
                :src="url"
                alt=""
                @click="galleryIndex = imageIndex"
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
      galleryIndex: null
    }
  },
  async asyncData({ params, payload }) {
    if (payload) return { project: payload }
    else
      return {
        project: await require(`~/assets/content/project/${params.project}.json`)
      }
  },
  head() {
    return {
      title: `${this.project.title} - PHE project development & consulting`
    }
  }
}
</script>
