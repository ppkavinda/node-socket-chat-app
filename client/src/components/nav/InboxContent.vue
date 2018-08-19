<template>
<div id="inbox" class="contacts-outter-wrapper tab-pane active">
    <form class="panel-search-form info form-group has-feedback no-margin-bottom">
        <input type="text" class="form-control" name="search" placeholder="Search">
        <span class="fa fa-search form-control-feedback"></span>
    </form>
    <div class="contacts-outter">
        <ul class="list-unstyled contacts">
            <contact v-for="contact in contacts" :dataTarget="'#inbox-message-1'" :contact="contact"/>
        </ul>
    </div>
</div>
</template>

<script>
	import Contact from './Contact'

	export default {
		name: 'InboxContent',
		components: { Contact },
        data () {
            return {
                contacts: [],
            }
        },
        created () {
            socket.on('set-contact', (contacts) => {
                this.contacts = contacts
            })
            socket.on('user-disconnect', (user) => {
                this.contacts.splice(this.contacts.indexOf(user.userId), 1)
            })
            socket.on('user-connect', (user) => {
                console.log(user)
                this.contacts.push(user)
            })
        }
	}
</script>