import Basic from './basic'
import BasicNotes from './notes/basic.md'
import BasicAuto from './basic-auto'
import BasicAutoNotes from './notes/basic-auto.md'
import BasicMinWidthHeight from './basic-min-width-height'
import BasicMinWidthHeightNotes from './notes/basic-min-width-height.md'
import BasicMaxWidthHeight from './basic-max-width-height'
import BasicMaxWidthHeightNotes from './notes/basic-max-width-height.md'
import BasicWithForm from './basic-with-form'
import BasicWithFormNotes from './notes/basic-with-form.md'
import BasicActive from './basic-active'
import BasicActiveNotes from './notes/basic-active.md'
import BasicPreventDeactivation from './basic-prevent-deactivation'
import BasicPreventDeactivationNotes from './notes/basic-prevent-deactivation.md'
import BasicNotDraggable from './basic-not-draggable'
import BasicNotDraggableNotes from './notes/basic-not-draggable.md'
import BasicNotResizable from './basic-not-resizable'
import BasicNotResizableNotes from './notes/basic-not-resizable.md'
import BasicNativeDragEnabled from './basic-native-drag-enabled'
import BasicNativeDragEnabledNotes from './notes/basic-native-drag-enabled.md'
import BasicControlled from './basic-controlled'
import BasicControlledNotes from './notes/basic-controlled.md'
import BasicDragHandle from './basic-drag-handle'
import BasicDragHandleNotes from './notes/basic-drag-handle.md'
import BasicCancelHandle from './basic-cancel-handle'
import BasicCancelHandleNotes from './notes/basic-cancel-handle.md'
import BasicZIndex from './basic-z-index'
import BasicZIndexNotes from './notes/basic-z-index.md'
import BasicHandles from './basic-handles'
import BasicHandlesNotes from './notes/basic-handles.md'
import BasicAxis from './basic-axis'
import BasicAxisNotes from './notes/basic-axis.md'
import BasicScale from './basic-scale'
import BasicScaleNotes from './notes/basic-scale.md'

export default {
  'Basic component': [() => new Basic, BasicNotes],
  'Basic component with "auto" size': [() => new BasicAuto, BasicAutoNotes],
  'Basic component with minw and minh' : [() => new BasicMinWidthHeight, BasicMinWidthHeightNotes],
  'Basic component with maxw and maxh' : [() => new BasicMaxWidthHeight, BasicMaxWidthHeightNotes],
  'Basic component with form inside' : [() => new BasicWithForm, BasicWithFormNotes],
  'Basic component with active prop' : [() => new BasicActive, BasicActiveNotes],
  'Basic component with deactivation prevented' : [() => new BasicPreventDeactivation, BasicPreventDeactivationNotes],
  'Basic component not draggable' : [() => new BasicNotDraggable, BasicNotDraggableNotes],
  'Basic component not resizable' : [() => new BasicNotResizable, BasicNotResizableNotes],
  'Basic component with native drag disabled' : [() => new BasicNativeDragEnabled, BasicNativeDragEnabledNotes],
  'Basic controlled component' : [() => new BasicControlled, BasicControlledNotes],
  'Basic component with drag handle' : [() => new BasicDragHandle, BasicDragHandleNotes],
  'Basic component with drag cancel' : [() => new BasicCancelHandle, BasicCancelHandleNotes],
  'Basic component with z-index prop' : [() => new BasicZIndex, BasicZIndexNotes],
  'Basic component with handles prop' : [() => new BasicHandles, BasicHandlesNotes],
  'Basic component with axis prop' : [() => new BasicAxis, BasicAxisNotes],
  'Basic component with scale prop' : [() => new BasicScale, BasicScaleNotes],
}
