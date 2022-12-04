import { createApp } from 'vue'
import App from './Demo.vue'

// 引入全局组件--local
import globalComponent from './components/globalComponent'
globalComponent()

// 引入全局组件--node_modules
// import globalComponent from 'web-component-mobile'
// globalComponent()

createApp(App).mount('#app')
