export const state = () => ({
  blogPosts: [],
  projects: [],
  services: [],
  projectTags: [
    { label: 'Minden típus', value: 'ALL' },
    { label: 'Lebonyolítás', value: 'IMPL' },
    { label: 'Projektmenedzsment', value: 'PM' },
    { label: 'Műszaki ellenőrzés', value: 'TS' },
    { label: 'Műszaki tanácsadás', value: 'TC' },
    { label: 'Ingatlanfejelsztés', value: 'RED' }
  ]
})
