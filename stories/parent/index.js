import ParentBasicCase from './parent-basic-case'
import ParentBasicCaseNotes from './notes/parent-basic-case.md'
import ParentMaxWidthMaxHeight from './parent-maxw-maxh'
import ParentMaxWidthMaxHeightNotes from './notes/parent-maxw-maxh.md'
import ParentAuto from './parent-auto'
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
  'Parent Basic Case' : [() => new ParentBasicCase, ParentBasicCaseNotes],
  'Parent MaxWidth MaxHeight' : [() => new ParentMaxWidthMaxHeight, ParentMaxWidthMaxHeightNotes],
  'Parent Grid' : [() => new ParentGrid, ParentGridNotes],
  'Parent Auto': [() => new ParentAuto()],
  'Parent Grid With Offset' : [() => new ParentGridWithOffset, ParentGridWithOffsetNotes],
  'Parent Grid With Even Offset' : [() => new ParentGridWithEvenOffset, ParentGridWithEvenOffsetNotes],
  'Parent Grid With MaxWidth MaxHeight' : [() => new ParentGridMaxWidthMaxHeight, ParentGridMaxWidthMaxHeightNotes],
  'Parent Controlled Component' : [() => new ParentControlledComponent, ParentControlledComponentNotes],
  'Parent User Select': [() => new ParentUserSelect]
}
