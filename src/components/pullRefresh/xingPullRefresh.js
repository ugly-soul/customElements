/**
 * @Description pullRefresh component
 * @Author SunshineSong
 * @Date 2022-12-04 17:26:22
*/

import customEvent from '../utils/customEvent';
import xingLoading from '../loading/loading';

class xingPullRefresh extends HTMLElement {
  constructor() {
    super()
    this._mySwipeStyle = `
      .list::-webkit-scrollbar {
        display: none;
      }
      .list {
        display: grid;
        overflow-x: hidden;
        scroll-behavior: smooth;
      }
      .point-event {
        pointer-events: none;
      }
      .content {
        background-color: #fff;
        position: relative;
        transition: all 0.35s ease;
      }
      .xing-refresh-box {
        border: 0;
        padding: 0;
        width: 100%;
        height: 48px;
        position: absolute;
        right: 0;
        outline: 0;
      }
      .scroll-snap {
        scroll-snap-type: y mandatory;
      }
      .scroll-snap .space {
        scroll-snap-align: end;
      }
      .scroll-snap .content {
        scroll-snap-align: start;
      }
      .space {
        height: 48px;
      }
      /* 视差滚动 */
      .perspective {
        perspective: 1px;
        transform-style: preserve-3d;
        perspective-origin: 100% 50%;
      }
    `
    this._swipeBox = null
    this._space = null
    this._refreshBox = null
    this._iconSlot = null
    this._contentBox = null
    this._contentSlot = null

    this._slotHeight = 0
    this._status = false
    this._spaceHeight = 0
    this._scrollTopY = 0

    this._refreshBoxIsHidden = false
  }

  closeRefresh() {
    this._status = false
    this._swipeBox.scrollTop = this._spaceHeight
    this._swipeBox.style.visibility = 'visible'
  }

  _mounted() {
    this._slotHeight = this._contentBox.getBoundingClientRect().height
    this._spaceHeight = this._space.getBoundingClientRect().height
    this._swipeBox.style.height = `${this._slotHeight}px`
    this.closeRefresh()
  }

  connectedCallback() {
    let shadow = this.attachShadow({
      mode: 'open'
    });
    this._swipeBox = document.createElement('div');
    this._swipeBox.classList.add('list', 'scroll-snap')
    this._space = document.createElement('div');
    this._space.classList.add('space');
    this._refreshBox = document.createElement('div');
    this._iconSlot = document.createElement('slot')
    this._iconSlot.setAttribute('name', 'icon')
    this._iconSlot.appendChild(new xingLoading())
    this._refreshBox.classList.add('xing-refresh-box', 'perspective')
    this._refreshBox.appendChild(this._iconSlot)
    this._contentBox = document.createElement('div');
    this._contentBox.classList.add('content');
    this._contentSlot = document.createElement('slot');
    this._contentSlot.setAttribute('name', 'content');
    this._contentSlot.innerHTML = `
      <div>我是下拉刷新列表, 下拉试试哦！</div>
    `
    this._contentBox.appendChild(this._contentSlot)
    this._swipeBox.appendChild(this._space);
    this._swipeBox.appendChild(this._refreshBox);
    this._swipeBox.appendChild(this._contentBox);

    // let style = this.getAttribute('style')
    // let _class = this.getAttribute('class')
    shadow.innerHTML = `
      <style>
        ${this._mySwipeStyle}
      </style>
    `;
    shadow.appendChild(this._swipeBox)
    this._swipeBox.style.visibility = 'hidden'

    // domEvent
    this._mounted()
    this._contentBox.ontouchmove = () => {
      if (this._space) {
        this._scrollTopY = this._space.getBoundingClientRect().top
      }
    }

    this._contentBox.ontouchstart = () => {
      const _content = this._refreshBox.getBoundingClientRect()
      this._refreshBoxIsHidden = (_content.y <= 0 || _content.y < -_content.height)
      if (this._refreshBoxIsHidden) {
        this._swipeBox.classList.add('point-event')
      } else {
        this._swipeBox.classList.remove('point-event')
      }
    }
    
    this._contentBox.ontouchend = () => {
      if (this._status) return;
      this._swipeBox.classList.remove('point-event')
      const transitionDuration = window.getComputedStyle(this._contentBox).transitionDuration
      const absTime = parseFloat(transitionDuration)
      const time = absTime ? absTime * 1000 : 0
      setTimeout(() => {
        this._status = (this._scrollTopY >= 0);
        customEvent(this, 'refreshEvent', {
          status: this._status,
          closeRefresh: this.closeRefresh.bind(this)
        })
      }, time)
    }
  }
}

if (!customElements.get('xing-pull-refresh')) {
  customElements.define('xing-pull-refresh', xingPullRefresh);
}

export default xingPullRefresh;