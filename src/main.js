import Vue from 'vue'
import wrap from '@vue/web-component-wrapper'

const Chat = wrap(Vue, () => import(`./components/Chat`))

window.customElements.define('chat-vue-web-component-wrapper', Chat)
