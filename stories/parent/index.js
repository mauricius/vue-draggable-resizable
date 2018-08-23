import { withMarkdownNotes } from '@storybook/addon-notes';

import ParentBasicCase from './parent-basic-case'
import ParentBasicCaseNotes from './notes/parent-basic-case.md'
import ParentSelector from './parent-selector'
import ParentSelectorNotes from './notes/parent-selector.md'
import ParentUserSelect from './parent-user-select'
import ParentGrid from './parent-grid'
import ParentGridNotes from './notes/parent-grid.md'
import ParentGridWithOffset from './parent-grid-with-offset'
import ParentGridWithOffsetNotes from './notes/parent-grid-with-offset.md'
import ParentGridWithEvenOffset from './parent-grid-with-even-offset'
import ParentGridWithEvenOffsetNotes from './notes/parent-grid-with-even-offset.md'
import ParentControlledComponent from './parent-controlled-component'
import ParentControlledComponentNotes from './notes/parent-controlled-component.md'

export default {
  'Parent Basic Case' : withMarkdownNotes(ParentBasicCaseNotes)(() => (new ParentBasicCase)),
  'Parent Selector' : withMarkdownNotes(ParentSelectorNotes)(() => (new ParentSelector)),
  'Parent Grid' : withMarkdownNotes(ParentGridNotes)(() => (new ParentGrid)),
  'Parent Grid With Offset' : withMarkdownNotes(ParentGridWithOffsetNotes)(() => (new ParentGridWithOffset)),
  'Parent Grid With Even Offset' : withMarkdownNotes(ParentGridWithEvenOffsetNotes)(() => (new ParentGridWithEvenOffset)),
  'Parent Controlled Component' : withMarkdownNotes(ParentControlledComponentNotes)(() => (new ParentControlledComponent))
}