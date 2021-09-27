import { configureCompat, createApp } from 'vue'
import { sync } from 'vuex-router-sync'

import Autocomplete from 'v-autocomplete'
import Chart from 'chart.js'
import Chartkick from 'vue-chartkick'
import Cookie from 'vue-cookie'
import DragDrop from 'vue-drag-drop'
import Lazyload from 'vue-lazyload'
import Meta from 'vue-meta'
import TextareaAutosize from 'vue-textarea-autosize'
import VTooltip from 'v-tooltip'
import vuescroll from 'vue-scroll'
import VueFeather from 'vue-feather'
import VueWebsocket from 'vue-websocket-next'
import IO from 'socket.io-client'
import 'v-autocomplete/dist/v-autocomplete.css'

import App from './App'
import i18n from './lib/i18n'
import resizableColumn from './directives/resizable-column'
import router from './router'
import store from './store'

configureCompat({
  GLOBAL_MOUNT: false,
  OPTIONS_DATA_FN: false,
  OPTIONS_BEFORE_DESTROY: false,
  COMPONENT_FUNCTIONAL: false,
  GLOBAL_EXTEND: false,
  GLOBAL_PROTOTYPE: false
})

const app = createApp(App)

app.use(i18n)
app.use(router)
app.use(store)
app.use(VueWebsocket, IO, '/events')
app.use(Autocomplete)
app.use(Meta)
app.use(resizableColumn)
app.use(VTooltip)
app.use(Chartkick, { adapter: Chart })
app.use(Cookie)
app.use(Lazyload)
app.use(vuescroll)
app.use(DragDrop)
app.use(TextareaAutosize)

app.component(VueFeather.name, VueFeather)

// Make the current route part of the main state.
sync(store, router)

// Global custom directive to enable automatic focus on field after page
// loading.
app.directive('focus', {
  mounted (el) {
    el.focus()
  }
})

// Allow access to i18n object from vue instance.
app.config.globalProperties.$locale = {
  change (locale) {
    i18n.locale = locale
  },
  current () {
    return i18n.locale
  }
}

app.mount('#app')
