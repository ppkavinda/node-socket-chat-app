<template>
<div class="message info">
    <img alt="" class="img-circle medium-image" src="https://bootdey.com/img/Content/avatar/avatar1.png">

    <div class="message-body">
        <div class="message-info">
            <h4> {{ message.username}} </h4>
            <h5> <i class="fa fa-clock-o"></i> {{ message.postedOn | moment("h:mm a") }} </h5>
        </div>
        <hr>
        <div class="message-text">{{ message.body }}</div>
    </div>
    <br>
</div>
</template>

<script>
	export default {
		name: 'BubbleInfo',
        props: ['message'],
	}
</script>