import Vue from 'vue'
import App from './App.vue'
import io from 'socket.io-client'

window.socket = io('localhost:3000')
// Vue.use(socket)
window.Event = new Vue();

new Vue({
  el: '#app',
  render: h => h(App)
})
