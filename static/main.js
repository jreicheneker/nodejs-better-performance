var postTemplate = function (it) { var out='<div class="post"><div class="some-fblike-nested-div-one"><div class="some-another-nested-div"><div class="nested-div-for-avatar another-long-class"><img src="'+( it.avatar )+'"></div><div class="one-more-div-for-text-here with-some-long classes-to-format-it"><p><span class="author-also-wants-to have-some-fancy-span"><b>'+( it.author )+'</b>:<br></span>'+( it.text )+'</p></div></div></div></div>';return out; }

var socket = io.connect();

socket.on('getpost', function (data) {
   $('button').after(postTemplate(data));
});

$(function () {
	$('button').on('click', function () {
    socket.emit('getpost');
	});
});