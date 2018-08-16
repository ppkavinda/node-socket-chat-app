<template>
<div class="container">
    <div class="panel messages-panel">

        <navigation-panel/>

        <div class="tab-content">
            <inbox-message-1/>
        </div>
    </div>
</div>
</template>

<script>
import NavigationPanel from './nav/NavigationPanel.vue'
import InboxMessage1 from './chatBox/InboxMessage1.vue'

export default {
  name: 'HelloWorld',
  components: { NavigationPanel, InboxMessage1 },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
  },
}
</script>

<style >

</style>
