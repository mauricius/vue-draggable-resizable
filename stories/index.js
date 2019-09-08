import { storiesOf } from '@storybook/vue'

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
    .add(story, BasicStories[story][0], markdownNotes(BasicStories[story][1]))
}

for (var story in GridStories) {
  storiesOf('Grid', module)
    .add(story, GridStories[story][0], markdownNotes(GridStories[story][1]))
}

for (var story in ParentStories) {
  storiesOf('Parent', module)
    .add(story, ParentStories[story][0], markdownNotes(ParentStories[story][1]))
}

for (var story in AspectRatioStories) {
  storiesOf('Aspect Ratio', module)
    .add(story, AspectRatioStories[story][0], markdownNotes(AspectRatioStories[story][1]))
}

for (var story in StylingStories) {
  storiesOf('Styling', module)
    .add(story, StylingStories[story][0], markdownNotes(StylingStories[story][1]))
}

for (var story in EventsStories) {
  storiesOf('Events', module)
    .add(story, EventsStories[story][0], markdownNotes(EventsStories[story][1]))
}

for (var story in AdvancedStories) {
  storiesOf('Advanced', module)
    .add(story, AdvancedStories[story][0], markdownNotes(AdvancedStories[story][1]))
}

for (var story in HowToStories) {
  storiesOf('How To', module)
    .add(story, HowToStories[story][0], markdownNotes(HowToStories[story][1]))
}

/**
 * Render markdown notes, if available
 * @param  {String} notes
 * @return {Object}
 */
function markdownNotes(notes) {
  return notes
    ? { notes: { markdown: notes }}
    : {}
}