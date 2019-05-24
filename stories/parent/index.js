import { withMarkdownNotes } from '@storybook/addon-notes';

import ParentBasicCase from './parent-basic-case'
import ParentBasicCaseNotes from './notes/parent-basic-case.md'
import ParentMaxWidthMaxHeight from './parent-maxw-maxh'
import ParentMaxWidthMaxHeightNotes from './notes/parent-maxw-maxh.md'
import ParentGrid from './parent-grid'
import ParentGridNotes from './notes/parent-grid.md'
import ParentGridWithOffset from './parent-grid-with-offset'
import ParentGridWithOffsetNotes from './notes/parent-grid-with-offset.md'
import ParentGridWithEvenOffset from './parent-grid-with-even-offset'
import ParentGridWithEvenOffsetNotes from './notes/parent-grid-with-even-offset.md'
import ParentGridMaxWidthMaxHeight from './parent-grid-maxw-maxh'
import ParentGridMaxWidthMaxHeightNotes from './notes/parent-grid-maxw-maxh.md'
import ParentControlledComponent from './parent-controlled-component'
import ParentControlledComponentNotes from './notes/parent-controlled-component.md'
import ParentUserSelect from './parent-user-select'

export default {
  'Parent Basic Case' : withMarkdownNotes(ParentBasicCaseNotes)(() => (new ParentBasicCase)),
  'Parent MaxWidth MaxHeight' : withMarkdownNotes(ParentMaxWidthMaxHeightNotes)(() => (new ParentMaxWidthMaxHeight)),
  'Parent Grid' : withMarkdownNotes(ParentGridNotes)(() => (new ParentGrid)),
  'Parent Grid With Offset' : withMarkdownNotes(ParentGridWithOffsetNotes)(() => (new ParentGridWithOffset)),
  'Parent Grid With Even Offset' : withMarkdownNotes(ParentGridWithEvenOffsetNotes)(() => (new ParentGridWithEvenOffset)),
  'Parent Grid With MaxWidth MaxHeight' : withMarkdownNotes(ParentGridMaxWidthMaxHeightNotes)(() => (new ParentGridMaxWidthMaxHeight)),
  'Parent Controlled Component' : withMarkdownNotes(ParentControlledComponentNotes)(() => (new ParentControlledComponent)),
  'Parent User Select': () => new ParentUserSelect
}
