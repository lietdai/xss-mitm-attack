xss-mitm-attack
===============

a chrome extension for xss attack

##前言
修改后的拓展符合manifest 2.0的规范，而且能够同时劫持cookie&用户浏览器的User-Agent（有些网站的加密cookie是跟当前用户浏览器ua相关的所以我们希望达到的时完全模拟用户的会话请求）

##接口json返回示例

	[
	    {
	        "url": "http://xx.xxx.com/",
	        "cookie": "asd=adasdasd;",
	        "ua": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36"
	    },
	    {
	        "url": "http://asd.asdasdasd.com/",
	        "cookie": "backauthv20=asdasd; login_log_date_449=1408079402",
	        "ua": "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.101 Safari/537.36"
	    }
	]
