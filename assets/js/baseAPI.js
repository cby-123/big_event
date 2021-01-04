$.ajaxPrefilter(function (options) {
    //再发起真正的AJAX每次调用

    options.url = "http://api-breakingnews-web.itheima.net" + options.url

    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || " "
        }
    }
})