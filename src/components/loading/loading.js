/**
 * @Description loading component
 * @Author SunshineSong
 * @Date 2022-12-04 14:19:13
 */

import xingToast from "../toast/toast";

class xingLoading extends xingToast {
  constructor() {
    super()
    this._defaultInnerHTML = `
    <style>
      .loading-wave-box {
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      [open="false"] {
        visibility: hidden;
      }
      [open="true"] {
        visibility: visible;
      }
      .loading-wave-box span {
        width: 5px;
        height: 5px;
        margin: 0 1px;
        display: inline-block;
        vertical-align: middle;
        background-color: #4673f0;
        animation: loadingWave 1.5s infinite ease-in-out;
      }
      .loading-wave-box span:nth-child(2) {
        animation-delay: .2s;
      }
    
      .loading-wave-box span:nth-child(3) {
        animation-delay: .4s;
      }
    
      .loading-wave-box span:nth-child(4) {
        animation-delay: .6s;
      }
      
      .loading-wave-box span:nth-child(5) {
        animation-delay: .8s;
      }
      
      @keyframes loadingWave {
        0% {
          transform: scaleY(1);
          background: #4673f0;
        }
      
        25% {
          transform: scaleY(6);
          background: #0081ff;
        }
      
        50% {
          transform: scaleY(1);
          background: #4673f0;
        }
      
        100% {
          transform: scaleY(1);
          background: #4673f0;
        }
      }
    </style>
    <div class="loading-wave-box" xingLoading="xingLoading">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    `;
    this._innerHTML = null
  }
  show() {
    let chid = [
      ...(
        this.shadowRoot ||
        {
          children: []
        }).children
    ].filter(item => {
      return item.getAttribute('xingLoading') === 'xingLoading'
    })
    if (chid.length === 0) {
      document.body.appendChild(this)
    }
    if ('_that' in window && _that.loadingConfig) {
      this._innerHTML = _that.loadingConfig
      if (this.shadowRoot) {
        this.shadowRoot.innerHTML = this._innerHTML
        this.shadowRoot.children[0].innerHTML += `
          [open="false"] {
            visibility: hidden;
          }
          [open="true"] {
            visibility: visible;
          }
        `
        this.shadowRoot.children[1].setAttribute('xingLoading', 'xingLoading')
      }
    } else {
      this.shadowRoot.innerHTML = this._defaultInnerHTML
    }
    this.shadowRoot.children[1].setAttribute('open', 'true')
    this.setAttribute('xingLoading', 'xingLoading')
  }
  hide() {
    const tempEl = [...document.body.children].filter(item => {
      return item.hasAttribute('xingLoading')
    });
    if (!tempEl || tempEl.length === 0) return;
    (
      this.shadowRoot ||
      (tempEl[0].shadowRoot || {})
    )
    .children[1].setAttribute('open', 'false')
    this._innerHTML = null
    _that.loadingConfig = null
  }
  connectedCallback() {
    let shadow = this.attachShadow({
      mode: 'open'
    });
    shadow.innerHTML = this._innerHTML || this._defaultInnerHTML
  }
}

if (!customElements.get('xing-loading')) {
  customElements.define('xing-loading', xingLoading);
}

export default xingLoading;