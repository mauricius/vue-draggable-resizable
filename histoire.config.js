import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'

export default defineConfig({
  plugins: [
    HstVue(),
  ],
  setupFile: './stories/histoire.setup.js',
  tree: {
    groups: [
      {
        id: 'top',
        title: '',
      },
      {
        title: 'Basic Stories',
        include: file => file.path.startsWith('stories/basic'),
      },
      {
        title: 'Grid Stories',
        include: file => file.path.startsWith('stories/grid'),
      },
      {
        title: 'Parent Stories',
        include: file => file.path.startsWith('stories/parent'),
      },
      {
        title: 'Aspect Ratio Stories',
        include: file => file.path.startsWith('stories/aspect-ratio'),
      },
      {
        title: 'Styling Stories',
        include: file => file.path.startsWith('stories/styling'),
      },
      {
        title: 'Events Stories',
        include: file => file.path.startsWith('stories/events'),
      },
      {
        title: 'Callback Stories',
        include: file => file.path.startsWith('stories/callback'),
      },
      {
        title: 'Advanced Stories',
        include: file => file.path.startsWith('stories/advanced'),
      },
      {
        title: 'How To',
        include: file => file.path.startsWith('stories/how-to'),
      },
    ],
  },
})
