<template>
<div class="message my-message">
    <img alt="" class="img-circle medium-image" src="https://bootdey.com/img/Content/avatar/avatar7.png">

    <div class="message-body">
        <div class="message-body-inner">
            <div class="message-info">
                <h4> {{ message.username }} </h4>
                <h5> <i class="fa fa-clock-o"></i> {{ message.postedOn }} </h5>
            </div>
            <hr>
            <div class="message-text">
            {{ message.body }}
            </div>
        </div>
    </div>
    <br>
</div>
</template>

<script>
export default {
	name: 'BubbleMe',
    props: ['message'],
}
</script>