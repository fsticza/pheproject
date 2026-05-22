const fs = require('node:fs')
const path = require('node:path')
const test = require('ava').default

test('HeadImg component contains expected hero image reference', (t) => {
  const filePath = path.join(__dirname, '../../components/HeadImg.vue')
  const source = fs.readFileSync(filePath, 'utf8')

  t.true(source.includes('index-head2.jpg'))
  t.true(source.includes('PHE | M'))
})
