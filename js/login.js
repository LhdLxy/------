$(document).ready(function () {
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

    $('#input-name').on('blur', function () {
        validateUsername();
    });

    $('#input-password').on('blur', function () {
        validatePassword();
    });

    $('form').on('submit', function (event) {
        event.preventDefault(); // 阻止表单的默认提交行为

        validateUsername();
        validatePassword();

        const passwordError = $('#passwordError').text();
        const usernameError = $('#usernameError').text();

        if (passwordError === "" && usernameError === "") {
            alert("恭喜登录成功！");
            setTimeout(function () {
                window.location.replace("index.html");
            }, 1);
        }
    });
});