<template>
  <xing-pull-refresh ref="refreshDom">
    <div slot="content">
      <div>我是内容～</div>
      <div>我是内容～</div>
      <div>我是内容～</div>
      <div>我是内容～</div>
      <div>我是内容～</div>
      <div>我是内容～</div>
      <div>我是内容～</div>
      <div>我是内容～</div>
      <div>我是内容～</div>
      <div>我是内容～</div>
      <div>我是内容～</div>
      <div>我是内容～</div>
      <div>我是内容～</div>
      <div>我是内容～</div>
    </div>
  </xing-pull-refresh>
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue';
import 'web-component-mobile/pullRefresh/xingPullRefresh'

const refreshDom = ref()
onMounted(() => {
  nextTick(() => {
    refreshDom.value.addEventListener('refreshEvent', (e) => {
      const { detail } = e
      if (detail.status) { //如果是打开状态，模拟请求3s关闭动画
        setTimeout(() => {
          detail.closeRefresh()
        }, 3000)
      }
    })
  })
})
</script>