<template>
  <div
    v-if="isOpen"
    class="lightbox"
    role="dialog"
    aria-modal="true"
    @click.self="close"
  >
    <button
      class="lightbox__close"
      type="button"
      aria-label="Close image gallery"
      @click="close"
    >
      ×
    </button>

    <button
      v-if="hasPrev"
      class="lightbox__nav lightbox__nav--prev"
      type="button"
      aria-label="Previous image"
      @click="prev"
    >
      ‹
    </button>

    <figure class="lightbox__figure mb-0">
      <img
        class="lightbox__image"
        :src="imageUrl(currentImage)"
        :alt="altText"
      />
    </figure>

    <button
      v-if="hasNext"
      class="lightbox__nav lightbox__nav--next"
      type="button"
      aria-label="Next image"
      @click="next"
    >
      ›
    </button>
  </div>
</template>

<script>
export default {
  name: 'ImageLightbox',
  props: {
    images: {
      type: Array,
      default: () => []
    },
    index: {
      type: Number,
      default: null
    },
    imgPath: {
      type: String,
      default: ''
    },
    altPrefix: {
      type: String,
      default: 'Gallery image'
    }
  },
  computed: {
    isOpen() {
      return (
        this.index !== null &&
        this.index >= 0 &&
        this.index < this.images.length
      )
    },
    currentImage() {
      if (!this.isOpen) {
        return ''
      }
      return this.images[this.index]
    },
    hasPrev() {
      return this.isOpen && this.index > 0
    },
    hasNext() {
      return this.isOpen && this.index < this.images.length - 1
    },
    altText() {
      if (!this.isOpen) {
        return this.altPrefix
      }
      return `${this.altPrefix} #${this.index + 1}`
    }
  },
  watch: {
    isOpen(isOpen) {
      if (typeof document === 'undefined') {
        return
      }

      document.body.style.overflow = isOpen ? 'hidden' : ''
    }
  },
  beforeUnmount() {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = ''
    }
  },
  beforeDestroy() {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = ''
    }
  },
  methods: {
    imageUrl(url) {
      return `${this.imgPath}${url}`
    },
    close() {
      this.$emit('close')
    },
    prev() {
      if (!this.hasPrev) {
        return
      }
      this.$emit('change', this.index - 1)
    },
    next() {
      if (!this.hasNext) {
        return
      }
      this.$emit('change', this.index + 1)
    }
  }
}
</script>

<style scoped>
.lightbox {
  position: fixed;
  z-index: 1200;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.88);
  padding: 1rem 3.5rem;
}

.lightbox__figure {
  max-width: min(96vw, 1400px);
  max-height: 92vh;
}

.lightbox__image {
  max-width: 100%;
  max-height: 92vh;
  object-fit: contain;
}

.lightbox__close,
.lightbox__nav {
  position: absolute;
  border: 0;
  color: #fff;
  background: rgba(20, 20, 20, 0.55);
  cursor: pointer;
  line-height: 1;
}

.lightbox__close {
  top: 0.75rem;
  right: 1rem;
  font-size: 2.25rem;
  width: 2.5rem;
  height: 2.5rem;
}

.lightbox__nav {
  top: 50%;
  transform: translateY(-50%);
  font-size: 3rem;
  width: 3rem;
  height: 3rem;
}

.lightbox__nav--prev {
  left: 0.75rem;
}

.lightbox__nav--next {
  right: 0.75rem;
}

@media (max-width: 768px) {
  .lightbox {
    padding: 1rem;
  }

  .lightbox__nav {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 2rem;
  }
}
</style>
