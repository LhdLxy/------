
$(function () {
    var clearfix = $(".fl-products");

    // 创建永久本地保存数组 
    var datalist = JSON.parse(localStorage.getItem('myArray')) || [];

    var arrayString = localStorage.getItem("mystArray"); // 从购物车获取已经删除的字符串
    var products = JSON.parse(arrayString); // 将字符串转换为数组

    // 调用函数
    deleteData(products)

    // 检查数据
    console.log("还剩数据", datalist);

    function addData(item) {
        datalist.push(item);
        setTimeout(() => {
            localStorage.setItem("myArray", JSON.stringify(datalist));
        }, 1)
    }

    function deleteData(dataArray) {
        console.log("从购物车获取的删除的数据", dataArray);
        // 遍历每一条数据
        dataArray.forEach(function (data) {
            // 使用filter方法来过滤掉要删除的数据
            datalist = datalist.filter(function (item) {
                // 返回所有不等于要删除数据的项
                return JSON.stringify(item) !== JSON.stringify(data);
            });
        });
        // 打印更新后的数组
        console.log("删除后的数据:", datalist);
        // 传值回去
        setTimeout(() => {
            localStorage.setItem("myArray", JSON.stringify(datalist));
        }, 1)
    }

    // 数据渲染
    function appendProductItem(item, container) {
        var productItem = $(`
            <div class="fl-products-item">
                <a href="#">
                    <div class="img-box">
                        <img height="240" width="220" src="${item.img}" style="">
                    </div>
                    <div class="product-content">
                        <p class="product-title">${item.name}</p>
                        <p class="product-copy">${item.copy}</p>
                        <p class="product-price">
                            <span class="price-sign">¥</span>
                            <span class="price-num">${item.price}</span>
                        </p>
                        <p class="product-sell">已售${item.volume}</p>
                    </div>
                </a>
                <img src="img/gwc.jpg" class="gwc">
            </div>
        `);

        productItem.find('.gwc').on('click', function () {
            var flag = confirm("是否将商品添加至购物车");
            if (flag == true) {
                addData(item);
                // 检查是否添加数据
                console.log("添加了一条数据", item);
            } else {
                console.log("取消添加");
            }
            
        });

        container.append(productItem);
    }

    salve[0].forEach((item) => {
        appendProductItem(item, clearfix.eq(0));
    });

    salve[1].forEach((item) => {
        appendProductItem(item, clearfix.eq(1));
    });

    salve[2].forEach((item) => {
        appendProductItem(item, clearfix.eq(2));
    });
});

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