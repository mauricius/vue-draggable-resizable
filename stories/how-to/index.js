import { withMarkdownNotes } from '@storybook/addon-notes';

import DragMultiple from './drag-multiple'
import DragMultipleNotes from './notes/drag-multiple.md'

export default {
  'Drag Multiple Elements':  withMarkdownNotes(DragMultipleNotes)(() => (new DragMultiple))
}