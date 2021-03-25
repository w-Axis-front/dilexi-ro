import slick from "slick-carousel";

export default function slider() {
    const productSliders = $('.js_productSlider');
    const testimonialsSlider = $('#js_testimonialsSlider');
    const slideIconImgs = $(".testimonials__slide-icon-wrapper");
    const bigImages = $(".testimonials__slide-img");

    if (productSliders.length > 0) {
        productSliders.each(function () {
            $(this).slick({
                arrows: false,
                dots: true,
                speed: 500,
                touchMove: false,
                swipe: true,
                centerMode: true,
                centerPadding: '0px'
            });
        });
    }

    if (testimonialsSlider) {
        $(testimonialsSlider).slick({
            prevArrow: '<button type="button" class="testimonials__slide-prev-btn"><svg class="testimonials__slide-arrow-img" width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '<path class="stroke" d="M12.75 0.929625L1.67963 12L12.75 23.0704" stroke-width="2"/>\n' +
                '</svg>\n</button>',
            nextArrow: '<button type="button" class="testimonials__slide-next-btn"><svg class="testimonials__slide-arrow-img" width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '<path class="stroke" d="M0.749876 23.0704L11.8203 12L0.749878 0.929624" stroke-width="2"/>\n' +
                '</svg>\n</button>',
            speed: 500,
            touchMove: false,
            swipe: true,
            centerMode: true,
            centerPadding: '0px',
            adaptiveHeight: true,
            // autoplay: true,
            // pauseOnHover: true
        });

        $(testimonialsSlider).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            const thisSlide = $(this).find(".slick-current");
            const chosenImgIcon = thisSlide.find(".chosen");

            if (chosenImgIcon.length > 0) {
                chosenImgIcon.removeClass("chosen");
            }
            bigImages.each(function () {
                $(this).css({"display": "none"});
            });
            slick.$list.css({"min-height": 0});
        });

        // $(testimonialsSlider).on('afterChange', function (event, slick, currentSlide) {});
    }

    if (slideIconImgs.length > 0) {
        const testimonialsSliderList = testimonialsSlider.find(".slick-list");
        slideIconImgs.each(function () {
            $(this).on("click", function () {
                const __this = $(this);
                const chosenIconImg = __this.find(".testimonials__slide-img-icon");
                const chosenIconImgSrc = chosenIconImg.attr("src");
                const chosenIconImgAlt = chosenIconImg.attr("alt");
                const chosenIconImgSrcset = chosenIconImg.attr("srcset");
                const imagesWrapper = __this.closest(".testimonials__slide-images-wrapper");
                const chosenImg = imagesWrapper.find(".testimonials__slide-img");

                slideIconImgs.each(function (iconIndex, elem) {
                    if (elem.classList.contains("chosen")) {
                        $(elem).removeClass("chosen");
                    }
                });
                __this.addClass("chosen");

                chosenImg.attr({
                    src: chosenIconImgSrc,
                    alt: chosenIconImgAlt,
                    srcset: chosenIconImgSrcset
                });
                chosenImg.css({"display": "block"});
                if (window.matchMedia('(max-width: 991.9px)').matches) {
                    testimonialsSliderList.css({"min-height": "640px"});
                } else {
                    testimonialsSliderList.css({"min-height": "450px"});
                }
                if (window.matchMedia('(max-width: 359.9px)').matches) {
                    testimonialsSliderList.css({"min-height": "666px"});
                }
            });
        });
    }
}