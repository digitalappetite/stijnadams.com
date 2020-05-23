;(function () {
	'use strict';

	// Menu
	var preventScrollOnMenuTap = function() {
		$('body').on('click', '.js-sa-menu', function(event) {
			event.preventDefault();
		});
	};

	var scrollToSectionOnMenuItemTap = function() {
		$('#navbar a:not([class="external"])').click(function(event) {
            event.preventDefault();

			var section = $(this).data('nav-section'),
                dataSection = $('[data-section="' + section + '"]');

            scrollToDataSection(dataSection)
		    hideNavBar()
		    
		    return false;
		});
    };
    
    var scrollToDataSection = function(dataSection) {
        if (!dataSection.length) return

        var body = $('html, body'),
            dataSectionTop = dataSection.offset().top;

        body.animate({
            scrollTop: dataSectionTop - 16
        }, 500);
    }

    var hideNavBar = function() {
        $('.navbar-collapse').collapse('hide');
    }

	// Window Scroll
	var windowScroll = function() {
        var header = $('#navigation'),
            navBar = $('#navbar'),
            headerMarginTop = parseInt(header.css("marginTop").replace('px', '')),
            navBarHeight = navBar.height();

        if (headerMarginTop == 0) {
            header.addClass('navbar-fixed-top');
            return
        } 

		$(window).on('scroll', function() {
            var isNavBarFixed = header.hasClass('navbar-fixed-top'),
                scrollOffsetY = $(this).scrollTop();

			if ( scrollOffsetY > headerMarginTop) {
				header.addClass('navbar-fixed-top');
			} else if ( scrollOffsetY <= (headerMarginTop + navBarHeight) && isNavBarFixed) {
				header.removeClass('navbar-fixed-top');
			}
        });
    };

    $(window).resize(function() {
        var window = $(window),
            header = $('#navigation');
        
        header.removeClass('navbar-fixed-top');
        $(window).off('scroll');

        var navBar = $('#navbar'),
            headerMarginTop = parseInt(header.css("marginTop").replace('px', '')),
            navBarHeight = navBar.height();

		var isNavBarFixed = header.hasClass('navbar-fixed-top'),
            scrollOffsetY = $(this).scrollTop();

        if ( scrollOffsetY > headerMarginTop) {
            header.addClass('navbar-fixed-top');
        } else if ( scrollOffsetY <= (headerMarginTop + navBarHeight) && isNavBarFixed) {
            header.removeClass('navbar-fixed-top');
        }

        windowScroll();
    })
	
    // Scroll triggers
    var listenToScrollTrigger = function() {
        $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
            event.preventDefault()
            
            var isThisHostName = location.hostname == this.hostname;
            var isThisPathName = location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '');
            var isLocalTarget = isThisHostName && isThisPathName

            if (!isLocalTarget) return
            var target = $('[data-section=' + this.hash.slice(1) + ']');

            if (!target.length) return
            scrollToDataSection(target)
            hideNavBar()
            
            return false;
        });
    }

    // Helpers
    function insertEmail() {
        $('a[href^="js-sa-mailme"]').each(function(){ 
            $(this).attr("href", "ma" + "ilt" + "o" + ":" + makeEmail());
        });
        $('.js-sa-mail-placeholder').each(function(){ 
            $(this).text(makeEmail());
        });
    }

    function makeEmail() {
        var user = "stijn",
            at = String.fromCharCode(Math.pow(2,6)),
            domain = "digitalappetite",
            extension = "be";

        return user + at + domain + '.' + extension
    }

    function addUserInteractionFeedback() {
        $('a').on('touchstart', function(e){
            $(this).addClass('touching');
        });
         
        $('a').on('touchend', function(e){
            $(this).removeClass('touching');
        });
    }

	$(function(){
		preventScrollOnMenuTap();
		scrollToSectionOnMenuItemTap();
        listenToScrollTrigger();

        windowScroll();

        insertEmail();

        addUserInteractionFeedback();
    });
}());