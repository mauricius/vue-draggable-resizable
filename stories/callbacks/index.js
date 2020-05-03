import OnDragStart from './on-drag-start-callback'
import OnDragStartNotes from './notes/on-drag-start-callback.md'
import OnDrag from './on-drag-callback'
import OnDragNotes from './notes/on-drag-callback.md'
import OnResizeStart from './on-resize-start-callback'
import OnResize from './on-resize-callback'
import OnResizeStartNotes from './notes/on-resize-start-callback.md'
import OnResizeNotes from './notes/on-resize-callback.md'

export default {
  'onDragStart callback' : [() => new OnDragStart, OnDragStartNotes],
  'onDrag callback': [() => new OnDrag, OnDragNotes],
  'onResizeStart callback' : [() => new OnResizeStart, OnResizeStartNotes],
  'onResize callback' : [() => new OnResize, OnResizeNotes]
}
