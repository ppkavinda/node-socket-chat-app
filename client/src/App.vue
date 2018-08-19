<template>
  <MessagePanel/>
</template>

<script>
import MessagePanel from './components/MessagePanel'

export default {
  name: 'app',
  components: {MessagePanel},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
}
</script>

<style>

</style>
