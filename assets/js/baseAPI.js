// 注意：每次调用$.get()或$.post()或$.ajax()的时候，
// 会调用这个函数 ajaxPreFilter
$.ajaxPrefilter(function (options) {
    // 在发起真正的asjx请求之前，统一拼接请求的的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    // console.log(options.url);

    if (options.url.indexOf('/my/') !== -1) {
        // 统一设置有权限的接口，设置headers请求头
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }

        // 全局统一配置complete函数
        options.complete = function (res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 1.强制清空 token
                localStorage.removeItem('token')
                // 2.强制跳转到登录页面
                localStorage.href = '/login.html'
            }
        }
    }
})