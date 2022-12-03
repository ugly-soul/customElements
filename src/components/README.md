# customElements
这个是基于Web Components、shadow DOM构建的一个高用户体验的UI组件！主要用于移动端！！！你可以用于html、Vue以及其他流行的框架中！

## tips:
如果需要兼容的IE浏览器，可能有些吃力！
因为鄙人只会vue框架。就以vue来演示。按理说它也是支持react的！

## 安装：
  ```
  npm i web-component-mobile

  ```

## 使用：
  ```
  在入口文件中引用：
    import globalComponent from 'web-component-mobile'
    globalComponent()
    
    对于全局js调用的组件，会挂载到window._that下。
    非全局js调用的组件，则根据自己的需求按需引入！
  ```
  ### toast组件
    ```
      语句：
        _that.showToast(content, ?delay);  // content：显示文本。delay：显示时长，默认2000ms

      使用场景1：
        fetch('http://xxxxxx.com/getxxxx').then(res => {
          _that.showToast(res.msg || )
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

