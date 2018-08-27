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
        methods: {
            
        },
        created () {
            socket.on('my-info', function (myInfo) {
                console.log("myInfo")
                console.log(myInfo)
                window.User = myInfo
            })
            socket.on('init-contact', (contacts) => {
                for (var i=0; i<contacts.length; i++) {
                    if (contacts[i]._id != window.User.userId) {
                        this.contacts.push(contacts[i])
                    }
                }
            })
            socket.on('user-disconnect', (user) => {
                console.log(user)
                this.contacts.splice(this.contacts.indexOf(user.userId), 1)
            })
            socket.on('user-connect', (user) => {
                if (user._id != window.User.userId) {
                    this.contacts.push(user)
                }
            })

        },

	}
</script>