export default defineNitroPlugin((nitroApp) => {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  nitroApp.hooks.hook('error', (error, { event } = {}) => {
    const path = event?.path || 'unknown'
    const message = error instanceof Error ? error.message : String(error)
    const stack = error instanceof Error ? error.stack || '' : ''

    console.error(`[dev-error] path=${path} message=${message}`)

    if (stack) {
      console.error(stack)
    }
  })
})
