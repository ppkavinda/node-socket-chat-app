$(function () {
	var socket = io()
	$('form').submit(function () {
		socket.emit('chat', $('#m').val())
		$('#m').val('')
		return false
	})

	$('#m').on('keyup', function (data) {
		console.log(data.target.value)
		socket.emit('typing', data.target.value)
	})

	socket.on('chat', function (data) {
		$('#status').text('')
		$('#display').append('<p>' + data + '</p>')
	})

	socket.on('typing', function (data) {
		$('#status').text('someone is typing : ' + data)
	})
})