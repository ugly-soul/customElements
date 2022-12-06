<template>
  <div class="custom-element">
    <toast-demo></toast-demo>
    <br>
    <loading-demo></loading-demo>
    <br>
    <pull-refresh-demo></pull-refresh-demo>
    <br>
    <swipe-cell-demo></swipe-cell-demo>
  </div>
</template>

<script setup>
import { createApp } from 'vue';
// toast
import toastDemo from './exampleVue/toastDemo.vue'
// loading
import loadingDemo from './exampleVue/loadingDemo.vue'
// pullrefresh
import pullRefreshDemo from './exampleVue/pullRefreshDemo.vue'
// swipeCell
import swipeCellDemo from './exampleVue/swipeCellDemo.vue'

createApp().component(
  toastDemo,
  loadingDemo,
  pullRefreshDemo,
  swipeCellDemo
)
</script>

<style>
.custom-element {
  display: grid;
  grid-template-columns: auto;
  row-gap: 5px;
}
nav {
  position: sticky;
  top: 0;
  background-color: #fff;
}
</style>