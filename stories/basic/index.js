import { withMarkdownNotes } from '@storybook/addon-notes';

import Basic from './basic'
import BasicNotes from './notes/basic.md'
import BasicMinWidthHeight from './basic-min-width-height'
import BasicMinWidthHeightNotes from './notes/basic-min-width-height.md'
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

export default {
  'Basic component' : withMarkdownNotes(BasicNotes)(() => (new Basic)),
  'Basic component with minw and minh' : withMarkdownNotes(BasicMinWidthHeightNotes)(() => (new BasicMinWidthHeight)),
  'Basic component with form inside' : withMarkdownNotes(BasicWithFormNotes)(() => (new BasicWithForm)),
  'Basic component with active prop' : withMarkdownNotes(BasicActiveNotes)(() => (new BasicActive)),
  'Basic component with deactivation prevented' : withMarkdownNotes(BasicPreventDeactivationNotes)(() => (new BasicPreventDeactivation)),
  'Basic component not draggable' : withMarkdownNotes(BasicNotDraggableNotes)(() => (new BasicNotDraggable)),
  'Basic component not resizable' : withMarkdownNotes(BasicNotResizableNotes)(() => (new BasicNotResizable)),
  'Basic component with native drag disabled' : withMarkdownNotes(BasicNativeDragEnabledNotes)(() => (new BasicNativeDragEnabled)),
  'Basic controlled component' : withMarkdownNotes(BasicControlledNotes)(() => (new BasicControlled)),
  'Basic component with drag handle' : withMarkdownNotes(BasicDragHandleNotes)(() => (new BasicDragHandle)),
  'Basic component with drag cancel' : withMarkdownNotes(BasicCancelHandleNotes)(() => (new BasicCancelHandle)),
  'Basic component with z-index prop' : withMarkdownNotes(BasicZIndexNotes)(() => (new BasicZIndex)),
  'Basic component with handles prop' : withMarkdownNotes(BasicHandlesNotes)(() => (new BasicHandles)),
  'Basic component with axis prop' : withMarkdownNotes(BasicAxisNotes)(() => (new BasicAxis)),
}
