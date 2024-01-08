$(function () {
    // 数据提取 (myArray)
    var arrayString = localStorage.getItem("myArray"); // 从localStorage获取字符串
    var products = JSON.parse(arrayString); // 将字符串转换为数组
    console.log(products);

    // 购物车类
    class Cart {
        constructor(products) {
            this.cartItems = []; // 实例化购物车
            this.products = products
            this.init();
        };

        // 调用与切换
        init() {
            this.renderCart();
            this.products.forEach((product) => {
                this.addToCart(
                    product.img,
                    product.name,
                    product.price,
                    product.volume,
                    product.copy
                )
            })
        };

        // 购物车函数
        addToCart(img, name, price, volume, copy) {
            // 查询购物车对象
            const item = this.cartItems.find(item => item.name === name);
            // 判断购物车中是否有添加的这个商品，如果有在购物车的那个商品上增加一个数量，如果没有将商品添加到购物车
            if (item) {
                item.quantity++; // 增加这个商品的数量
            } else {
                this.cartItems.push({
                    img, // 商品图片
                    name, // 商品名称
                    price, // 商品价格
                    volume,
                    copy, // 商品简介
                    quantity: 1, // 商品初始数量
                    selected: false // 初始复选框按钮
                });
            }
            // 重新渲染购物车
            this.renderCart();
        };

        // 删除按钮事件
        removeFromCart(data, index) {
            const deletedItem = this.cartItems[index]; // 获取被删除的商品信息

            this.cartItems.splice(index, 1); // 从购物车中移除指定索引的商品
            this.renderCart();

            if (deletedItem.quantity >= 1) {
                const duplicateItems = Array(deletedItem.quantity).fill({
                    img: deletedItem.img,
                    name: deletedItem.name,
                    price: deletedItem.price,
                    volume: deletedItem.volume,  // 设置为1，因为duplicateItems数组中包含了多个相同的商品
                    copy: deletedItem.copy
                });
                localStorage.setItem("mystArray", JSON.stringify(duplicateItems));
            } else {
                console.log([{
                    img: deletedItem.img,
                    name: deletedItem.name,
                    price: deletedItem.price,
                    volume: deletedItem.volume,
                    copy: deletedItem.copy
                }]); // 打印被删除的商品信息作为包含单个元素的数组
            }
        }

        // 购物车数量事件
        updateQuantity(index, quantity) {
            const item = this.cartItems[index];
            if (item) {
                item.quantity = quantity; // 更新购物车中商品的数量
                this.renderCart(); // 重新渲染购物车
            }
        };

        // 商品复选框事件
        toggleSelection(index) {
            const item = this.cartItems[index];
            if (item) {
                item.selected = !item.selected;
                this.renderCart(); // 重新渲染购物车
            }
        };

        // 全选复选框事件
        toggleAllSelection() {
            const allSelected = this.cartItems.every(item => item.selected); // 判断是否所有商品都被选中
            this.cartItems.forEach(item => item.selected = !allSelected); // 切换所有商品的选中状态
            this.renderCart(); // 更新购物车显示
        }



        // 渲染购物车
        renderCart() {
            const cartElement = $('.cart-body-bottom');
            cartElement.empty(); // 清空购物车


            let totalPrice = 0; // 所有被选中的商品的总价
            let selectedCount = 0; // 所有被选中的商品的数量

            const fragment = $(document.createDocumentFragment()); // 创建一个空白模板

            // 循环购物车对象(item: 每个商品; index: 商品下标)
            this.cartItems.forEach((item, index, sets) => {
                const itemTotalPrice = item.price * item.quantity;

                if (item.selected) {
                    totalPrice += itemTotalPrice;
                    selectedCount++;
                }

                const cartItem = $("<div>").addClass("cart-body-top-main")

                const checkboxCell = $("<div>");
                const nameCell = $("<div>");
                const priceCell = $("<div>");
                const quantityCell = $("<div>");
                const fivetocell = $("<div>");
                const subtotalCell = $("<div>");

                const checkbox = $("<input>").attr({
                    type: 'checkbox',
                    checked: item.selected
                }).on('change', () => this.toggleSelection(index));

                const div_two_img = $("<img>").attr({
                    src: item.img,
                    alt: ""
                });

                const div_two_div = $("<div>");
                const div_two_div_h3 = $("<h3>").text(item.name);
                const div_two_div_p = $("<p>").text(item.copy);

                const div_three_span = $("<span>").text(`￥${(item.price).toFixed(2)}`);

                const div_four_span_one = (
                    $('<span>')
                        .addClass('cart-reduce')
                        .text('-')
                        .on('click', () => {
                            const newQuantity = item.quantity - 1;
                            if (newQuantity >= 1) {
                                this.updateQuantity(index, newQuantity);
                            } else {
                                this.removeFromCart(index);
                            }
                        })
                );
                const div_four_span_two = (
                    $('<span>')
                        .addClass('cart-num')
                        .attr({
                            value: item.quantity
                        })
                        .text(item.quantity)
                        .on('change', (event) => this.updateQuantity(
                            index,
                            parseInt(event.target.value))
                        )
                );
                const div_four_span_three = (
                    $('<span>')
                        .addClass('cart-add')
                        .text('+')
                        .on('click', () => {
                            const newQuantity = item.quantity + 1;
                            this.updateQuantity(index, newQuantity);
                        })
                );

                const five_div_span = $("<span>").text(`￥${itemTotalPrice.toFixed(2)}`);

                const six_a = $("<a>").text('删除').on('click', () => this.removeFromCart(item, index));

                // 商品数量事件
                if (item.quantity === 1) {
                    div_four_span_one.css({
                        visibility : "hidden"
                    })
                } else {
                    div_four_span_one.css({
                        visibility : "visible"
                    })
                }

                checkboxCell.append(checkbox); // 1
                nameCell.append(div_two_img).append( // 2
                    div_two_div
                        .append(div_two_div_h3)
                        .append(div_two_div_p)
                )

                priceCell.append(div_three_span) // 3

                quantityCell.append(div_four_span_one).append(div_four_span_two).append(div_four_span_three)

                fivetocell.append(five_div_span)

                subtotalCell.append(six_a)

                cartItem.append(checkboxCell).append(nameCell).append(priceCell).append(quantityCell).append(fivetocell).append(subtotalCell)

                fragment.append(cartItem);
            });

            cartElement.append(fragment);

            const selectedCountElement = $('.cart-head-left');
            const totalPriceElement = $('#cart-head-price');

            // 显示商品的数量和总价钱
            selectedCountElement.text(`购物车（${selectedCount.toFixed(0)}）`);
            totalPriceElement.text("￥" +    totalPrice.toFixed(2));

            

            // 复选框事件处理
            const selectAllCheckbox = document.querySelector('.banner .cart .cart-body .cart-body-top .cart-body-top-main div:nth-child(1) input');
            selectAllCheckbox.checked = this.cartItems.length > 0 && this.cartItems.every(item => item.selected);
            selectAllCheckbox.onchange = () => this.toggleAllSelection();
        }

    }
    $(".banner .cart .cart-head .cart-head-right .submit-btn").on("click", () => {
        alert("总价格为：" + $("#cart-head-price").text())
    });
    const cartInstance = new Cart(products);

})
