import Grid2020 from './grid-20-20'
import Grid2020Notes from './notes/grid-20-20.md'
import Grid2040 from './grid-20-40'
import Grid2040Notes from './notes/grid-20-40.md'
import Grid2020WithOffset from './grid-20-20-with-offset'
import Grid2020WithOffsetNotes from './notes/grid-20-20-with-offset.md'
import Grid2040WithOffsetAndMin from './grid-20-40-with-offset-and-min'
import Grid2040WithOffsetAndMinNotes from './notes/grid-20-40-with-offset-and-min.md'
import Grid2040WithOffsetAndMax from './grid-20-40-with-offset-and-max'
import Grid2040WithOffsetAndMaxNotes from './notes/grid-20-40-with-offset-and-max.md'

export default {
  'Grid 20x20' : [() => new Grid2020, Grid2020Notes],
  'Grid 20x40' : [() => new Grid2040, Grid2040Notes],
  'Grid 20x20 with 10x10 offset' : [() => new Grid2020WithOffset, Grid2020WithOffsetNotes],
  'Grid 20x40 with 10x20 offset and minHeight, minWidth' : [() => new Grid2040WithOffsetAndMin, Grid2040WithOffsetAndMinNotes],
  'Grid 20x40 with 10x20 offset and maxHeight, maxWidth' : [() => new Grid2040WithOffsetAndMax, Grid2040WithOffsetAndMaxNotes],
}
