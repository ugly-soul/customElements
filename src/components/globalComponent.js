/**
 * @Description 全局window调用组件
 * @Author SunshineSong
 * @Date 2022-12-03 13:57:25
*/

import toast from './toast/toast'
import loading from './loading/loading'

export default function() {
  const winObj = Object.create(null)
  Object.assign(
    winObj,
    {
      showToast: new toast().show.bind(new toast()),
      showLoading: new loading().show.bind(new loading()),
      hideLoading: new loading().hide.bind(new loading()),
      loadingConfig: null
    }
  )
  
  Object.defineProperty(window.__proto__, '_that', {
    get: () => winObj,
    set: () => {
      throw new Error('禁止重写！')
    }
  })
}
