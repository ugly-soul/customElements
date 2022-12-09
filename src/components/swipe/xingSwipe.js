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

    this._sourceData = []
  }

  _dataList(data) {
    if (!Array.isArray(data)) {
      console.error('%c xingSwipe dataList 数据格式有误，需要传入数组类型哦~', 'font-size: 16px;');
    } else {
      this._sourceData = data
      this._render()
    }
  }

  _render() {
    const slotDom = (this.children || [null])[0] || null
    if (slotDom) {
      if (slotDom.getAttribute('slot') !== 'content') {
        console.error('%c slot命中失败！请检查slot是否为content！', 'font-size: 16px;');
      } else {
        const children = [...slotDom.children]
        this._sourceData.map(item => {
          const arg = Object.entries(item)
          arg.map(item => {
            const _key = item[0]
            const _value = item[1]
            const _attr = `content-${_key}`
            const filterArr = children.filter(item => {
              return item.hasAttribute(_attr)
            })
            const type = (filterArr[0] || {
              getAttribute: () => ''
            }).getAttribute(_attr)
            if (type === 'text') {
              filterArr[0].innerText = _value
            } else if (type === 'src') {
              filterArr[0].setAttribute(type, _value)
            } else if (type === 'html') {
              filterArr[0].innerHTML = _value
            }
            slotDom.setAttribute('style', this._styleAttr)
          })
          this._swipeContent.appendChild(
            slotDom.cloneNode(true)
          )
        })
      }
    } else {
      console.error('%c xingSwipe slot 不存在！', 'font-size: 16px;');
    }
  }

  connectedCallback() {
    const shadow = this.attachShadow({
      mode: 'open'
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
  }
}

if (!customElements.get('xing-swipe')) {
  customElements.define('xing-swipe', xingSwipe);
}

export default xingSwipe;