$(document).ready(function(){
	var BASEURL = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1';
	var $showCreate = $('#show_create')
	var $newUserForm = $('#new_user_content')

	function loadUsers() {
		$('#users').empty();
		$.ajax({
			url: BASEURL + '/users',
			type: 'GET',
			dataType: 'JSON'
		}).done(function(data) {
			data.forEach(function(user) {
				$('#users').prepend('<li>' + user.first_name + " " + user.last_name + 
					                '<button data-user-id=' + user.id + 
					                ' class="delete_button">Delete</button>' +
					                '<button data-user-id=' + user.id + 
					                ' class="update_button">Update</button></li>')
			});
			}).fail(function(data) {
				console.log(user);
		});
	};

	$(document).on('click', '.delete_button', function() {
		var userId = $(this).data('user-id');
		$.ajax({
			url: BASEURL + '/users/' + userId,
			type: 'DELETE',
			dataType: 'JSON'
		}).done(function(data){
			loadUsers();
		}).fail(function(data){
			console.log(data);
		});
	});

	$(document).on('click', '.update_button', function() {
		var userId = $(this).data('user-id');
		$.ajax({
			url: BASEURL + '/users/' + userId,
			type: 'GET',
			dataType: 'JSON'
		}).done(function(data) {
			var first = data.first_name;
			var last = data.last_name;
			var phone = data.phone_number;
			$('#edit_first_name').val(first);
			$('#edit_last_name').val(last);
			$('#edit_phone_number').val(phone);
			$('#user_id').val(userId);
			$(edit_user_div).slideDown();
		}).fail(function(data) {
			console.log(data);
		});
	});

	$(edit_form).submit(function(e) {
		e.preventDefault();
		var form = this;
		var userId = $('#user_id').val()
		console.log(userId);
		$.ajax({
			url: BASEURL + '/users/' + userId,
			type: 'PUT',
			dataType: 'JSON',
			data: $(this).serializeArray()
		}).done(function(data) {
			form.reset()
			loadUsers();
			$(edit_user_div).slideUp()
		}).fail(function(data) {
			console.log(data);
		});
	});

	$showCreate.click(function(){
		$newUserForm.slideToggle(400, function(){
			if($newUserForm.is(':hidden')) {
				$showCreate.text('New User Form');
			} else {
				$showCreate.text('Hide New Form');
			}
		})
	})

	$('#new_user').submit(function(e){
		e.preventDefault();
		var userFirstName = $('#user_first_name');
		var userLastName = $('#user_last_name');
		var userPhoneNumber = $('#user_phone_number');
		console.log(userPhoneNumber);
		$.ajax({
			url: BASEURL + '/users',
			type: 'POST',
			dataType: 'JSON',
			data: { user: { first_name: userFirstName.val(),
							last_name: userLastName.val(),
							phone_number: userPhoneNumber.val()
			}}
		}).done(function(data){
			loadUsers();
			userFirstName.val('');
			userFirstName.focus();
			userLastName.val('');
			userPhoneNumber.val('');
		}).fail(function(data){
			console.log(data);
		});
	});




	loadUsers()






})