<template>
  <div class="custom-element">
    <toast-demo></toast-demo>
    <br>
    <loading-demo></loading-demo>
  </div>
</template>

<script setup>
import { createApp } from 'vue';
// toast
import toastDemo from './exampleVue/toastDemo.vue'
// loading
import loadingDemo from './exampleVue/loadingDemo.vue'

createApp().component(
  toastDemo,
  loadingDemo
)
</script>

<style>
.custom-element {
  display: grid;
  grid-template-columns: auto;
  row-gap: 5px;
}
[demoBtn] {
  position: sticky;
  top: 0;
}
</style>