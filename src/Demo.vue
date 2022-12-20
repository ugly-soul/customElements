<template>
  <div class="custom-element">
    <toast-demo></toast-demo>
    <br>
    <loading-demo></loading-demo>
    <br>
    <pull-refresh-demo></pull-refresh-demo>
    <br>
    <swipe-cell-demo></swipe-cell-demo>
    <br>
    <br>
    <swipe-demo></swipe-demo>
    <br>
    <picker-demo></picker-demo>
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
// swipe
import swipeDemo from './exampleVue/swipeDemo.vue'
// picker
import pickerDemo from './exampleVue/pickerDemo.vue'

createApp().component(
  toastDemo,
  loadingDemo,
  pullRefreshDemo,
  swipeCellDemo,
  swipeDemo,
  pickerDemo
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
  font-size: 16px;
}
</style>