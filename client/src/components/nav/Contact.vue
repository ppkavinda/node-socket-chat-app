<template>
<li data-toggle="tab" :data-target="dataTarget" class="">
    <div class="message-count"> 1 </div>
    <img alt="" class="img-circle medium-image" src="https://bootdey.com/img/Content/avatar/avatar1.png">

    <div class="vcentered info-combo">
        <h3 class="no-margin-bottom name"> John Doe </h3>
        <h5> Hah, too late, I already bought it and my team is impleting the new design right now.</h5>
    </div>
    <div class="contacts-add">
        <span class="message-time"> 2:32 <sup>AM</sup></span>
        <i class="fa fa-trash-o"></i>
        <i class="fa fa-paperclip"></i>
    </div>
</li>
</template>

<script>
	export default {
		name: 'Contact',
		props: ['dataTarget'],
	}
</script>