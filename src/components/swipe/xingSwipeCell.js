/**
 * @Description 滑动单元格组件
 * @Author SunshineSong
 * @Date 2022-12-06 13:04:18
*/

class xingSwipeCell extends HTMLElement {
  constructor() {
    super()
    this._defaultStyle = `
      .list::-webkit-scrollbar {
        display: none;
      }
      .list {
        display: flex;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
        overflow-y: hidden;
        scroll-behavior: smooth;
      }
      .content {
        padding: 16px;
        line-height: 1.5;
        flex: 0 0 calc(100% - 32px);
        font-size: 14px;
        color: inherit;
        background-color: #fff;
        box-shadow: 0 1px #fff, 0 -1px #fff;
        position: relative;
        transition: all 0.35s ease;
      }
      .space {
        flex: 0 0 4rem;
      }
      /* 自动右边缘定位 */
      .scroll-snap {
        scroll-snap-type: x mandatory;
      }
      .scroll-snap .space {
        scroll-snap-align: end;
      }
      .scroll-snap .content {
        scroll-snap-align: start;
      }
      /* 视差滚动 */
      .perspective {
        perspective: 1px;
        transform-style: preserve-3d;
        perspective-origin: 100% 50%;
      }
      .xing-touch-input {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border: 0;
        background-color: transparent;
        z-index: -10;
        outline: 0;
      }
    `
    this._swipeCellBox = null
    this._rightSlot = null
    this._contentBox = null
    this._input = null
    this._contentSlot = null
    this._space = null
  }

  connectedCallback() {
    let shadow = this.attachShadow({
      mode: 'open'
    })

    this._swipeCellBox = document.createElement('div')
    this._swipeCellBox.classList.add('list', 'scroll-snap', 'perspective')
    this._rightSlot = document.createElement('slot')
    this._rightSlot.setAttribute('name', 'right')
    this._rightSlot.innerHTML = `
      <div
        style="background-color: #eb4646; height: 100%;"
      >rightSlot</div>
    `
    this._contentBox = document.createElement('div')
    this._contentBox.classList.add('content')
    this._input = document.createElement('input')
    this._input.classList.add('xing-touch-input')
    this._input.setAttribute('type', 'button')
    this._contentSlot = document.createElement('slot')
    this._contentSlot.setAttribute('name', 'content')
    this._contentSlot.innerHTML = `
      <div>我是滑动单元格，向左滑一下~</div>
    `
    this._space = document.createElement('div');
    this._space.classList.add('space')

    this._swipeCellBox.appendChild(this._contentBox)
    this._space.appendChild(this._rightSlot)
    this._swipeCellBox.appendChild(this._space)
    this._contentBox.appendChild(this._input)
    this._contentBox.appendChild(this._contentSlot)
    shadow.innerHTML = `
      <style>
        ${this._defaultStyle}
      </style>
    `
    shadow.appendChild(this._swipeCellBox)

    // domEvent
    this._contentBox.ontouchstart = () => {
      this._input.focus()
    }
    this._input.onblur = () => {
      this._swipeCellBox.scrollLeft = 0
    }
  }
}

if (!customElements.get('xing-swipe-cell')) {
  customElements.define('xing-swipe-cell', xingSwipeCell);
}

export default xingSwipeCell;