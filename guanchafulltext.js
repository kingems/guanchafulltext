// --------------------------------------------------------------------
//
// ==UserScript==
// @name          观察者网全文显示
// @namespace     https://github.com/kingems/gczw
// @version       0.1.1
// @author        kingem(kingem@126.com)
// @description   观察者网全文显示
// @include       *://www.guancha.cn/*
// @grant         GM_xmlhttpRequest
// @run-at        document-end
// ==/UserScript==
//
// --------------------------------------------------------------------
(function(){
    var block=document.getElementsByClassName('last');
    if (block.length>1){
        var url = block[block.length-1].getAttribute("onclick");
        var start = 26;
        var len = url.length-start-2;
        url = "http://www.guancha.cn"+ url.substr(start,len);
        var contentblock = document.querySelectorAll('div.content')[1];
        var pageblock =document.querySelector('.module-page');
        pageblock.style.display="none";
        GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            overrideMimeType:"text/html;charset=utf-8",
            onload: function(response) {
                var reg=new RegExp("<div class=\"content all-txt\">([\\w\\W]*)<div class=\"share fix\">","igm");
                var r=response.responseText.match(reg);
                if(r!=null){
                    contentblock.innerHTML =  r;
                }
            }
       });
    }
})();
