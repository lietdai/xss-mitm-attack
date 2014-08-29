//create by sogili(@jackmasa)
//changed by lietdai@gmail.com
plugin.removeAttribute('href');
plugin.removeAttribute('download');
plugin.childNodes[0].innerHTML='XSSER';
plugin.onclick=function(){
	var auth = document.body.innerHTML.match(/http:\/\/code4liet.duapp.com\/do\/auth\/\w+/)[0];
	var domain = (function(){var o={};location.search.replace(/\?/g,'').split('&').map(function(s){s.replace(/(.+)=(.*)/,function($,p,v){o[p]=v})});return o})().domain||'';
	domain&&(auth+='/domain/'+domain);
	chrome.extension.sendMessage(auth);
}