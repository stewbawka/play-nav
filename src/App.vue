<script lang="ts">
import { defineComponent } from "vue";
import { createStore } from '@/store';
import Nav from './components/Nav.vue';

export default defineComponent({
  name: "App",
  components: {
    Nav,
  },
  setup() {
    createStore();
  },
});
</script>
<template>
  <Nav />
</template>
