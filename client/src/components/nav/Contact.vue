<template>
<li @click="selectContact" data-toggle="tab" :data-target="dataTarget" class="">
    <div class="message-count"> 1 </div>
    <img alt="" class="img-circle medium-image" src="https://bootdey.com/img/Content/avatar/avatar1.png">

    <div class="vcentered info-combo">
        <h3 class="no-margin-bottom name"> {{contact.username}} </h3>
        <h5>{{ messages[messages.length-1] ? messages[messages.length-1].body : '' }}</h5>
    </div>
    <div class="contacts-add">
        <span class="message-time"> {{ messages[messages.length-1] ? messages[messages.length-1].postedOn : '' | moment("h:mm a") }}</span>
        <i class="fa fa-trash-o"></i>
        <i class="fa fa-paperclip"></i>
    </div>
</li>
</template>

<script>
import moment from 'moment'
import axios from 'axios'

	export default {
		name: 'Contact',
		props: ['dataTarget', 'contact'],
        data () {
            return {
                messages: [],
            }
        },
        methods: {
            selectContact () {
                window.Event.$emit('contact-selected', {messages: this.messages, contactId: this.contact._id} )
            }
        },
        mounted () {
            // axios.get(`/messages/${window.User.userId}/${this.contact._id}`).then(
                // function (response) {
                    // console.log(response)
                    // this.messages = response.data
                // })
            socket.emit('init-messages', {user2: this.contact._id})
            socket.on('init-messages', (messages) => {
                this.messages = messages
            })
        }

	}
</script>