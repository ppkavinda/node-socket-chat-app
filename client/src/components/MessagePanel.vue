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

export default {
  name: 'MessagePanel',
  components: { NavigationPanel, ChatBox },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      username: 'Username',
    }
  },
}
</script>

<style >

</style>
