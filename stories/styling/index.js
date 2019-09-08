import StyleComponent from './style-component'
import StyleComponentNotes from './notes/style-component.md'
import StyleDragging from './style-dragging'
import StyleDraggingNotes from './notes/style-dragging.md'
import StyleResizing from './style-resizing'
import StyleResizingNotes from './notes/style-resizing.md'
import StyleActive from './style-active'
import StyleActiveNotes from './notes/style-active.md'
import StyleHandles from './style-handles'
import StyleHandlesNotes from './notes/style-handles.md'
import StyleHandleSlots from './style-handle-slots'
import StyleHandleSlotsNotes from './notes/style-handle-slots.md'

export default {
  'Style Component' : [() => new StyleComponent, StyleComponentNotes],
  'Style Dragging' : [() => new StyleDragging, StyleDraggingNotes],
  'Style Resizing' : [() => new StyleResizing, StyleResizingNotes],
  'Style Active' : [() => new StyleActive, StyleActiveNotes],
  'Style Handles' : [() => new StyleHandles, StyleHandlesNotes],
  'Style Handles With Slots' : [() => new StyleHandleSlots, StyleHandleSlotsNotes]
}