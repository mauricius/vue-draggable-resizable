import Vue from 'vue'

export default () => ({
  template: `
    <div>
      <vue-draggable-resizable :enable-native-drag="false" :x="0" :y="0" :w="200" :h="200">
        <p>Native drag disabled. Try to drag the component from the ball.</p>
        <img src="https://js.cx/clipart/ball.svg" />
      </vue-draggable-resizable>
      <vue-draggable-resizable :enable-native-drag="true" :x="0" :y="200" :w="200" :h="200">
        <p>Native drag enabled. Try to drag the component from the ball.</p>
        <img src="https://js.cx/clipart/ball.svg" />
      </vue-draggable-resizable>
    </div>
  `
})