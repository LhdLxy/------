$(document).ready(function () {
    var datanamepassword = JSON.parse(localStorage.getItem('pass')) || [];

    function validateUsername() {
        const username = $("#input-name").val();
        const usernameRegex = /^[a-zA-Z0-9_]{4,10}$/;

        if (username.length === 0) {
            $('#usernameError').text('用户名不能为空');
        } else if (!usernameRegex.test(username)) {
            $('#usernameError').text('用户名必须是4-10位以下划线、大小写字母和数字的任意组合');
        } else {
            $('#usernameError').text('');
        }
    }

    function validatePassword() {
        const password = $("#input-password").val();
        const passwordRegex = /^[a-zA-Z0-9_]{6,12}$/;

        if (password.length === 0) {
            $('#passwordError').text('密码不能为空');
        } else if (!passwordRegex.test(password)) {
            $('#passwordError').text('密码必须是6-12位以下划线、大小写字母和数字的任意组合');
        } else {
            $('#passwordError').text('');
        }
    }

    function validateConfirmPassword() {
        const password = $("#input-password").val();
        const confirmPassword = $("#input-passwords").val();

        if (confirmPassword.length === 0) {
            $('#confirmPasswordError').text('确认密码不能为空');
        } else if (confirmPassword !== password) {
            $('#confirmPasswordError').text('确认密码与密码不一致');
        } else {
            $('#confirmPasswordError').text('');
        }
    }

    $('#input-name').on('blur', function () {
        validateUsername();
    });

    $('#input-password').on('blur', function () {
        validatePassword();
    });

    $('#input-passwords').on('blur', function () {
        validateConfirmPassword();
    });

    $('form').on('submit', function (event) {
        event.preventDefault(); // 阻止表单的默认提交行为

        validateUsername();
        validatePassword();
        validateConfirmPassword();

        const usernameError = $('#usernameError').text();
        const passwordError = $('#passwordError').text();
        const confirmPasswordError = $('#confirmPasswordError').text();

        // if (datanamepassword)
        // 获取输入框的值
        let enteredName = $("#input-name").val();
        let enteredPassword = $("#input-password").val();

        // 检查输入是否有效
        if (usernameError === "" && passwordError === "" && confirmPasswordError === "") {
            // 判断用户是否已存在
            let userExists = datanamepassword.some(item => item.name === enteredName);

            if (userExists) {
                alert("已经存在该用户");
            } else {
                // 创建新用户对象
                let newUser = {
                    name: enteredName,
                    password: enteredPassword
                };

                // 将新用户添加到数据数组
                datanamepassword.push(newUser);

                // 将更新后的数据保存到本地存储
                localStorage.setItem("pass", JSON.stringify(datanamepassword));
                console.log(datanamepassword);

                // 提示用户注册成功
                alert("恭喜注册成功！");

                // 注册成功后的跳转
                setTimeout(function () {
                    // window.location.replace("login.html");
                }, 1);
            }
        }

    });
});