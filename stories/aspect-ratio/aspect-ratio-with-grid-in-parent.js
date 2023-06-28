import Vue from 'vue'

const style = {
    position: 'relative',
    backgroundColor: '#808080',
    background: 'linear-gradient(-90deg, rgba(0, 0, 0, .1) 1px, transparent 1px), linear-gradient(rgba(0, 0, 0, .1) 1px, transparent 1px)',
    backgroundSize: '20px 20px, 20px 20px',
    height: '400px',
    width: '400px',
    border: '1px solid blue',
    margin: '20px',
    boxSizing: 'border-box'
}

export default () => ({
  template: `
    <div :style='${JSON.stringify(style)}'>
      <vue-draggable-resizable :grid=[20,20] :parent="true" :lock-aspect-ratio="true">
        <p>Keep aspect ratio, grid and parent costrained.</p>
      </vue-draggable-resizable>
    </div>
  `
})