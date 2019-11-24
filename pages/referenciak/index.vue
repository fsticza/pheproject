<template>
  <div>
    <div class="head-img">
      <img
        class="img"
        loading="lazy"
        src="/img/construction-head-1.jpg"
        alt=""
      />
    </div>

    <div class="row mt-4">
      <div class="col-sm-10 offset-sm-1">
        <section>
          <reference-list />
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import ReferenceList from '../../components/ReferenceList'
export default {
  components: {
    ReferenceList
  },
  computed: {
    projects() {
      return this.$store.state.projects
    }
  }
}
</script>
