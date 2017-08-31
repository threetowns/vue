import 'assets/js/info';
import axios from 'axios';
import Storage from 'assets/js/storage';

var imitationQuery = {
  /**
   * 封装axios，减少学习成本，参数基本跟jq ajax一致
   * @param {String} type			请求的类型，默认post
   * @param {String} url			请求地址
   * @param {String} time			超时时间
   * @param {Object} data			请求参数
   * @param {String} dataType		预期服务器返回的数据类型，xml html json ...
   * @param {Object} headers		自定义请求headers
   * @param {Function} success	请求成功后，这里会有两个参数,服务器返回数据，返回状态，[data, res]
   * @param {Function} error		发送请求前
   * @param return
   */
  ajax: function(opt) {
    var opts = opt || {};
    if(!opts.url) {
      alert('请填写接口地址');
      return false;
    };
    var axiosArguments = {
      method: opts.type || 'post',
      url: opts.url,
      headers: opts.headers || {
        'Content-Type': 'application/json'
      },
      // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
      // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
      baseURL: (opts.baseURL != undefined) ? opts.baseURL : '',
      timeout: opts.time || 10 * 1000,
      responseType: opts.dataType || 'json'
    };
    if(axiosArguments.method == 'post' || axiosArguments.method == 'POST') {
      axiosArguments.data = opts.data || null
    } else {
      axiosArguments.params = opts.data || null
    };

    axios(axiosArguments).then(function(res) {
      if(res.status == 200) {
        if(opts.success) {
          opts.success(res.data, res);
        }
      } else {
        if(data.error) {
          opts.error(error);
        } else {
          alert('好多人在访问呀，请重新试试[timeout]1');
        }
      }
    }).catch(function(error) {
      console.log(error);
      if(opts.error) {
        opts.error(error);
      } else {
        alert('好多人在访问呀，请重新试试[timeout]2');
      }
    });

  },
  get: function(url, ...arg) {
    var opts = {
      'type': "get",
    };
    if(url != undefined) {
      opts.url = url;
      for(var i = 0; i < arg.length; i++) {
        if(typeof arg[i] == 'object') {
          opts.data = arg[i];
        };
        if(typeof arg[i] == 'function') {
          opts.success = arg[i];
          opts.error = arg[i];
        };
        if(typeof arg[i] == 'string') {
          opts.dataType = arg[i];
        };
      };
    }
    this.ajax(opts)
  },
  post: function(url, ...arg) {
    var opts = {
      'type': "post",
    };
    if(url != undefined) {
      opts.url = url;
      for(var i = 0; i < arg.length; i++) {
        if(typeof arg[i] == 'object') {
          opts.data = arg[i];
        };
        if(typeof arg[i] == 'function') {
          opts.success = arg[i];
          opts.error = arg[i];
        };
        if(typeof arg[i] == 'string') {
          opts.dataType = arg[i];
        };
      };
    }
    this.ajax(opts)
  },
  query: function(_dom) {
    return document.querySelectorAll(_dom);
  },
  /*获取样式*/
  css: function(_dom, _style) {
    var __style = getComputedStyle(_dom, false)[_style];
    if(__style.indexOf('px') != -1) {
      __style = parseFloat(__style)
    };
    return __style;
  },
  /*判定是否类数组，如节点集合，纯数组，arguments与拥有非负整数的length属性的纯JS对象*/
  isArrayLike: function(obj) {
    if(!obj)
      return false
    var n = obj.length
    if(n === (n >>> 0)) { //检测length属性是否为非负整数
      var type = serialize.call(obj).slice(8, -1)
      if(/(?:regexp|string|function|window|global)$/i.test(type))
        return false
      if(type === "Array")
        return true
      try {
        if({}.propertyIsEnumerable.call(obj, "length") === false) { //如果是原生对象
          return /^\s?function/.test(obj.item || obj.callee)
        }
        return true
      } catch(e) { //IE的NodeList直接抛错
        return !obj.window //IE6-8 window
      }
    }
    return false
  },
  /*遍历数组与对象,回调的第一个参数为索引或键名,第二个或元素或键值*/
  each: function(obj, fn) {
    var That = this;
    if(obj) { //排除null, undefined
      var i = 0
      if(That.isArrayLike(obj)) {
        for(var n = obj.length; i < n; i++) {
          if(fn(i, obj[i]) === false)
            break
        }
      } else {
        for(i in obj) {
          if(obj.hasOwnProperty(i) && fn(i, obj[i]) === false) {
            break
          }
        }
      }
    }
  },
  /**
   * 获取url传过来的参数
   * @param name 	获取的参数
   * @param Url 		自定义获取参数的链接
   * @param return
   */
  getUrlQuery: function(name, Url) {
    //URL GET 获取值
    var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i"),
      url = Url || location.href;　　
    if(reg.test(url)) {　　
      return unescape(RegExp.$2.replace(/\+/g, " "));　　
    }
    return "";

  },
  cookie: Storage.cookie,
  store: Storage.store,
};
export default imitationQuery;