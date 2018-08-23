import { withMarkdownNotes } from '@storybook/addon-notes';

import EventsActivated from './events-activated'
import EventsDragging from './events-dragging'
import EventsResizing from './events-resizing'

export default {
  'Activated' : () => (new EventsActivated),
  'Dragging' : () => (new EventsDragging),
  'Resizing' : () => (new EventsResizing)
}