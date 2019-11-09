<template>
  <div>
    <div class="head-img">
      <img class="img" src="/img/construction-head-1.jpg" alt="" />
    </div>

    <div class="row">
      <div class="col-sm-10 offset-sm-1">
        <section>
          <article
            v-for="(project, idx) in projects"
            :key="idx"
            class="my-4"
            :class="idx === 0 ? 'active' : ''"
          >
            <div class="row align-items-center">
              <div class="col-sm-4">
                <div class="img-canvas" style="height: 200px">
                  <img :src="project.image" class="img" alt="..." />
                </div>
              </div>
              <div class="col-sm-8">
                <h1>{{ project.title }}</h1>
                <p>
                  {{ project.description }}
                </p>
                <div>
                  <NLink
                    :to="{
                      name: 'referenciak-project',
                      params: { project: project.slug }
                    }"
                  >
                    Bővebben
                  </NLink>
                </div>
              </div>
            </div>
          </article>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    projects() {
      console.log(this.$store.state.projects)
      return this.$store.state.projects
    }
  }
}
</script>
