<template>
	<div class="chat-footer">
        <textarea class="send-message-text" v-model="messageBody" @keydown.ctrl.enter="sendChat"></textarea>
        <label class="upload-file">
        <!-- For send files  TODO -->
            <!-- <input type="file" ref="messageFile" @change="processFile"> -->
            <i class="fa fa-paperclip"></i>
        </label>
        <button @click="sendChat" type="button" class="send-message-button btn-info"> <i class="fa fa-send"></i> </button>
    </div>
</template>

<script>
export default {
	data () {
		return {
			messageBody : '',
			messageFiles: '',
			selectedUser: '',
		}
	},

	methods: {
		sendChat () {
			if (this.messageBody != '') {
				window.Event.$emit('send-message',  {
					to: this.selectedUser,
					from: window.User._id,
					body: this.messageBody,
					postedOn: new Date(),
					type: 'private'
				})
				this.messageBody = ''
			}
			// if (this.messageFiles != '') {
				// window.Event.$emit('send-chat', {username: "Mr. Robot", body: this.messageFiles, type: 'notMe', postedOn: new Date() })
				// this.messageFiles = ''
				// console.log(this.messageFiles)
			// }
		},
		// TODO sending files
		processFile (event) {
			this.messageFiles = this.$refs.messageFile.files
			console.log(this.messageFiles)
		}
	},
	mounted () {
		window.Event.$on('contact-selected', (selContact) => {
			this.selectedUser = selContact.contactId
		})
	}
}
</script>