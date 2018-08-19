<template>
<div class="container">
    <div class="panel messages-panel">

        <navigation-panel/>

        <div class="tab-content">
            <chat-box/>
        </div>
    </div>
</div>
</template>

<script>
import NavigationPanel from './nav/NavigationPanel'
import ChatBox from './chatBox/ChatBox'
import axios from 'axios'

export default {
  name: 'MessagePanel',
  components: { NavigationPanel, ChatBox },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      username: 'Username',
    }
  },
    created () {
    axios.get('/myinfo').then(function (response) {
      window.User = response.data
      console.log(User)
    })
  }
}
</script>

<style >

</style>
