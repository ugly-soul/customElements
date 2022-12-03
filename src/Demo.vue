<template>
  <div>
    <button @click="onClick1">显示Toast1</button>
    <button @click="onClick2">显示Toast2</button>
  </div>
</template>

<script setup>
const onClick1 = () => {
  _that.showToast('我显示了！', 3000)
}
const onClick2 = () => {
  _that.showToast('我显333！', 3000)
}
</script>