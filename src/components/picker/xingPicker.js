/**
 * @Description 
 * @Author SunshineSong
 * @Date 2022-12-20 09:26:15
*/

class xingPicker extends HTMLElement {
  static get observedAttributes () {
    return ['value'];
  }
  constructor() {
    super()

    this._defaultStyle = `
      .picker-box {
        position: relative;
        background-color: #fff;
        user-select: none;
        display: flex;
        cursor: grab;
      }
      .picker-columns {
        position: relative;
        max-height: 264px;
        flex: 1;
        scroll-snap-type: y mandatory;
        scroll-behavior: smooth;
        overflow-y: scroll;
      }
      .picker-columns::-webkit-scrollbar {
        display: none;
      }
      ul, ol {
        margin: var(--mark-size, 0) 0;
        padding: 0;
        list-style: none;
      }
      li {
        scroll-snap-align: center;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .picker-mark {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(
          180deg, rgba(255, 255, 255, .9),
          rgba(255, 255, 255, .4)),
          linear-gradient(
            0deg, rgba(255, 255, 255, .9),
            rgba(255, 255, 255, .4)
            );;
        background-repeat: no-repeat;
        background-position: top,bottom;
        transform: translateZ(0);
        pointer-events: none;
        background-size: 100% var(--mark-size, 0);
      }
      .hairline {
        position: absolute;
        top: 50%;
        right: 16px;
        left: 16px;
        z-index: 2;
        transform: translateY(-50%);
        pointer-events: none;
        height: 44px;
      }
      .hairline::after {
        content: " ";
        position: absolute;
        bottom: 0;
        height: 1px;
        width: 100%;
        background-color: #ebedf0;
        transform: scaleY(.5);
      }
      .hairline::before {
        content: " ";
        position: absolute;
        top: 0;
        height: 1px;
        width: 100%;
        background-color: #ebedf0;
        transform: scaleY(.5);
      }
    `
    this._pickerBox = null
    this._columns = 1
    this._axisArr = []
    this._DATALIST = null
  }

  get _value () {
    return this.getAttribute('value');
  }

  set _value (val) {
    this.setAttribute('value', val);
  }

  _render() {
    if (!this._DATALIST) return;
    const axisArr = this._axisArr
    for (let i = 0; i < this._columns; i ++) {
      const _axisData = this._DATALIST.axis[axisArr[i]]
      const _data = _axisData.data
      const _prop = _axisData.prop
      const _pickerCol = document.createElement('div')
      _pickerCol.classList.add('picker-columns')
      _pickerCol.setAttribute('wrapper', 'wrapper')
      const _ul = document.createElement('ul')
      for (let j = 0; j < this._DATALIST[_data].length; j ++) {
        const _li = document.createElement('li')
        _li.innerText = this._DATALIST[_data][j][_prop]
        _ul.appendChild(_li)
      }
      _pickerCol.appendChild(_ul)
      this._pickerBox.appendChild(_pickerCol)
    }
    const _mark = document.createElement('div')
    const _hairline = document.createElement('div')
    _mark.classList.add('picker-mark')
    _hairline.classList.add('hairline')
    this._pickerBox.appendChild(_mark)
    this._pickerBox.appendChild(_hairline)
    const _height = this.getBoundingClientRect().height
    this.style.setProperty('--mark-size', `${(_height - _hairline.offsetHeight) / 2}px`)
    this._setPickerValue(this.getAttribute('value'))
  }

  _dataList(arg) {
    const { columns, axis } = arg
    const arr = Object.keys(axis)
    this._columns = (columns || this._columns) > arr.length ? arr.length : (columns || this._columns)
    this._axisArr = arr || this._axisArr
    this._DATALIST = arg || this._DATALIST
    this._render()
  }

  _getPickerValue() {
    const child = [...this._pickerBox.children].filter(item => item.hasAttribute('wrapper'))
    const lastChild = this._pickerBox.lastChild
    const tempArr = this._axisArr
    const scrollTopArr = child.map((item, i) => {
      const index = item.scrollTop / lastChild.offsetHeight
      const _axisData = this._DATALIST.axis[tempArr[i]]
      const _data = _axisData.data
      const _prop = _axisData.prop
      return {
        index: index,
        currentValue: this._DATALIST[_data][index][_prop],
        sourceData: this._DATALIST[_data]
      }
    })
    return scrollTopArr
  }

  _setPickerValue(attr) {
    if (this.isConnected) {
      const rule = /\D\W/g
      attr = attr.replace(rule, '-')
      const splitArr = attr.split('-')
      const child = [...this._pickerBox.children].filter(item => item.hasAttribute('wrapper'))
      const lastChild = this._pickerBox.lastChild
      child.map((item, index) => {
        item.scrollTop = splitArr[index] * lastChild.offsetHeight
      })
    }
  }

  connectedCallback() {
    const shadow = this.attachShadow({
      mode: 'closed'
    });
    shadow.innerHTML = `
      <style>
        ${this._defaultStyle}
      </style>
    `
    this._pickerBox = document.createElement('div')
    this._pickerBox.classList.add('picker-box')

    shadow.appendChild(this._pickerBox)
  }

  attributeChangedCallback (name, oldval, newval) {
    if (name == 'value' && this._value) {
      this._setPickerValue(newval);
    }
  }

}

if (!customElements.get('xing-picker')) {
  customElements.define('xing-picker', xingPicker);
}

export default xingPicker;