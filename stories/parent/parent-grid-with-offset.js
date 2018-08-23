import Vue from 'vue'

const style = {
    position: 'relative',
    backgroundColor: '#808080',
    background: 'linear-gradient(-90deg, rgba(0, 0, 0, .1) 1px, transparent 1px), linear-gradient(rgba(0, 0, 0, .1) 1px, transparent 1px)',
    backgroundSize: '20px 20px, 20px 20px',
    backgroundPosition: '10px 10px',
    height: '500px',
    width: '500px',
    border: '1px solid blue',
    margin: '1em',
    boxSizing: 'content-box'
}

export default () => ({
  template: `
    <div :style='${JSON.stringify(style)}'>
      <vue-draggable-resizable :parent="true" :grid=[20,20] :x="10" :y="10" :h="400" :w="400">
        <p>You cannot move me or resize me outside my parent. And my edges cannot touch the parent element.</p>
      </vue-draggable-resizable>
    </div>
  `
})