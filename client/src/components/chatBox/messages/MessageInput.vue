<template>
	<div class="chat-footer">
        <textarea class="send-message-text" v-model="messageBody" @keydown.ctrl.enter="chat"></textarea>
        <label class="upload-file">
            <input type="file" required="">
            <i class="fa fa-paperclip"></i>
        </label>
        <button @click="chat" type="button" class="send-message-button btn-info"> <i class="fa fa-send"></i> </button>
    </div>
</template>

<script>
export default {
	data () {
		return {
			messageBody : '',
		}
	},

	methods: {
		chat () {
			window.Event.$emit('send-chat', { username: "Mr. Robot", body: this.messageBody, type: 'notMe', postedOn: new Date() })
			this.messageBody = ''
		}
	}
}
</script>