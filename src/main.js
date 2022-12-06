import { createApp } from 'vue'
import App from './Demo.vue'

// 引入全局组件--local
// import globalComponent from './components/globalComponent'
// globalComponent()

// 引入全局组件--node_modules
// 如果需要局部引入 匿名组件 ，则需要先引入包入口文件
import globalComponent from 'web-component-mobile'
globalComponent()

createApp(App).mount('#app')
