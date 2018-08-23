import Vue from 'vue'

const style = {
    position: 'relative',
    backgroundColor: '#808080',
    background: 'linear-gradient(-90deg, rgba(0, 0, 0, .1) 1px, transparent 1px), linear-gradient(rgba(0, 0, 0, .1) 1px, transparent 1px)',
    backgroundSize: '20px 20px, 20px 20px',
    backgroundPosition: '10px 10px'
}

export default () => ({
  template: `
    <div :style='${JSON.stringify(style)}'>
      <vue-draggable-resizable :grid="[20,20]" :x="10" :y="10">
        <p>Grid 20x20 starting with a 10x10 offset</p>
      </vue-draggable-resizable>
    </div>
  `
})