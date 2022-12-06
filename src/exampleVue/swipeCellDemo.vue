<template>
  <nav>SwipeCell</nav>
  <xing-swipe-cell></xing-swipe-cell>
  <xing-swipe-cell>
    <div slot="content">插槽演示</div>
    <div slot="right" style="background-color: antiquewhite; height: 100%;">我是自定义内容</div>
  </xing-swipe-cell>
</template>

<script setup>
import 'web-component-mobile/swipe/xingSwipeCell';
</script>