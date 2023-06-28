import EventsActivated from './events-activated'
import EventsActivatedNotes from './notes/events-activated.md'
import EventsDragging from './events-dragging'
import EventsDraggingNotes from './notes/events-dragging.md'
import EventsResizing from './events-resizing'
import EventsResizingNotes from './notes/events-resizing.md'

export default {
  'Activated' : [() => new EventsActivated, EventsActivatedNotes],
  'Dragging' : [() => new EventsDragging, EventsDraggingNotes],
  'Resizing' : [() => new EventsResizing, EventsResizingNotes]
}