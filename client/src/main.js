import Vue from 'vue'
import App from './App.vue'
import io from 'socket.io-client'

window.socket = io()

Vue.use(require('vue-moment'))
// Vue.use(socket)
window.Event = new Vue();



new Vue({
  el: '#app',
  render: h => h(App)
})
