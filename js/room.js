// 手機選單動畫
function menuMobileTransform() {
  $(".menuMobile_link").click(function(e) {
    e.preventDefault();

    $(".menuMobile_overlay").toggleClass("open");
    $(".menuMobile").toggleClass("open");
  });
}

// 家具tab切換
$(function(){
    var $li = $('.tabTitle li');
    $($('.tabTitle li').eq(0).addClass('active').find('a').attr('href')).siblings('.tabContent').hide();
    
    $('.tabTitle li').click(function(){
        $($(this).find('a').attr('href')).show().siblings('.tabContent').hide();
        $(this).addClass('active').siblings('.active').removeClass('active');
        
    });

    $('#openFurniture').click(function(){
    	$('#chairTabTitle').toggleClass('show2');
    	$('#deskTabTitle').toggleClass('show2');
    	$('#bedTabTitle').toggleClass('show2');
    	$('#furnitureTab').toggleClass('open');
    });
    
});

$(document).ready(function() {

	//換椅子
    $(".chairSmallChange img").click(function() {
	    let chairSrc = $(this).attr("src").replace("S","L");
	    $(".chair img").attr("src", chairSrc);
  	});

    //換桌子
  	$(".deskSmallChange img").click(function() {
	    let deskSrc = $(this).attr("src").replace("S","L");
	    $(".desk img").attr("src", deskSrc);
	});

	//換床
  	$(".bedSmallChange img").click(function() {
	    let bedSrc = $(this).attr("src").replace("S","L");
	    $(".bed img").attr("src", bedSrc);
	});

  	//留言板打開
	$('.messageBoard').click(function(){
        $('.lightboxBg').css({ 
        	display: "block" 
        });
    });

	//留言板關閉
    $('#cancel').click(function(){
        $('.lightboxBg').css({ 
        	display: "none" 
        });
    });

  //owl
    


});


window.addEventListener('load', function() {
  menuMobileTransform();
});