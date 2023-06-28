import Vue from 'vue'

const style = {
    position: 'relative',
    backgroundColor: '#808080',
    background: 'linear-gradient(-90deg, rgba(0, 0, 0, .1) 1px, transparent 1px), linear-gradient(rgba(0, 0, 0, .1) 1px, transparent 1px)',
    backgroundSize: '20px 20px, 20px 20px',
}

export default () => ({
  template: `
    <div :style='${JSON.stringify(style)}'>
      <vue-draggable-resizable :w="400" :h="200" :lock-aspect-ratio="true" :grid=[20,20]>
        <p>Keep aspect ratio in component costrained on grid.</p>
      </vue-draggable-resizable>
    </div>
  `
})