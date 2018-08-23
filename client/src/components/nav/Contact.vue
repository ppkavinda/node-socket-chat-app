<template>
<li data-toggle="tab" :data-target="dataTarget" class="">
    <div class="message-count"> 1 </div>
    <img alt="" class="img-circle medium-image" src="https://bootdey.com/img/Content/avatar/avatar1.png">

    <div class="vcentered info-combo">
        <h3 class="no-margin-bottom name"> {{contact.username}} </h3>
        <h5>{{ lastMessage.body }}</h5>
    </div>
    <div class="contacts-add">
        <span class="message-time"> {{ lastMessage.postedOn | moment("h:mm a") }}</span>
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
                lastMessage : {body: "New Message", postedOn: new Date()},
                messages: [],
            }
        },
        created () {
            // axios.get(`/messages/${window.User.userId}/${this.contact._id}`).then(
                // function (response) {
                    // console.log(response)
                    // this.messages = response.data
                // })
            socket.emit('init-messages', {user1: User.userId, user2: this.contact._id})
        }

	}
</script>