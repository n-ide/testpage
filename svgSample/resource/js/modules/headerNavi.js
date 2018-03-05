$(function(){
	$(".btn-menu").click(function(){
		console.log('click');
		$("#header").toggleClass('is-open');
	});
});