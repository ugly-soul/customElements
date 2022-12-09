<template>
  <nav>SwipeCell</nav>
  <hr>
  <xing-swipe ref="xingSwipe">
    <div slot="content">
      <div content-name="text"></div>
      <div content-other="html"></div>
      <img content-path="src" />
    </div>
  </xing-swipe>
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue';
import 'web-component-mobile/swipe/xingSwipe'

const arr = ref([
  {
    name: '向左滑一滑试试～',
    path: '../../public/favicon.ico',
    other: '<span style="color: red;">哈哈</span>'
  },
  {
    name: '第二页',
    path: '../../public/favicon.ico',
    other: '<span style="color: blue;">wow~</span>'
  }
])

const xingSwipe = ref()

onMounted(() => {
  nextTick(() => {
    xingSwipe.value._dataList(
      arr.value
    )
  })
})
</script>