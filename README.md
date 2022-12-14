# customElements
这个是基于[ Web Components ](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components)、[ shadow DOM ](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_shadow_DOM)构建的一个高用户体验的UI组件！主要用于移动端！！！你可以用于html、[ Vue ](https://cn.vuejs.org/)以及其他流行的框架中！

## tips:
如果需要兼容的IE浏览器，可能有些吃力！
毫不意外，它天然的支持html！因为鄙人只会[ vue ](https://cn.vuejs.org/)框架。就以[ vue ](https://cn.vuejs.org/)来演示。如果你还会[ react ](https://reactjs.org/)或者[ angular ](https://angular.cn/)等其他框架，你不妨大胆的在你的项目中来使用它！！！

$\color{#F56C6C}{题外话：另外推荐我自己基于vue封装的组件：}$ <br>
[xing-ui-mobile](https://www.npmjs.com/package/xing-ui-mobile) <br>
[xing-ui-mobile-v3](https://www.npmjs.com/package/xing-ui-mobile-v3) <br> 
可以点击上方链接🔗即可跳转！


## 安装：
  ```
  npm i web-component-mobile
  ```

## 使用：
  [对于消除使用vue未注册组件的警告教程🔗](https://cn.vuejs.org/guide/extras/web-components.html#using-custom-elements-in-vue)
  ```javascript
  在入口文件中引用：
    import globalComponent from 'web-component-mobile'
    globalComponent()
    
    对于全局js调用的组件，会挂载到 window._that 下。
    非全局js调用的组件，则根据自己的需求按需引入！

    tips:
      如果按需引入组件，则需要在项目入口文件中引入总包，否则无法使用！
  ```
### toast组件
  ```javascript
    语句：
      _that.showToast(content, ?delay);  //content：显示文本。delay：显示时长，默认2000ms


    使用场景1：
      fetch('http://xxxxxx.com/getxxxx')
        .then(res => res.json())
        .then(res => {
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
      <button @click="Loading(true)">展示默认加载动画</button>
      <button @click="customLoading">展示自定义加载动画</button>
      <button @click="Loading(false)">隐藏加载动画/加载完成</button>   
      
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
                position: fixed;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                position: fixed;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
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

## pullRefresh 下拉刷新组件
  ```javascript
    使用方式：
    在需要的页面引入：
    import 'web-component-mobile/pullRefresh/xingPullRefresh'

    完整演示代码：
    <xing-pull-refresh ref="refreshDom">
      <div slot="content">
        <div>我是内容下拉展示刷新～</div>
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

    <script setup>
      import 'web-component-mobile/pullRefresh/xingPullRefresh'
      import { nextTick, onMounted, ref } from 'vue';

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

    提示：
      // 因为我内部使用的customEvent自定义的事件，且绑定到了 xing-pull-refresh 这个 元素上。
      // 所以需要监听该元素上的 ‘refreshEvent’ 这个事件

    该事件参数：
      status: 状态，当前是打开还是关闭
      closeRefresh: 关闭动画方法。

    slot插槽：
      icon：动画区域，可传入自定义加载动画
      content：内容区域
  ```

## swipeCell 滑动单元格组件
  ```javascript
    使用方式：
    在需要的页面引入：
    import 'web-component-mobile/swipe/xingSwipeCell'

    完整演示代码：
    <template>
      <xing-swipe-cell>
        <div slot="content">插槽演示</div>
        <div slot="right" style="background-color: antiquewhite; height: 100%;">我是自定义内容</div>
      </xing-swipe-cell>
    </template>

    <script setup>
      import 'web-component-mobile/swipe/xingSwipeCell'
    </script>

    slot插槽：
      right：右侧自定义内容区域
      content：单元格主要内容区域
  ```

## xingSwipe 轮播组件
```javascript
  目前该组件暂不支持自动轮播功能！！！

  使用方式：
    在需要的页面引入：
  import 'web-component-mobile/swipe/xingSwipe'

  完整演示代码：
    <!-- show-points：显示指示点 -->
    <xing-swipe show-points>
      <div slot="content" v-for="(item, index) in arr" :key="index">
        <div>{{ item.name }}</div>
        <div v-html="item.other"></div>
        <img :src="item.path" />
      </div>
    </xing-swipe>

    <script setup>
      import { ref } from 'vue';
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
    </script>

    提示：
      slot：
      // 具名插槽需要是content，即：slot=“content” 。如果不是content，则无法映射对应的元素

      props：
      // show-points：如果指定该属性，则显示内置指示点。
      如果你感觉内置的指示点样式不美观，该组件也抛出了当前滑动到的选项下标，你可以根据自己需求来定制指示点。示例：
      <xing-swipe ref="xingSwipe">
        *****
      </xing-swipe>

      onMounted(() => {
        nextTick(() => {
          // 通过监听该组件swipeIndex事件得到detail中返回的index
          xingSwipe.value.addEventListener('swipeIndex', (e) => {
            const { oldIndex, newIndex } = e.detail
            console.log(
              `上一个指示点下标：${oldIndex}, 当前指示点下标：${newIndex}`
            );
          })
        })
      })

```

## xingPicker 选择器组件
```javascript
  使用方式：
    在需要的页面引入：
  import 'web-component-mobile/picker/xingPicker'

  完整演示代码：

  <template>
    <button @click="okEvent">获取当前选择值</button>
    <!-- tip:  value="2-3-1" 可以指定选中默认值。格式：value="index1,index2,index3"-->
    <!-- 你可以大胆的使用任何符号进行分割，如“2-3+1” “2*3￥1”-->
    <!-- 他显示的则是你对应展示列的下标对应的值！ -->
    <xing-picker ref="xingPicker" value="2-3-1"></xing-picker>
  </template>

  <script setup>
    import { nextTick, onMounted, ref } from 'vue';
    import 'web-component-mobile/picker/xingPicker'

    const xingPicker = ref()
    onMounted(() => {
      nextTick(() => {
        const picker = xingPicker.value
        // 通过该组件下的 _dataList 方法传入数据
        picker._dataList(
          {
            //需要显示几列, 最大支持三列
            columns: 3,
            axis: {
              one: { // 映射第一个数据
                data: 'yearData', // 数据源
                prop: 'date' // 显示对应key数据
              },
              two: { // 映射第二个数据
                data: 'monthData',
                prop: 'date'
              },
              three: { // 映射第三个数据
                data: 'dayData',
                prop: 'date'
              }
            },
            // 数据，需要是数组格式，不支持多维数组
            yearData: [// 第一列
              {
                date: '2022年'
              },
              {
                date: '2023年'
              },
              {
                date: '2024年'
              }
            ],
            monthData: [ // 第二列
              {
                date: '01月'
              },
              {
                date: '02月'
              },
              {
                date: '03月'
              },
              {
                date: '04月'
              },
              {
                date: '05月'
              },
              {
                date: '06月'
              },
              {
                date: '07月'
              }
            ],
            dayData: [ // 第三列
              {
                date: '01日'
              },
              {
                date: '02日'
              },
              {
                date: '03日'
              }
            ],
          }
        )
      })
    })

    // 为了保证性能，需要自己调用改组件下的 _getPickerValue 方法获取选中的值
    const okEvent = () => {
      const res = xingPicker.value._getPickerValue()
      console.log(res);
    }
  </script>
```
