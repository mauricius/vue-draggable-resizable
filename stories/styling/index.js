import { withMarkdownNotes } from '@storybook/addon-notes';

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
  'Style Component' : withMarkdownNotes(StyleComponentNotes)(() => (new StyleComponent)),
  'Style Dragging' : withMarkdownNotes(StyleDraggingNotes)(() => (new StyleDragging)),
  'Style Resizing' : withMarkdownNotes(StyleResizingNotes)(() => (new StyleResizing)),
  'Style Active' : withMarkdownNotes(StyleActiveNotes)(() => (new StyleActive)),
  'Style Handles' : withMarkdownNotes(StyleHandlesNotes)(() => (new StyleHandles)),
  'Style Handles With Slots' : withMarkdownNotes(StyleHandleSlotsNotes)(() => (new StyleHandleSlots)),
}