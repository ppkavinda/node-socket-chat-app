<template>
<div id="inbox" class="contacts-outter-wrapper tab-pane active">
    <form class="panel-search-form info form-group has-feedback no-margin-bottom">
        <input type="text" class="form-control" name="search" placeholder="Search">
        <span class="fa fa-search form-control-feedback"></span>
    </form>
    <div class="contacts-outter">
        <ul class="list-unstyled contacts">
            <!-- <contact :dataTarget="'#inbox-message-1'" /> -->
            <!-- <contact :dataTarget="'#inbox-message-2'" /> -->
            <!-- <contact :dataTarget="'#inbox-message-3'" /> -->
            <!-- <contact :dataTarget="'#inbox-message-4'" /> -->
        </ul>
    </div>
</div>
</template>

<script>
	import Contact from './Contact'

	export default {
		name: 'InboxContent',
		components: { Contact },
	}
</script>