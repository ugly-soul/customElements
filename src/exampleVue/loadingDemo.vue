<template>
  <button demoBtn @click="Loading(true)">展示默认加载动画</button>
  <button demoBtn @click="customLoading">展示自定义加载动画</button>
  <button demoBtn @click="Loading(false)">隐藏加载动画/加载完成</button>
</template>

<script setup>
const Loading = (bool) => {
  if (bool) {
    _that.showLoading()
  } else {
    _that.hideLoading()
  }
}
const customLoading = () => {
  _that.loadingConfig = `
    <style>
      .animation-demo {
        border-radius: 4px;
        background-color: rgba(0, 0, 0, .7);
        height: 44px;
        width: 44px;
        display: grid;
        place-items: center;
      }
      .animation-demo > span {
        height: 19px;
        width: 19px;
        border: 1px solid #fff;
        border-top-color: transparent;
        border-radius: 19px;
        animation: rotate infinite forwards .5s linear;
      }
      
      @keyframes rotate {
        from {
          transform: rotate(0);
        }
        to {
          transform: rotate(360deg);
        }
      }
    </style>
    <div class="animation-demo">
      <span></span>
    </div>
  `
  Loading(true)
}
</script>