import VueDraggableResizable from '../src'

Vue.component('vue-draggable-resizable', VueDraggableResizable);

new Vue({
  el: '#app1'
});

new Vue({
  el: '#app2'
});

new Vue({
  el: '#app3'
});

new Vue({
  el: '#app4'
});

new Vue({
  el: '#app5',
  data: {
    show_label: false,
    width: 0,
    height: 0,
    x: 0,
    y: 0
	},
	methods: {
    onActivate: function() {
      this.show_label = true
    },
    onDeactivate: function() {
      this.show_label = false
    },
    onResize: function (x, y, width, height) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
    },
    onDrag: function (x, y) {
      this.x = x
      this.y = y
    }
  }
});