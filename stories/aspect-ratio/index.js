import AspectRatio from './aspect-ratio'
import AspectRatioNotes from './notes/aspect-ratio.md'
import AspectRatioParent from './aspect-ratio-in-parent'
import AspectRatioParentNotes from './notes/aspect-ratio-in-parent.md'
import AspectRatioMinWidthMinHeight from './aspect-ratio-with-minw-minh'
import AspectRatioMinWidthMinHeightNotes from './notes/aspect-ratio-with-minw-minh.md'
import AspectRatioMaxWidthMaxHeight from './aspect-ratio-with-maxw-maxh'
import AspectRatioMaxWidthMaxHeightNotes from './notes/aspect-ratio-with-maxw-maxh.md'
import AspectRatioGrid from './aspect-ratio-with-grid'
import AspectRatioGridNotes from './notes/aspect-ratio-with-grid.md'
import AspectRatioGridOffsetMin from './aspect-ratio-grid-with-offset-and-min'
import AspectRatioGridParent from './aspect-ratio-with-grid-in-parent'

export default {
  'Basic Aspect Ratio' : [() => new AspectRatio, AspectRatioNotes],
  'Costrained in Parent' : [() => new AspectRatioParent, AspectRatioParentNotes],
  'With minHeight and minWidth' : [() => new AspectRatioMinWidthMinHeight, AspectRatioMinWidthMinHeightNotes],
  'With maxWidth and maxHeight' : [() => new AspectRatioMaxWidthMaxHeight, AspectRatioMaxWidthMaxHeightNotes],
  'Forced on grid' : [() => new AspectRatioGrid, AspectRatioGridNotes],
  'Forced on grid with offset and min' : [() => new AspectRatioGridOffsetMin],
  'Forced on grid in parent' : [() => new AspectRatioGridParent]
}
