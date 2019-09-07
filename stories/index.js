import { storiesOf } from '@storybook/vue'
import { withMarkdownNotes } from '@storybook/addon-notes'

import './styles.css';

import AspectRatioStories from './aspect-ratio/index'
import BasicStories from './basic/index'
import GridStories from './grid/index'
import ParentStories from './parent/index'
import StylingStories from './styling/index'
import EventsStories from './events/index'
import AdvancedStories from './advanced/index'
import HowToStories from './how-to/index'

for (var story in BasicStories) {
  storiesOf('Basic', module)
    .add(story, BasicStories[story])
}

for (var story in GridStories) {
  storiesOf('Grid', module)
    .add(story, GridStories[story])
}

for (var story in ParentStories) {
  storiesOf('Parent', module)
    .add(story, ParentStories[story])
}

for (var story in AspectRatioStories) {
  storiesOf('Aspect Ratio', module)
    .add(story, AspectRatioStories[story])
}

for (var story in StylingStories) {
  storiesOf('Styling', module)
    .add(story, StylingStories[story])
}

for (var story in EventsStories) {
  storiesOf('Events', module)
    .add(story, EventsStories[story])
}

for (var story in AdvancedStories) {
  storiesOf('Advanced', module)
    .add(story, AdvancedStories[story])
}

for (var story in HowToStories) {
  storiesOf('How To', module)
    .add(story, HowToStories[story])
}