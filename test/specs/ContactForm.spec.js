const fs = require('node:fs')
const path = require('node:path')
const test = require('ava').default

const source = fs.readFileSync(
  path.join(__dirname, '../../pages/kapcsolat/index.vue'),
  'utf8'
)

test('contact form keeps Netlify-compatible hidden fields and endpoint', (t) => {
  t.true(source.includes('action="/kapcsolat/"'))
  t.true(source.includes('method="POST"'))
  t.true(source.includes('name="contact"'))
  t.true(source.includes('data-netlify="true"'))
  t.true(source.includes('data-netlify-honeypot="bot-field"'))
  t.true(source.includes('name="form-name"'))
  t.true(source.includes('value="contact"'))
  t.true(source.includes('name="bot-field"'))
})

test('contact form contains textarea and v-model for message', (t) => {
  t.true(source.includes('textarea'))
  t.true(source.includes('name="message"'))
  t.true(source.includes('v-model="message"'))
})
