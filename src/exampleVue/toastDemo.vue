<template>
  <button demoBtn @click="onClick1">显示Toast1</button>
  <button demoBtn @click="onClick2">显示Toast2</button>
</template>

<script setup>
const onClick1 = () => {
  _that.showToast('我显示了！', 3000)
}
const onClick2 = () => {
  _that.showToast('我显333！', 3000)
}
</script>