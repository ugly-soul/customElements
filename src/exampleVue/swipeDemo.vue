<template>
  <nav>SwipeCell</nav>
  <hr>
  <xing-swipe ref="xingSwipe">
    <div slot="content" v-for="(item, index) in arr" :key="index">
      <div>{{ item.name }}</div>
      <div v-html="item.other"></div>
      <img :src="item.path" />
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
    xingSwipe.value.addEventListener('swipeIndex', (e) => {
      const { oldIndex, newIndex } = e.detail
      console.log(
        `上一个指示点下标：${oldIndex}, 当前指示点下标：${newIndex}`
      );
    })
  })
})
</script>