<script setup>
import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'
import '@/components/vue-draggable-resizable.css'
</script>

<template>
  <Story auto-props-disabled title="Style Handles with Slots">
    <vue-draggable-resizable class-name-handle="my-handle-class">
      <p>The first child will populate the default slot.</p>

      <template v-slot:tl>😀</template>
      <template v-slot:tm>😂</template>
      <template v-slot:tr>😆</template>
      <template v-slot:mr>😉</template>
      <template v-slot:br>😎</template>
      <template v-slot:bm>😍</template>
      <template v-slot:bl>😣</template>
      <template v-slot:ml>😕</template>
    </vue-draggable-resizable>
  </Story>
</template>

<docs lang="md">
  ## Component with custom markup for handles

  Component with custom markup for handles, provided by VueJS named slots (e.g. slot="tl").
</docs>
