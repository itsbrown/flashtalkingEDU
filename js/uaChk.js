var ua;
var m = "Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30";
var ismobile=navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);


function uaCheck ()
{
	this._userAgent = navigator.userAgent;
	if(ismobile)
	{
		ua = "mobile";
	}else{
		ua = "deskTop";
	}
}