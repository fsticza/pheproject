<template>
  <article class="actual-content privacy-page">
    <h1 class="h2 mb-3">Adatvédelmi tájékoztató</h1>
    <p class="mb-4">
      Az adatvédelmi tájékoztató alább beágyazva olvasható. Ha a beágyazás nem
      tölt be, a dokumentum közvetlenül is megnyitható.
    </p>

    <div class="privacy-pdf-wrapper mb-3">
      <iframe
        class="privacy-pdf"
        src="/adatvedelmi-tajekoztato.pdf"
        title="Adatvédelmi tájékoztató PDF"
      />
    </div>

    <a
      class="more-link"
      href="/adatvedelmi-tajekoztato.pdf"
      target="_blank"
      rel="noopener noreferrer"
    >
      PDF megnyitása új lapon
    </a>
  </article>
</template>

<script>
export default {
  head() {
    return {
      title: 'Adatvédelmi tájékoztató - PHE project development & consulting'
    }
  }
}
</script>

<style scoped>
.privacy-pdf-wrapper {
  border: 1px solid #e6e6e6;
}

.privacy-pdf {
  display: block;
  width: 100%;
  min-height: 75vh;
  border: 0;
}
</style>