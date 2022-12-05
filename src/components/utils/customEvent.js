/**
 * @Description 自定义事件
 * @Author SunshineSong
 * @Date 2022-12-04 18:46:25
 */

export default function (el = document.body, eventName, target = {}) {
  let myEvent = new CustomEvent(eventName, {
    detail: target
  });
  el.dispatchEvent(myEvent);
}