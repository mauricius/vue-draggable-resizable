import Vue from 'vue'

const style = {
    position: 'relative',
    backgroundColor: '#808080',
    background: 'linear-gradient(-90deg, rgba(0, 0, 0, .1) 1px, transparent 1px), linear-gradient(rgba(0, 0, 0, .1) 1px, transparent 1px)',
    backgroundSize: '20px 20px, 20px 20px',
    height: '400px',
    width: '400px',
    border: '1px solid blue',
    margin: '1em'
}

export default () => ({
  template: `
    <div :style='${JSON.stringify(style)}'>
      <vue-draggable-resizable :parent="true" :grid=[20,20]>
        <p>You cannot move me or resize me outside my parent.</p>
      </vue-draggable-resizable>
    </div>
  `
})