<template>
<div class="tab-pane message-body active" id="inbox-message-1">
	<message-top/>

	<div class="message-chat">
	    <div class="chat-body">
	        <message-info/>

	        <message-my/>

	        <message-info/>
	    </div>

	    <message-box/>
	</div>
</div>
</template>

<script>
	import MessageInfo from './messages/MessageInfo.vue'
	import MessageMy from './messages/MessageMy.vue'
	import MessageBox from './messages/MessageBox.vue'
    import MessageTop from './messages/MessageTop.vue'

	export default {
		name: 'InboxMessage1',
		components: {MessageInfo, MessageMy, MessageBox, MessageTop},
	}
</script>