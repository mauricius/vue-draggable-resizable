import Vue from 'vue'

export default () => ({
  template: `
    <vue-draggable-resizable class-name-handle="my-handle-class">
      <p>The first child will populate the default slot.</p>

      <div slot="tl">😀</div>
      <div slot="tm">😂</div>
      <div slot="tr">😆</div>
      <div slot="mr">😉</div>
      <div slot="br">😎</div>
      <div slot="bm">😍</div>
      <div slot="bl">😣</div>
      <div slot="ml">😕</div>
    </vue-draggable-resizable>
  `
})