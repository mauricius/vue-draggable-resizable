import { withMarkdownNotes } from '@storybook/addon-notes';

import AspectRatio from './aspect-ratio'
import AspectRatioNotes from './notes/aspect-ratio.md'
import AspectRatioParent from './aspect-ratio-in-parent'
import AspectRatioParentNotes from './notes/aspect-ratio-in-parent.md'
import AspectRatioMin from './aspect-ratio-with-min'
import AspectRatioMinNotes from './notes/aspect-ratio-with-min.md'
import AspectRatioGrid from './aspect-ratio-with-grid'
import AspectRatioGridNotes from './notes/aspect-ratio-with-grid.md'
import AspectRatioGridOffsetMin from './aspect-ratio-grid-with-offset-and-min'
import AspectRatioGridParent from './aspect-ratio-with-grid-in-parent'

export default {
  'Basic Aspect Ratio' : withMarkdownNotes(AspectRatioNotes)(() => (new AspectRatio)),
  'Costrained in Parent' : withMarkdownNotes(AspectRatioParentNotes)(() => (new AspectRatioParent)),
  'With minHeight and minWidth' : withMarkdownNotes(AspectRatioMinNotes)(() => (new AspectRatioMin)),
  'Forced on grid' : withMarkdownNotes(AspectRatioGridNotes)(() => (new AspectRatioGrid)),
  'Forced on grid with offset and min' : () => (new AspectRatioGridOffsetMin),
  'Forced on grid in parent' : () => (new AspectRatioGridParent),
}