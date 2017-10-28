// ==UserScript==
// @name        no ads & music download
// @namespace   vk_downloader
// @include     https://vk.com/*
// @version     1.0.4
// @updateURL	https://github.com/lugovov/vk_ext/raw/master/no_ads.user.js
// @grant       none
// @noframes
// ==/UserScript==
(function(){
    /*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
  var saveAs=saveAs||function(e){"use strict";if(typeof e==="undefined"||typeof navigator!=="undefined"&&/MSIE [1-9]\./.test(navigator.userAgent)){return}var t=e.document,n=function(){return e.URL||e.webkitURL||e},r=t.createElementNS("http://www.w3.org/1999/xhtml","a"),o="download"in r,a=function(e){var t=new MouseEvent("click");e.dispatchEvent(t)},i=/constructor/i.test(e.HTMLElement)||e.safari,f=/CriOS\/[\d]+/.test(navigator.userAgent),u=function(t){(e.setImmediate||e.setTimeout)(function(){throw t},0)},s="application/octet-stream",d=1e3*40,c=function(e){var t=function(){if(typeof e==="string"){n().revokeObjectURL(e)}else{e.remove()}};setTimeout(t,d)},l=function(e,t,n){t=[].concat(t);var r=t.length;while(r--){var o=e["on"+t[r]];if(typeof o==="function"){try{o.call(e,n||e)}catch(a){u(a)}}}},p=function(e){if(/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)){return new Blob([String.fromCharCode(65279),e],{type:e.type})}return e},v=function(t,u,d){if(!d){t=p(t)}var v=this,w=t.type,m=w===s,y,h=function(){l(v,"writestart progress write writeend".split(" "))},S=function(){if((f||m&&i)&&e.FileReader){var r=new FileReader;r.onloadend=function(){var t=f?r.result:r.result.replace(/^data:[^;]*;/,"data:attachment/file;");var n=e.open(t,"_blank");if(!n)e.location.href=t;t=undefined;v.readyState=v.DONE;h()};r.readAsDataURL(t);v.readyState=v.INIT;return}if(!y){y=n().createObjectURL(t)}if(m){e.location.href=y}else{var o=e.open(y,"_blank");if(!o){e.location.href=y}}v.readyState=v.DONE;h();c(y)};v.readyState=v.INIT;if(o){y=n().createObjectURL(t);setTimeout(function(){r.href=y;r.download=u;a(r);h();c(y);v.readyState=v.DONE});return}S()},w=v.prototype,m=function(e,t,n){return new v(e,t||e.name||"download",n)};if(typeof navigator!=="undefined"&&navigator.msSaveOrOpenBlob){return function(e,t,n){t=t||e.name||"download";if(!n){e=p(e)}return navigator.msSaveOrOpenBlob(e,t)}}w.abort=function(){};w.readyState=w.INIT=0;w.WRITING=1;w.DONE=2;w.error=w.onwritestart=w.onprogress=w.onwrite=w.onabort=w.onerror=w.onwriteend=null;return m}(typeof self!=="undefined"&&self||typeof window!=="undefined"&&window||this.content);if(typeof module!=="undefined"&&module.exports){module.exports.saveAs=saveAs}else if(typeof define!=="undefined"&&define!==null&&define.amd!==null){define("FileSaver.js",function(){return saveAs})}
  var makeid=function(len)
  {
    if(!len) len=5;
    var text = [];
    var possibleFirst = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_-0123456789";

    for( var i=0; i < len; i++ ){
       if(i===0)
        text.push(possibleFirst.charAt(Math.floor(Math.random() * possibleFirst.length)));
      else
        text.push(possible.charAt(Math.floor(Math.random() * possible.length)));
    }
    return text.join('');
  };
	var vk={}
	
	(function(t, e) {
	"use strict";
		function i() {
			return window.wbopen && ~(window.open + "").indexOf("wbopen")
		}

		function o(t) {
			if (!i() && ~t.indexOf("audio_api_unavailable")) {
				var e = t.split("?extra=")[1].split("#"),
					o = "" === e[1] ? "" : a(e[1]);
				if (e = a(e[0]), "string" != typeof o || !e) return t;
				o = o ? o.split(String.fromCharCode(9)) : [];
				for (var s, r, n = o.length; n--;) {
					if (r = o[n].split(String.fromCharCode(11)), s = r.splice(0, 1, e)[0], !l[s]) return t;
					e = l[s].apply(null, r)
				}
				if (e && "http" === e.substr(0, 4)) return e
			}
			return t
		}

		function a(t) {
			if (!t || t.length % 4 == 1) return !1;
			for (var e, i, o = 0, a = 0, s = ""; i = t.charAt(a++);) i = r.indexOf(i), ~i && (e = o % 4 ? 64 * e + i : i, o++ % 4) && (s += String.fromCharCode(255 & e >> (-2 * o & 6)));
			return s
		}

		function s(t, e) {
			var i = t.length,
				o = [];
			if (i) {
				var a = i;
				for (e = Math.abs(e); a--;) o[a] = (e += e * (a + i) / e) % i | 0
			}
			return o
		}
		Object.defineProperty(e, "__esModule", {
			value: !0
		}), e.audioUnmaskSource = o;
		var r = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMN0PQRSTUVWXYZO123456789+/=",
			l = {
				v: function(t) {
					return t.split("").reverse().join("")
				},
				r: function(t, e) {
					t = t.split("");
					for (var i, o = r + r, a = t.length; a--;) i = o.indexOf(t[a]), ~i && (t[a] = o.substr(i - e, 1));
					return t.join("")
				},
				s: function(t, e) {
					var i = t.length;
					if (i) {
						var o = s(t, e),
							a = 0;
						for (t = t.split(""); ++a < i;) t[a] = t.splice(o[i - 1 - a], 1, t[a])[0];
						t = t.join("")
					}
					return t
				},
				x: function(t, e) {
					var i = [];
					return e = e.charCodeAt(0), each(t.split(""), function(t, o) {
						i.push(String.fromCharCode(o.charCodeAt(0) ^ e))
					}), i.join("")
				}
			}
})(0, vk);
	
  var className=makeid(16+Math.ceil(Math.random()*16));
    var getLink=function(t){
	    return vk.audioUnmaskSource(t)
};
  var updateContent=function(element){
    try{
     if(element.toString()=='[object Text]')
       return;
     run(element,'ads_ad_box',remove);
     run(element,'trg-b-banner',remove);
     run(element,'_ads_promoted_post_data_w',remove);
     run(element,'audio_row',audio);
     if(element.className.match(/(^|\s)audio_row(\s|$)/))
      audio(element);
    }catch(e){console.log(e);}
  };
  var run=function(root,className,func){
    Array.prototype.forEach.call(root.getElementsByClassName(className),func);
  };
  var remove=function(element){
    element.parentNode.removeChild(element);
  };
  var link_style = 'position: absolute; width:18px; height:22px; right: -8px; top: 9px; color: black; z-index: 100; background: rgba(255,0,0,0.3); border-radius: 5px; padding: 0px 2px; font-size: 16px;text-align:center;';
  var download=function(event){
    try{
      var me =this;
      me.innerHTML=reloadText;
      event.stopPropagation();
      var id=me.parentNode.attributes['data-full-id'];
      if(id)
        id=id.value;
      var aud=me.parentNode.attributes['data-audio'];
      if(aud)
        aud=JSON.parse(aud.value);
      if(!id)
        id=aud[1]+'_'+aud[0];
      var title=aud[4].trim()+' - '+aud[3].trim();
      var url;
      if(aud[2])
        url=Promise.resolve(aud[2]);
      else{
        url=new Promise(function(d,e){
          var xhr = new XMLHttpRequest();
          xhr.open('POST', 'https://vk.com/al_audio.php', true);
          xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          xhr.onload = function(e) {
            if (this.status == 200) {
              var myBlob = this.response;
              var resp=myBlob.split('<!>');
              resp.forEach(function(txt){
               if(txt.substr(0,7)=='<!json>')
                 try{
                   var info=JSON.parse(txt.substr(7));
                   if(Array.isArray(info))
                     info.forEach(function(track){
                       if(track[1]+'_'+track[0]==id && track[2]){
                         title=track[4].trim()+' - '+track[3].trim();
                         d(getLink(track[2]));
                       }
                     });
                 }catch(e){
                   console.log(e);
                 }
              });
            }
          };
          xhr.send('act=reload_audio&al=1&ids='+id);
        });
      }
        url.then(function(link){
          me.innerHTML=saveText;
          var xhr = new XMLHttpRequest();
          xhr.open('GET', link, true);
          xhr.responseType = 'blob';
          xhr.onload = function(e) {
            if (this.status == 200) {
              var myBlob = this.response;
              saveAs(myBlob,title+'.mp3');
              me.innerHTML=okText;
            }
          };
          xhr.send();
        });
      return false;
    }catch(e){
      console.log(e);
    }
  };
  var downText='&#8681;';
  var reloadText='&#8986;';
  var saveText='&#128190;';
  var okText='&#10003';
  var audio=function(element){
    try{
     var exists=element.getElementsByClassName(className).length>0;
     if(exists)
       return true;
     var title=element.getElementsByClassName('audio_row__performer_title');
     if(title.length>0){
       title=title[0].textContent.match(/.+\n.+/)[0].trim().replace('\n', ' – ').replace(/\"/g, '\'').replace(/\s{2,}/,' ');  //"
     }else{
       title='undefined';
     }
    var a=document.createElement('a');
      a.innerHTML=downText;
    a.style=link_style;
    a.title='Скачать';
    a.className=className;
    a['data-track_name']=title;
    a.onclick=download;
    element.appendChild(a);
    }catch(e){console.log(e);}
  };
  var observer;
  observer&&observer.disconnect();
  observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(element){
      element.addedNodes.forEach(updateContent);
    });
  });
  observer.observe(document.body, { childList: true, subtree:true });
  updateContent(document.body);
    var style=document.createElement('style');
    style.innerHTML='#ads_left{opacity:0;visibility: hidden;}';
    document.head.appendChild(style);
})();
