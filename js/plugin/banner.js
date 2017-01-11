var mySwiper = new Swiper('.swiper-container', {
	pagination: '.pagination',
	paginationClickable: true, //点击到具体那一页
	autoplay: 3000, //自动播放时间
	loop: true, //循环模式
	grabCursor: true // 鼠标放上去swiper手掌
});
var prevAndNext = function(prev, next) {
	$(prev).click(function() {
		mySwiper.swipePrev();
	})
	$(next).click(function() {
		mySwiper.swipeNext();
	})
	$('.swiper-slide img').width($(window).width());
	$('.swiper-container').width($(window).width());
	$('.swiper-container').height($('.swiper-slide img').height());
	$(window).resize(function() {
		$('.swiper-slide img').width($(window).width());
		$('.swiper-container').width($(window).width());
		$('.swiper-container').height($('.swiper-slide img').height());
	});
}