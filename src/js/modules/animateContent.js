export default function animateContent() {
    const rotatedBtns = document.querySelectorAll(".js_rotated-btn");
    const accordion = document.getElementById("js_accordion");

    function enterHandler(rotatedBtnPart, btnText, btnStaticPart, btnStaticPartSVG) {
        rotatedBtnPart.css({"animation": "none 0s infinite linear"});
        btnText.css({"color": "#000000"});
        btnStaticPartSVG.css({"stroke": "#000000"});
        btnStaticPart.css({"background-color": "#FFFFFF"});
    }

    function leaveHandler(rotatedBtnPart, btnText, btnStaticPart, btnStaticPartSVG, btn) {
        rotatedBtnPart.css({"animation": "rotation 10s infinite linear"});
        btnText.css({"color": "#FFFFFF"});
        if (btn.classList.contains("order__gift-button-wrapper")) {
            btnStaticPart.css({"background-color": "#ffb951"});
        } else {
            btnStaticPart.css({"background-color": "#FFDD67"});
        }
        btnStaticPartSVG.css({"stroke": "#FFFFFF"});
    }

    function rotateBtns(e) {
        if (rotatedBtns.length > 0) {
            for (let i = 0; i < rotatedBtns.length; i++) {
                const rotatedBtn = $(rotatedBtns[i]);
                const rotatedBtnPart = rotatedBtn.find(".main__button");
                const btnText = rotatedBtn.find(".main__button-text");
                const btnStaticPart = rotatedBtn.find(".main__button-arrow");
                const btnStaticPartSVG = rotatedBtn.find(".stroke");
                if (e.matches) {
                    rotatedBtn.on('touchstart', function () {
                        // event.preventDefault();
                        enterHandler(rotatedBtnPart, btnText, btnStaticPart, btnStaticPartSVG);
                    });

                    rotatedBtn.on('touchend', function () {
                        leaveHandler(rotatedBtnPart, btnText, btnStaticPart, btnStaticPartSVG, rotatedBtns[i]);
                    });

                    rotatedBtn.mouseenter(function () {
                        enterHandler(rotatedBtnPart, btnText, btnStaticPart, btnStaticPartSVG);
                    });

                    rotatedBtn.mouseleave(function () {
                        leaveHandler(rotatedBtnPart, btnText, btnStaticPart, btnStaticPartSVG, rotatedBtns[i]);
                    });
                }
            }
        }
    }

    if (accordion !== undefined && accordion !== null) {
        const accTriggers = document.getElementsByClassName("reasons__accordion-trigger");
        const accItems = document.getElementsByClassName("reasons__accordion-item");

        for (let i = 0; i < accItems.length; i++) {
            if (i === 0) {
                $(accItems[i]).slideDown();
            } else {
                $(accItems[i]).hide();
            }
        }
        let itemIndex = 1;
        const interval = setInterval(function () {
            if (accItems[itemIndex].style.display !== "block") {
                for (let i = 0; i < accItems.length; i++) {
                    $(accItems[i]).slideUp();
                }
                $(accItems[itemIndex]).stop().slideDown();
            }

            if (itemIndex === 3) {
                // clearInterval(interval);
                itemIndex = 0;
            } else {
                itemIndex++;
            }
        }, 5000);

        for (let i = 0; i < accTriggers.length; i++) {
            accTriggers[i].addEventListener("click", function () {
                itemIndex = i;
                const panel = this.nextElementSibling;
                if (panel.style.display === "block") {
                    $(panel).stop().slideUp();
                } else {
                    for (let i = 0; i < accItems.length; i++) {
                        $(accItems[i]).slideUp();
                    }
                    $(panel).stop().slideDown();
                }
            });
        }

        $(document).on('page:beforeout', function () {
            clearInterval(interval);
        });
        $(window).on('unload', function () {
            clearInterval(interval);
        });
    }

    const media_check_max = window.matchMedia("(max-width: 991.9px)");
    media_check_max.addListener(rotateBtns);
    rotateBtns(media_check_max);
}