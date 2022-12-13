/**
 * @Description 
 * @Author SunshineSong
 * @Date 2022-12-09 19:26:19
*/

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
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
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
        &.active {
          background-color: grey;
          transform: scale(1.5);
        }
      }
    `

    this._scrollBox = null
    this._swipeContent = null
  }

  _render() {
    const slotDom = (this.children || []) || []
    if (slotDom) {
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
      }
    } else {
      console.error(
        '%c xingSwipe slot 不存在！',
        'font-size: 16px;'
      );
    }
  }

  connectedCallback() {
    const shadow = this.attachShadow({
      mode: 'closed'
    })

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
  }
}

if (!customElements.get('xing-swipe')) {
  customElements.define('xing-swipe', xingSwipe);
}

export default xingSwipe;