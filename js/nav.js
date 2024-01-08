$(function () {
    $(document).ready(function () {
        let head = $("header");
        let pc = $(".head-nav-pc");
        let menu = $(".menu-icon");

        let time = function () {
            if ($(window).width() < 767) {
                head.css("background", $(window).scrollTop() != 0 ? "rgba(255, 255, 255, .8)" : "rgba(33, 33, 33, .8)");
            } else {
                pc.removeAttr("style");
                head.css("background", $(window).scrollTop() != 0 ? "rgba(255, 255, 255, .8)" : "rgba(33, 33, 33, .8)");
            }
            let head_one = $("header a");
            var scrollDistance = $(window).scrollTop();

            if (scrollDistance != 0) {
                head.css("background", "rgba(255, 255, 255, .8)");
                head_one.css("color", "black");
            } else if (scrollDistance == 0 && $(window).width() > 767) {
                head.css("background", "rgba(33, 33, 33, .8)");
                head_one.css("color", "white");
            } else if (scrollDistance == 0 && $(window).width() < 767) {
                head.css("background", "rgba(33, 33, 33, .8)");
                head_one.css("color", "black");
            }
        };

        menu.click(function () {
            if ($(window).width() < 767) {
                if (pc.css("display") == "none") {
                    pc.css({
                        display: "flex",
                        opacity: "1"
                    });
                    head.css("background", "rgba(255, 255, 255, .8)");
                    if ($(window).scrollTop() != 0) {
                        head.css("background", "rgba(255, 255, 255, .8)");
                    } else if ($(window).scrollTop() == 0 && pc.css("display") == "none") {
                        head.css("background", "rgba(0, 0, 0, .8)");
                    }
                } else {
                    pc.css({
                        display: "none",
                        opacity: "0"
                    });
                    head.css("background", "rgba(255, 255, 255, .8)");
                    if ($(window).scrollTop() != 0) {
                        head.css("background", "rgba(255, 255, 255, .8)");
                    } else if ($(window).scrollTop() == 0 && pc.css("display") == "none") {
                        head.css("background", "rgba(0, 0, 0, .8)");
                    }
                }
            } else {
                pc.removeAttr("style");
                head.css("background", $(window).scrollTop() != 0 ? "rgba(255, 255, 255, .8)" : "rgba(33, 33, 33, .8)");
            }
        });

        $(window).resize(time);
        setTimeout(time, 0);

        $(window).scroll(function () {
            var head_one = $("header a");
            var scrollDistance = $(window).scrollTop();
            if (scrollDistance != 0) {
                head.css("background", "rgba(255, 255, 255, .8)");
                head_one.css("color", "black");
            } else if (scrollDistance == 0 && $(window).width() > 767) {
                head.css("background", "rgba(0, 0, 0, .8)");
                head_one.css("color", "white");
            } else if (scrollDistance == 0 && $(window).width() < 767) {
                head.css("background", "rgba(0, 0, 0, .8)");
                head_one.css("color", "black");
            }
        });
    });
});