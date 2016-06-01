define(["/modules/static/js/session"], function(session) {

    var apiAuthInfo;

    //ajax proxy
    var AjaxProxy = function(options) {
        this.defaultOptions = {
            url: "",
            type: "GET",
            data: apiAuthInfo,
            dataType: "json",
            beforeSend: function() {
                $.showPreloader();
            },
            complete: function() {
                $.hidePreloader();
            }
        };
        //请求参数，依次覆盖：options(局部参数) > CONSTANT.AJAX_OPTIONS(全局设置) > defaultOpts(默认)
        //可以在 CONSTANT.AJAX_OPTIONS 中添加 headers,contentType等
        this.newOptions = CONSTANT && CONSTANT.AJAX_OPTIONS ? $.extend(true, {}, this.defaultOptions, CONSTANT.AJAX_OPTIONS, options) : $.extend(true, {}, this.defaultOptions, options);

    }
    AjaxProxy.prototype.ajax = function() {
        return $.ajax(this.newOptions);
    }

    //get and post proxy
    var GetAndPostProxy = function(options) {
        this.defaultOptions = {
            url: "",
            data: apiAuthInfo,
            dataType: "json"
        };
        //请求参数，依次覆盖：options(局部参数) > defaultOpts(默认)
        this.newOptions = $.extend(true, {}, this.defaultOptions, options)
    }

    GetAndPostProxy.prototype = {
        get: function() {
            return $.get(this.newOptions.url, this.newOptions.data, this.newOptions.dataType);
        },
        post: function() {
            return $.post(this.newOptions.url, this.newOptions.data, this.newOptions.dataType);
        }
    }

    function bublic(type, options) {

        if (options.url === '' || options.url == undefined || options.url == null) {
            console.error("Unknown Http Request : Cannot read property 'url' of undefined or '' ");
            return false;
        }
        //调用API时所需的认证信息，这里统一添加在data参数中
        //也可以在 CONSTANT.AJAX_OPTIONS 中添加(不推荐)
        apiAuthInfo = session.getApiAuthInfo();

        switch (type) {
            case "ajax":
                var ajaxProxy = new AjaxProxy(options);
                return ajaxProxy.ajax();
            case "get":
                var getAndPostProxy = new GetAndPostProxy(options);
                return getAndPostProxy.get();
            case "post":
                var getAndPostProxy = new GetAndPostProxy(options);
                return getAndPostProxy.post();
            default:
                return false;
        }


    }


    return {
        ajax: function(options) {
            return bublic('ajax', options);
        },
        get: function(url, data, dataType) {
            var options = {
                url: url,
                data: data,
                dataType: dataType ? dataType : "json"
            }
            return bublic('get', options);
        },
        post: function(url, data, dataType) {
            var options = {
                url: url,
                data: data,
                dataType: dataType ? dataType : "json"
            }
            return bublic('post', options);
        }
    }

});