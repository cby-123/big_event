$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    //从layui 中获取form对象
    var form = layui.form
    //通过form.verify()函数自定义校验证规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //校验两次密码是否一致的规则
        repwd: function (value) {
            //通过形参拿到确认密码框中的内容
            //还需要拿到密码框中的内容
            //然后进行一次判断
            //如果判断失败，则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })


    //监听注册表单注册事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('http://ajax.frontend.itheima.net/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功');
        })
    })
    //登录注册表单事件
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            
            url: "http://ajax.frontend.itheima.net/api/login",
            method: 'POST',
            data: $(this).serialize(),

            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败');
                }
                layer.msg('登录成功')
                //将登录成功得到的 token 字符串，保存到localStorage里面
                localStorage.setItem('token', res.token)
                //console.log(res.token);
                // 跳转到后台主页
                 location.href = '/index.html'
            }
        });
    })
})

