import MarkdownIt from 'markdown-it'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  const md = new MarkdownIt()

  return {
    provide: {
      md
    }
  }
})
