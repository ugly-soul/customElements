/**
 * @Description 获取对应class样式
 * @Author SunshineSong
 * @Date 2022-12-03 14:35:57
*/

export default function(targetClassName = '', callback) {
  let cssruleList = [...document.styleSheets];
  if (!targetClassName || cssruleList.length === 0) return '';
  const classNameList = targetClassName.split(' ').map(item => `.${item}`)
  cssruleList = cssruleList.flatMap(item => {
    return item.cssRules
  })
    .map( item => item);
  let cssText = '';
  cssruleList.map(item => {
    [...item].filter(it => {
      if (classNameList.includes(it.selectorText)) {
        cssText += it.cssText
        callback(it.selectorText.substring(1))
        return true;
      }
      return false;
    })
  })
  return cssText
}