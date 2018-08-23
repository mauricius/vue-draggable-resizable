import Vue from 'vue'

const style = {
    position: 'relative',
    backgroundColor: '#808080',
    background: 'linear-gradient(-90deg, rgba(0, 0, 0, .1) 1px, transparent 1px), linear-gradient(rgba(0, 0, 0, .1) 1px, transparent 1px)',
    backgroundSize: '20px 20px, 20px 20px',
    backgroundPosition: '17px 17px',
    height: '500px',
    width: '500px',
    border: '1px solid blue',
    margin: '1em',
    boxSizing: 'content-box'
}

export default () => ({
  template: `
    <div :style='${JSON.stringify(style)}'>
      <vue-draggable-resizable :parent="true" :grid=[20,20] :x="17" :y="17" :h="400" :w="400">
        <p>You cannot move me or resize me outside my parent.</p>
      </vue-draggable-resizable>
    </div>
  `
})