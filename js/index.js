// 导航栏js代码
$(function () {
    $(document).ready(function () {
        let head = $("header");
        let pc = $(".head-nav-pc");
        let menu = $(".menu-icon");

        let time = function () {
            if ($(window).width() < 767) {
                head.css("background", $(window).scrollTop() != 0 ? "rgba(255, 255, 255, .8)" : "transparent");
            } else {
                pc.removeAttr("style");
                head.css("background", $(window).scrollTop() != 0 ? "rgba(255, 255, 255, .8)" : "transparent");
            }
            let head_one = $("header a");
            var scrollDistance = $(window).scrollTop();

            if (scrollDistance != 0) {
                head.css("background", "rgba(255, 255, 255, .8)");
                head_one.css("color", "black");
            } else if (scrollDistance == 0 && $(window).width() > 767) {
                head.css("background", "transparent");
                head_one.css("color", "white");
            } else if (scrollDistance == 0 && $(window).width() < 767) {
                head.css("background", "transparent");
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
                        head.css("background", "transparent");
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
                        head.css("background", "transparent");
                    }
                }
            } else {
                pc.removeAttr("style");
                head.css("background", $(window).scrollTop() != 0 ? "rgba(255, 255, 255, .8)" : "transparent");
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
                head.css("background", "transparent");
                head_one.css("color", "white");
            } else if (scrollDistance == 0 && $(window).width() < 767) {
                head.css("background", "transparent");
                head_one.css("color", "black");
            }
        });
    });
});

// 轮播图js代码
$(function () {
    // 获取按键
    var lb = $("#to-left");
    var rb = $("#to-right");
    var ul = $("#rotation-ul");
    var lis = ul.find("li");
    // li类名称
    var classes = ["b1", "b1", "cc", "b1", "b1"];

    // 右边按钮函数
    function toright() {
        var last_class = classes.pop();
        classes.unshift(last_class);
        lis.each(function (index) {
            $(this).removeClass().addClass(classes[index]);
        });
    }

    // 左边按钮函数
    function toleft1() {
        var first_class = classes.shift();
        classes.push(first_class);
        lis.each(function (index) {
            $(this).removeClass().addClass(classes[index]);
        });
    }

    // 点击事件
    rb.click(toright);
    lb.click(toleft1);
    setInterval(toright, 4000); // 这里调整换图片速度
});

// 鲜花套餐 X Package
$(function () {
    const one = $(".box-two-ul");
    box_two.forEach((data) => {
        one.append(`
            <li>
                <p class="box-two-img">
                    <a href="shop.html">
                        <img src="${data.img}">
                    </a>
                </p>
                <div class="info">
                    <h3 class="t"><a href="shop.html">${data.name}</a></h3>
                    <p class="price"><span class="i">¥</span>${data.price}</p>
                    <p class="l"></p>
                    <p class="tip">${data.age}</p>
                </div>
            </li>
        `);
    });
});

// 底部轮播
$(function () {
    var clearfix = $(".clearfix");
    var one = clearfix.eq(0)
    var two = clearfix.eq(1)

    // 第一个轮播效果
    clears_one.forEach((data) => {
        one.append(`
            <li>
                <p class="imgbox-three">
                    <img src="${data.img}">
                </p>
                <div class="info-two">
                <p class="timeboxs">
                    <span>${data.data}</span>
                    ${data.name}
                </p>
                <h3 class="t">${data.names}</h3>
                <p class="tip">${data.age}</p>
                </div>
            </li>
        `)
    })

    // 第二个轮播效果
    clears_two.forEach((data) => {
        two.append(`
            <li>
                <p class="imgbox-three">
                    <img src="${data.img}">
                </p>
                <div class="info-two">
                <p class="timeboxs">
                    <span>${data.data}</span>
                    ${data.name}
                </p>
                <h3 class="t">${data.names}</h3>
                <p class="tip">${data.age}</p>
                </div>
            </li>
        `)
    })

    // 切换
    setInterval(function () {
        var clearfix = $(".clearfix");
        var clear_one = clearfix.eq(0).css("opacity");
        var clear_two = clearfix.eq(1).css("opacity");
        if (clear_one == 1) {
            clearfix.eq(0).css({
                transition: "all 1s ease",
                opacity: "0",
                zIndex: "0"
            })
            clearfix.eq(1).css({
                transition: "all 1s ease",
                opacity: "1",
                zIndex: "1"
            })
        } else {
            clearfix.eq(1).css({
                transition: "all 1s ease",
                opacity: "0",
                zIndex: "0"
            })
            clearfix.eq(0).css({
                transition: "all 1s ease",
                opacity: "1",
                zIndex: "1"
            })
        }
    }, 7000) // 切换时间设置
})