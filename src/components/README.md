# customElements
这个是基于[ Web Components ](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components)、[ shadow DOM ](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_shadow_DOM)构建的一个高用户体验的UI组件！主要用于移动端！！！你可以用于html、[ Vue ](https://cn.vuejs.org/)以及其他流行的框架中！

## tips:
如果需要兼容的IE浏览器，可能有些吃力！
毫不意外，它天然的支持html！因为鄙人只会[ vue ](https://cn.vuejs.org/)框架。就以[ vue ](https://cn.vuejs.org/)来演示。如果你还会[ react ](https://reactjs.org/)或者[ angular ](https://angular.cn/)等其他框架，你不妨大胆的在你的项目中来使用它！！！

$\color{#F56C6C}{题外话：另外推荐我自己基于vue封装的组件：}$
[xing-ui-mobile](https://www.npmjs.com/package/xing-ui-mobile)
[xing-ui-mobile-v3](https://www.npmjs.com/package/xing-ui-mobile-v3)
可以点击上方链接🔗即可跳转！


## 安装：
  ```
  npm i web-component-mobile
  ```

## 使用：
  ```javascript
  在入口文件中引用：
    import globalComponent from 'web-component-mobile'
    globalComponent()
    
    对于全局js调用的组件，会挂载到 window._that 下。
    非全局js调用的组件，则根据自己的需求按需引入！
  ```
### toast组件
  ```javascript
    语句：
      _that.showToast(content, ?delay);  //content：显示文本。delay：显示时长，默认2000ms


    使用场景1：
      fetch('http://xxxxxx.com/getxxxx').then(res => {
        _that.showToast(res.msg || 'success！')
      })
    
    使用场景2:
      <template>
        <img src="xxxxx.png" @click="inertClick"/>
      </template>

      <script setup>
        const inertClick = () => {
          _that.showToast('该图片不允许点击')
        }
      </script>
  ```
### loading 组件
  ``` javascript
    语句：
      _that.showLoading() // 显示加载动画
      _that.hideLoading() // 隐藏加载动画
      
    使用方式：
      <button demoBtn @click="Loading(true)">展示默认加载动画</button>
      <button demoBtn @click="customLoading">展示自定义加载动画</button>
      <button demoBtn @click="Loading(false)">隐藏加载动画/加载完成</button>   
      
      <script setup>
        const Loading = (bool) => {
          if (bool) {
            _that.showLoading() // 显示加载动画
          } else {
            _that.hideLoading() // 隐藏加载动画
          }
        }

        // 因为该组件不是通过匿名标签在模版中使用的。所以看上去可能定义自定义加载动画有点麻烦
        // 在全局 _that 中，暴露的有一个 loadingConfig 属性，将自定义的动画传入到该属性中
        // 该属性格式第一个标签必须是style，第二个必须是元素！

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
  ```

