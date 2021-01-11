$(function () {
    // 调用 getUserInfo
    getUserInfo()
    // 设置退出事件
    // layer 弹出层
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        // 提示用户是否确认退出
        layer.confirm('确定要退出么？', { icon: 3, title: '提示' },
            function (index) {
                // 清空本地存储中的token
                localStorage.removeItem('token')
                // 重新跳转到登录页面
                location.href = '/login.html'

                // 关闭询问框
                layer.close(index)
            })
    })
})
// 获取用户信息
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // header请求头
        header: {
            Authorization: localStorage.getItem('token')
        },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data)
        },
    })
}

// 调用用户的头像
function renderAvatar(user) {
    // 获取用户头像
    // 设置欢迎文本
    // 按需渲染用户头像
    var name = user.nickname || user.username

    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //用户有自定义头像则显示
    if (user.user_pic !== null) {
        // 3.1渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}