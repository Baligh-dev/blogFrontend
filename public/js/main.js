var SliderStatus = true;

// Navigation
(function ($) {

	"use strict"

	$(window).on("scroll", function () {
		var navBar = $(".navbar-fixed-top"),
			windowHeight = $(this).innerHeight() - navBar.innerHeight();

		if ($(this).scrollTop() > windowHeight) {
			SliderStatus = false;
			navBar.removeClass("bottom");
		}
		else {
			SliderStatus = true;
			navBar.addClass("bottom");
		}
	});
})(jQuery);

// Header Slider
(function ($) {

	"use strict"

	var aPrev = $(".nav-slide a.prev"),
		aNext = $(".nav-slide a.next"),
		NextTitle = $(".nav-slide a.next h3"),
		NextAuthor = $(".nav-slide a.next p"),
		NextImg = $(".nav-slide a.next img"),
		PrevTitle = $(".nav-slide a.prev h3"),
		PrevAuthor = $(".nav-slide a.prev p"),
		PrevImg = $(".nav-slide a.prev img"),
		activeSlide = $(".image-slide"),
		activeTitle = $(".slider-content h1"),
		activeIndex, nextIndex, prevIndex,
		objHeaderLength = dataHeader.length - 1,
		SliderTimeout = false;

	aPrev.on("click", function () {
		loader(false);
	});

	aNext.on("click", function () {
		loader(true);
	});

	function SliderInterval() {
		SliderTimeout = setInterval(function () {
			if (SliderStatus) loader(true);
		}, 8000);
	}

	function startImageHeader() {
		if (typeof activeIndex === "undefined") {
			activeIndex = 0;
			nextIndex = 1;
			prevIndex = objHeaderLength;
		}

		dataHeader.forEach(function (a) {
			a.show = false;
		});

		dataHeader[activeIndex].show = true;

		new preLoader([dataHeader[activeIndex].bigImage, dataHeader[prevIndex].bigImage, dataHeader[nextIndex].bigImage], {
			onComplete: function (loaded, errors) {

				var brokenImage = "images/broken-image.jpg",
					activeImg = dataHeader[activeIndex].bigImage,
					prevImg = dataHeader[prevIndex].bigImage,
					nextImg = dataHeader[nextIndex].bigImage;

				if (errors) {
					for (var i = 0; i < errors.length; i++) {
						activeImg = (errors[i] === activeImg) ? brokenImage : activeImg;
						prevImg = (errors[i] === prevImg) ? brokenImage : prevImg;
						nextImg = (errors[i] === nextImg) ? brokenImage : nextImg;
					}
				}

				setTimeout(function () {
					loaderSVG.hide();
					SliderInterval();
				}, 2000);

				activeSlide.css("background-image", "url('" + activeImg + "')");

				PrevImg.attr("src", prevImg);

				NextImg.attr("src", nextImg);
			}
		});

		activeTitle.text(dataHeader[activeIndex].title);

		PrevAuthor.text("by " + dataHeader[prevIndex].author);
		PrevTitle.text(dataHeader[prevIndex].title);
		NextAuthor.text("by " + dataHeader[nextIndex].author);
		NextTitle.text(dataHeader[nextIndex].title);
	}

	function loader(n) {
		clearInterval(SliderTimeout);
		loaderSVG.show();

		for (var i = 0; i <= objHeaderLength; i++) {
			if (dataHeader[i].show && n) {
				activeIndex = (i + 1 > objHeaderLength) ? 0 : i + 1;
				nextIndex = (activeIndex + 1 > objHeaderLength) ? 0 : activeIndex + 1;
				prevIndex = i;

				break;
			}
			else if (dataHeader[i].show && !n) {
				activeIndex = (i - 1 < 0) ? objHeaderLength : i - 1;
				prevIndex = (activeIndex - 1 < 0) ? objHeaderLength : activeIndex - 1;
				nextIndex = i;
				break;
			}
		}

		setTimeout(function () {
			startImageHeader();
		}, 800);
	}

	startImageHeader();

})(jQuery);


// TEMPLATE
(function ($) {
	$(document).on("ready", function () {
		"use strict"


		//Header fit screen
		$(function () {
			"use strict";
			$("#header").css({
				"height": ($(window).height()) + "px"
			});
			$(window).resize(function () {
				$("#header").css({
					"height": ($(window).height()) + "px"
				});
			});
		});

		// anchor handler
		$(document).on("click", "a", function (e) {
			var full_url = this.href,
				windowWidth = window.innerWidth,
				navBar = (windowWidth >= 768) ? $(".navbar-fixed-top") : $(".navbar-header"),
				windowLocation = window.location.href.split("#")[0],
				parts = full_url.split("#");

			if (windowLocation !== parts[0])
				return

			if (parts[1].length > 0 && $("#" + parts[1]).length > 0) {
				$.smoothScroll({
					offset: -navBar.innerHeight(),
					scrollTarget: "#" + parts[1],
					speed: 500
				});
			}

			return false;
		});



	});


})(jQuery);