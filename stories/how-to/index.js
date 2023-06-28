import DragMultiple from './drag-multiple'
import DragMultipleNotes from './notes/drag-multiple.md'
import FrameSelection from './frame-selection'
import FrameSelectionNotes from './notes/frame-selection.md'
export default {
  'Drag Multiple Elements':  [() => new DragMultiple, DragMultipleNotes],
  'Frame Selection':[() => new FrameSelection, FrameSelectionNotes]
}
