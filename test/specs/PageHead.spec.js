const fs = require('node:fs')
const path = require('node:path')
const test = require('ava').default

const pluginSource = fs.readFileSync(
  path.join(__dirname, '../../plugins/route-title.ts'),
  'utf8'
)
const blogDetailSource = fs.readFileSync(
  path.join(__dirname, '../../pages/blog/[blog].vue'),
  'utf8'
)
const projectDetailSource = fs.readFileSync(
  path.join(__dirname, '../../pages/referenciak/[project].vue'),
  'utf8'
)

test('static route title shim contains expected page titles', (t) => {
  t.true(
    pluginSource.includes(
      "'/blog': 'PHE project development & consulting - Extrák'"
    )
  )
  t.true(
    pluginSource.includes(
      "'/referenciak': 'PHE project development & consulting - Referenciák'"
    )
  )
  t.true(
    pluginSource.includes(
      "'/szolgaltatasok': 'PHE project development & consulting - Szolgáltatások'"
    )
  )
  t.true(
    pluginSource.includes(
      "'/rolunk': 'PHE project development & consulting - Rólunk'"
    )
  )
  t.true(
    pluginSource.includes(
      "'/kapcsolat': 'PHE project development & consulting - Kapcsolat'"
    )
  )
})

test('detail page scripts still include dynamic title format', (t) => {
  const blogTitleTemplate =
    '${' + 'this.blogPost.title} - PHE project development & consulting'
  const projectTitleTemplate =
    '${' + 'this.project.title} - PHE project development & consulting'

  t.true(blogDetailSource.includes(blogTitleTemplate))
  t.true(projectDetailSource.includes(projectTitleTemplate))
})
