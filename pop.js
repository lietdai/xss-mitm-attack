//changed by lietdai@gmail.com
var $=function(i){return document.getElementById(i)};
function replay(){
    var url = this.dataset.url;
    var cookie = this.dataset.cookie;
    var ua = this.dataset.ua;
    localStorage.setItem('ua',ua);
	var data={};
	var subdomain = (function(url){
		var a = document.createElement('a');
		a.href=url;
		var link = a.hostname.split('.');
		if(link.length>2)
			return link.slice(1).join('.');
		else
			return a.hostname;
	})(url);
	cookie.split(';').forEach(function(o){var d=o.replace(/\s*/,'').split('=');data[d[0]]=d[1]});
	for(var k in data){
		chrome.cookies.set({url:url,name:k,value:data[k],domain:subdomain,path:'/'});
	}
	open(url);
}

function render(cookies){
	var list = document.getElementById('list');
	for(var i=0,x,html='';x=cookies[i];i++){
		x.desc_url=x.url.length>75?x.url.substr(0,75):x.url;
        html+="<li><a title=':{url}' data-url=\":{url}\" data-ua=\":{ua}\" href='javascript:;' data-cookie=\":{cookie}\">:{desc_url}</a></li>".replace(/:{\w+}/ig,function(k){return x[k.substring(2,k.length-1)]});
			
		//html+="<li><a title=':{url}' href='javascript:void(0)' onclick=\"replay(this.dataset.url,this.dataset.cookie)\" data-url=\":{url}\" data-cookie=\":{cookie}\">:{desc_url}</a></li>".replace(/:{\w+}/ig,function(k){return x[k.substring(2,k.length-1)]});
	}
	list.innerHTML=html;
    var btn = document.getElementsByTagName("a");
    for(var i=0;i<btn.length;i++){
        //list[i].addEventListener('click',replay(list[i].dataset.url,list[i].dataset.cookie));
        btn[i].addEventListener('click',replay);
    }

}
$('f').onsubmit=function(){
	localStorage.clear();
	localStorage.setItem('xsser',$('xsser').value);
	if($('xsser').value){
		chrome.extension.getViews()[0].load();
	}

}
xsser.value=localStorage.getItem('xsser');
render(JSON.parse(localStorage.getItem('data')));
