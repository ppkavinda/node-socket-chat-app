<template>
<div class="message-top">
    <a class="btn btn btn-success new-message"> <i class="fa fa-envelope"></i> New Message </a>

    <div class="new-message-wrapper">
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Send message to...">
            <a class="btn btn-danger close-new-message" href="#"><i class="fa fa-times"></i></a>
        </div>

        <div class="chat-footer new-message-textarea">
            <textarea class="send-message-text"></textarea>
            <label class="upload-file">
                <input type="file" required="">
                <i class="fa fa-paperclip"></i>
            </label>
            <button type="button" class="send-message-button btn-info"> <i class="fa fa-send"></i> </button>
        </div>
    </div>
</div>
</template>