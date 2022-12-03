/**
 * @Description toast component
 * @Author SunshineSong
 * @Date 2022-12-03 13:54:08
 */

 import setCsstext from '../utils/getCsstextByClass';

 class xingToast extends HTMLElement {
   // static get observedAttributes() {
   //   return ['open'];
   // }
   constructor() {
     super();
     this._content = null
     this._delay = 2000
     this._TIME = null
   }
   // get open() {
   //   return this.hasAttribute('open');
   // }
 
   // set open(bool) {
   //   this.toggleAttribute('open', bool);
   // }
 
   render() {
     if (this._TIME) {
       clearTimeout(this._TIME)
       this._TIME = null
     }
     this._TIME = setTimeout(() => {
       this.hide()
     }, this._delay || 2000)
   }
 
   show(value, time) {
     this._content = value
     this._delay = time || 2000
     // this.open = true;
     let chid = [
       ...(
         this.shadowRoot ||
         {
           children: []
         }).children
     ].filter(item => {
       return item.getAttribute('xingToast') === 'xingToast'
     })
     if (chid.length === 0) {
       document.body.appendChild(this)
     }
     this.shadowRoot.children[1].setAttribute('open', 'true')
     this.shadowRoot.children[1].setAttribute('show-content', value)
     this.render()
   }
 
   hide() {
     // this.open = false;
     this.shadowRoot.children[1].setAttribute('open', 'false')
   }
 
   // attributeChangedCallback(name, oldval, newval) {
   //   if (name == 'open' && this.open) {
   //     this.setAttribute('show-content', this._content)
   //     document.body.appendChild(this)
   //     this.render();
   //   }
   // }
   connectedCallback() {
     let shadow = this.attachShadow({
       mode: 'open'
     });
     let style = this.getAttribute('style')
     let _class = this.getAttribute('class')
     shadow.innerHTML = `
     <style>
       .xing-toast {
         border-radius: 4px;
         min-height: 20px;
         line-height: 50%;
         background-color: rgba(0, 0, 0, 0.7);
         color: #fff;
         display: inline-flex;
         place-items: center;
         padding: 9px 1em;
         position: fixed;
         left: 50%;
         top: 50%;
         transform: translate(-50%, -50%);
         ${(style || '')};
       }
       .xing-toast::after {
         content: attr(show-content);
       }
       [open="false"] {
         visibility: hidden;
       }
       [open="true"] {
         visibility: visible;
       }
     </style>
     <div
       class="xing-toast"
       xingToast="xingToast"
       open="false"
       show-content="${this._content}"
     ></div>`;
     const csstext = setCsstext(_class, (e) => {
       this.shadowRoot.children[1].classList.add(e)
     })
     this.shadowRoot.children[0].innerHTML += csstext
   }
 }
 
 if (!customElements.get('xing-toast')) {
   customElements.define('xing-toast', xingToast);
 }
 
 export default xingToast;