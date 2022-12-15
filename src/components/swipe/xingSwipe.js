/**
 * @Description 
 * @Author SunshineSong
 * @Date 2022-12-09 19:26:19
*/

import customEvent from "../utils/customEvent"
class xingSwipe extends HTMLElement {
  constructor() {
    super()
    this._styleAttr = ''
    this._defaultStyle = `
      .swipe-content > * {
        scroll-snap-align: center;
        flex: 0 0 100%;
        width: 100%;
        height: 200px;
      }
      .swipe-content {
        scroll-snap-type: x mandatory;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        overflow-x: scroll;
        overflow: auto;
        scroll-behavior: smooth;
        background-color: #faebd7;
      }
      .swipe-content::-webkit-scrollbar {
        display: none;
      }
      .dot-box {
        position: absolute;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin-top: 6px;
      }
      .dot {
        border-radius: 50%;
        width: 8px;
        height: 8px;
        border: 1px solid grey;
        margin: 0 2px;
        background-color: transparent;
        transition: all 0.2s ease;
        transform: scale(1);
      }
      .active {
        background-color: grey;
        transform: scale(1.5);
      }
    `

    this._scrollBox = null
    this._swipeContent = null
    this._dotBox = null

    this._timerScrollEndDetect = null
    this._currentIndex = 0
    this._oldIndex = 0
    this._showDots = false
  }

  _render() {
    const slotDom = (this.children || []) || []
    if (slotDom.length > 0) {
      const tempDom = [...slotDom].filter(item => item.getAttribute('slot') === 'content')
      if (!tempDom || tempDom.length === 0) {
        console.error(
          '%c slot命中失败！请检查slot是否为content！',
          'font-size: 16px;'
        );
      } else {
        tempDom.map(item => {
          item.setAttribute('style', this._styleAttr)
          this._swipeContent.appendChild(
            item.cloneNode(true)
          )
          this.removeChild(item)
        })
        this._appendPoint(tempDom.length)
      }
    } else {
      console.error(
        '%c xingSwipe slot 不存在！',
        'font-size: 16px;'
      );
    }
  }

  _appendPoint(length) {
    if (!this._showDots) return;
    this._dotBox = document.createElement('div')
    this._dotBox.classList.add('dot-box')
    for (let i = 0; i < length; i ++) {
      let _dot = document.createElement('div')
      _dot.classList.add('dot')
      this._dotBox.appendChild(_dot)
    }
    this._scrollBox.appendChild(this._dotBox)
    this._updatePointClass()
  }

  _updatePointClass() {
    if (!this._showDots) return;
    this._dotBox.children[this._oldIndex].classList.remove('active')
    this._dotBox.children[this._currentIndex].classList.add('active')
  }

  connectedCallback() {
    const shadow = this.attachShadow({
      mode: 'closed'
    })

    this._showDots = this.hasAttribute('show-points')

    this._styleAttr = this.getAttribute('style') || ''

    this._scrollBox = document.createElement('div')
    this._swipeContent = document.createElement('div')
    this._swipeContent.classList.add('swipe-content')

    this._scrollBox.appendChild(this._swipeContent)

    shadow.innerHTML = `
      <style>
        ${this._defaultStyle}
      </style>
    `
    shadow.appendChild(this._scrollBox)

    this._render()

    // 监听当前滚动到的选项
    this._swipeContent.onscroll = (e) => {
      // 滚动事件开始
      clearTimeout(this._timerScrollEndDetect);
      this._timerScrollEndDetect = null;
      this._timerScrollEndDetect = setTimeout(() => {
        // 20毫秒内滚动事件没触发，认为停止滚动了
        // 对列表元素进行位置检测
        [].slice.call(this._swipeContent.children).forEach((eleList, index) => {
          if (
            Math.abs(
              eleList.getBoundingClientRect().left -
                this._swipeContent.getBoundingClientRect().left
            ) < 10
          ) {
            this._oldIndex = this._currentIndex
            this._currentIndex = index;
            if (this._oldIndex !== this._currentIndex) {
              customEvent(
                this,
                'swipeIndex',
                {
                  oldIndex: this._oldIndex,
                  newIndex: this._currentIndex
                }
              )
              this._updatePointClass()
            }
          }
        });
      }, 20);
    }
  }
}

if (!customElements.get('xing-swipe')) {
  customElements.define('xing-swipe', xingSwipe);
}

export default xingSwipe;