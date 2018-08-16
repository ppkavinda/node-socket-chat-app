<template>
<div class="contacts-list">
	<div class="inbox-categories">
	    <div data-toggle="tab" data-target="#inbox" class="active"> Inbox </div>
	</div>
	<div class="tab-content">
		<inbox-content/>
	</div>
</div>
</template>

<script>
import InboxContent from './InboxContent'

export default {
    name: 'NavigationPanel',
    components: {InboxContent},
}
</script>
