<template>
  <div>
    <h1 class="sr-only">Referenciák</h1>
    <ul class="nav nav-pills nav-fill">
      <li v-for="tag in projectTags" :key="tag.value" class="nav-item">
        <a
          class="nav-link project-nav-link"
          :class="projectFilter === tag.value ? 'active' : ''"
          href="#"
          @click.prevent="setProjectFilter(tag.value)"
          >{{ tag.label }}</a
        >
      </li>
    </ul>
    <div class="row">
      <div
        v-if="!filteredProjects.length"
        class="alert alert-info my-4 col-sm-6 offset-sm-3 text-center"
      >
        Még nincs projekt ebben a kategóriában
      </div>
      <article
        v-for="(project, idx) in filteredProjects"
        v-else
        :key="idx"
        class="mt-4 col-sm-4"
        :class="idx === 0 ? 'active' : ''"
      >
        <div class="img-canvas" style="height: 200px">
          <img loading="lazy" :src="project.image" class="img" alt="..." />
        </div>
        <h1 class="h3 pt-3">{{ project.title }}</h1>
        <p>{{ project.description }}</p>
        <NLink
          class="more-link"
          :to="{
            name: 'referenciak-project',
            params: { project: project.slug }
          }"
        >
          Bővebben
        </NLink>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    isExtended: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      projectFilter: 'ALL'
    }
  },
  computed: {
    projects() {
      return this.$store.state.projects
    },
    filteredProjects() {
      if (this.projectFilter === 'ALL') {
        return this.projects
      }
      return this.projects.filter((project) => {
        return project.tags.includes(this.projectFilter)
      })
    },
    projectTags() {
      return this.$store.state.projectTags
    }
  },
  mounted() {
    const tag = this.$store.$router.history.current.query.tag
    if (tag) {
      this.serviceFilter = tag
    }
  },
  methods: {
    setProjectFilter(value) {
      this.projectFilter = value
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/scss/variables';
.nav-pills {
  .project-nav-link {
    text-decoration: none;
    font-size: 0.875rem;
    color: $secondary;

    &.active {
      background-color: $secondary;
      color: #fff;
    }
  }
}
</style>
