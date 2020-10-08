// http://maree.info
(mareeinfo=(window.mareeinfo||{})).versionTools='2.02';
var undef,CR="\n";

function ReturnFalse(){return false;}
function ReturnTrue(){return true;}
function ifv(v,d){return v?v:d}
function isdef(v){return typeof v!='undefined';}
function ifdef(v,d){return typeof v!='undefined'?v:d;}
function isnum(v){return typeof v=='number';}
function ifnum(v,d){return typeof v=='number'?v:d;}
function ifminmax(v,mi,ma,d){v=ifnum(v,ifnum(d,mi));return Math.min(Math.max(mi,v),ma);}
function isstr(v){return typeof v=='string';}
function ifstr(v,d){return typeof v=='string'?v:d;}
function strlen(v){return typeof v=='string'?v.length:0;}
function ifstrlen(v,d,l){return typeof v=='string'&&v.length>_int(l,0)?v:d;}
function ifnull(v,d){return v!==null?v:d;}
function isobj(v){return typeof v=='object'&&v!==null;}
function ifobj(v,d){return typeof v=='object'&&v!==null?v:d;}
function isobjlen(v){return typeof v=='object'&&v!==null&&isnum(v.length);}
function ifobjlen(v,d){return typeof v=='object'&&v!==null&&v.length>0?v:d;}
function isfunc(f){return typeof f=='function';}
function iffunc(f,d){return typeof f=='function'?f:(typeof d=='function'?d:ReturnFalse);}
function ifmatch(v,r,d,ret){if(r=(''+v).match(r))return isdef(ret)&&ret!==false?(ret===true?true:(isnum(ret)?r[ret]:r)):v;return d;}
function _int(i,d){return isNaN(i=parseInt(''+i,10))?ifdef(d,0):i;}
function _float(f,d){return isNaN(f=parseFloat((''+f).replace(',','.')))?ifdef(d,0):f;}
function round(f,n){n=10*ifnum(n,0);f=_float(f);return n==0?Math.round(f):(Math.round(f*n)/n);}
function round_pas(f,p,n){f=Math.floor(_float(f)/p)*p;return isdef(n)?round(f,n):f;}
function dechex(d){return d.toString(16);}
function hexdec(h){return isNaN(h=parseInt(h,16))?0:h;} 
function f0(s,l){s=''+s;while(s.length<l)s='0'+s;return s;}
function trim(s){return (typeof s=='string')?s.replace(/^[\t\n\r ]+/g,'').replace(/[\t\n\r ]+$/g,''):'';}
function _a(a,i,d){return a!==null&&typeof a=='object'?ifdef(a[i],d):d;}
function inA(v,a,r,s,d){if(a!==null&&typeof a=='object')for(var k in a)if(s?a[k]===v:a[k]==v)return r?k:true;return ifdef(d,false);}
function strtr(s,a,b){var r='',i,j,c;for(i=0;i<s.length;i++){if((j=a.indexOf(c=s.charAt(i),0))>=0)c=b.charAt(j);r+=c;}return r;}

function time() {return (new Date()).getTime();}

function txtsort(s){return strtr(strtr(s,'ÀÁÂÃÄÅàáâãäåÇçÈÉÊËèéêëÌÍÎÏìíîïÑñÒÓÔÕÖòóôõöØøÙÚÛÜùúûüÝýÿ','aaaaaaaaaaaacceeeeeeeeiiiiiiiinnoooooooooo00uuuuuuuuyyy').toUpperCase(),'0123456789','abcdefghij').replace(/[^a-zA-Z]+/g,'');}
function isOpt(o,os){return (' '+os+' ').indexOf(' '+o+' ')>=0;}
function s2p(s){s=s.toLowerCase().split(/-/);for(var i=1;i<s.length;i++)s[i]=s[i].charAt(0).toUpperCase()+s[i].substr(1);return s.join('');}

function $(id){return (typeof id=='string')?document.getElementById(id):id;}
function $tag(e,t,i){e=$(e);if(e){var a=e.getElementsByTagName(t);if(isnum(i))return(i>=0&&i<a.length)?a[i]:null;return a;}return null;}
function $id(e,r,ret,d){e=$(e);if(e&&strlen(e.id)&&(r=e.id.match(r)))return isdef(ret)?(ret!==null&&ret>=0?r[ret]:r):e.id;return ifdef(d,false);}
function $c(t,id,cn,p,s,html){var e=document.createElement(t);if(isstr(id))e.id=id;if(isstr(cn))e.className=cn;if(isstr(html))e.innerHTML=html;return (p=$(p))?(s||isstr(s)?p.insertBefore(e,$(s)):p.appendChild(e)):e;}
function $cne(t,id,cn,p,s,html){var e=$(id);if(!e)return $c(t,id,cn,p,s,html);if(isstr(cn))e.className=cn;if(isstr(html))e.innerHTML=html;return e;}
function $d(e,cn){return (e=$(e))&&e.parentNode&&(!isdef(cn)||$cn(e,cn))?e.parentNode.removeChild(e):null;}
function $evT(ev){if(ev&&ev.target)return ev.target; if(ev&&ev.srcElement)return ev.srcElement;return null;}
function $evRT(ev){if(ev&&ev.relatedTarget)return ev.relatedTarget; if(ev&&ev.toElement)return ev.toElement;return null;}
function $gHTML(e,s){return(e=$(e))?e.innerHTML:s;}
function $sHTML(e,s){if(e=$(e))e.innerHTML=s;return e;}
function $ltwh(e,l,t,w,h){if(e=$(e)){if(isdef(l))e.style.left=ifstr(l,Math.round(l)+'px');if(isdef(t))e.style.top=ifstr(t,Math.round(t)+'px');if(isdef(w))e.style.width=ifstr(w,Math.round(w)+'px');if(isdef(h))e.style.height=ifstr(h,Math.round(h)+'px');}return e;}
function $width(e,d){if(e=$(e))return e.getBoundingClientRect?(e=e.getBoundingClientRect()).right-e.left:e.offsetWidth;return ifdef(d,null);}
function $height(e,d){if(e=$(e))return e.getBoundingClientRect?(e=e.getBoundingClientRect()).bottom-e.top:e.offsetHeight;return ifdef(d,null);}
function $top(e){if((e=$(e))&&e.getBoundingClientRect)return clientT()+e.getBoundingClientRect().top-(clientT()+document.body.getBoundingClientRect().top);var t=e.offsetTop+_int(e.clientTop);while(e=e.offsetParent)t+=e.offsetTop+_int(e.clientTop);return t;}
function $left(e){if((e=$(e))&&e.getBoundingClientRect)return clientL()+e.getBoundingClientRect().left-(clientL()+document.body.getBoundingClientRect().left);var l=e.offsetLeft+_int(e.clientLeft);while(e=e.offsetParent)l+=e.offsetLeft+_int(e.clientLeft);return l;}
function $bottom(e){return (e=$(e))?$top(e)+e.offsetHeight:0;}
function $right(e){return (e=$(e))?$left(e)+e.offsetWidth:0;}
function $evL(e,ev,fct,unreg,c){var i,ev=ev.split(/[ ,]+/);if(e=$(e))for(i=0;i<ev.length;i++)if(strlen(ev[i]=ev[i].replace(/^on/i,''))){if(unreg){if(e.removeEventListener)e.removeEventListener(ev[i],fct,!!c);else if(e.detachEvent)e.detachEvent('on'+ev[i],fct);}else if(e.addEventListener)e.addEventListener(ev[i],fct,!!c);else if(e.attachEvent)e.attachEvent('on'+ev[i],fct);}}
function $evS(ev){if(ev)ev.cancelBubble=true;if(ev&&ev.stopPropagation)ev.stopPropagation();}
function $cn(e,c){return ((e=$(e))&&e.className)?e.className.match(new RegExp('(^| )('+c+')( |$)','i')):false;}
function $cnA(e,c){if((e=$(e))&&!$cn(e,c))e.className=(e.className+' '+c).replace(/ +/g,' ').replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g,'');return e;}
function $cnR(e,c,g){if((e=$(e))&&strlen(e.className)&&(g=new RegExp(g?c:' ('+c+') ','gi'))&&(c=' '+e.className+' ').match(g))e.className=c.replace(/ /g,'  ').replace(g,' ').replace(/ +/g,' ').replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g,'');return e;}
function $cnT(e,c,t){if(e=$(e)){if(!t)t=$cn(e,c)?-1:1;return t<0?$cnR(e,c):$cnA(e,c);}return e;}
function $sa(e,a,v){if(e=$(e))e.setAttribute(a,v);return e;}
function $ga(e,a,d){return ifnull((e=$(e))?e.getAttribute(a):null,ifdef(d,null));}

function $gs(e,s,d) {if(e=$(e))if(window.getComputedStyle)return window.getComputedStyle(e,null).getPropertyValue(s);else if(e.currentStyle) return e.currentStyle[s2p(s)];else return e.style[s2p(s)];return d;}
function $s(e,s,v,x){if(e=$(e)){if(!x)x=false;else if(strlen(x=cssPrefix(e,s,x)))s=x+s.charAt(0).toUpperCase()+s.substr(1);if(strlen(s)&&isdef(x))e.style[s]=v;}return e;}
function $sOP(e,o){if((e=$(e))&&e.filters)e.style.filter="progid:DXImageTransform.Microsoft.alpha("+(o>=1?"enabled='false'":"opacity:"+Math.round(o*100))+")";if(e)with(e.style){KHTMLOpacity=o;MozOpacity=o;opacity=o;}return e;}
function $sSH(e,s){if(e=$(e))e.style.display=(typeof s=='string')?s:(s?'':'none');return e;}
function $sVH(e,v){if(e=$(e))e.style.visibility=(typeof v=='string')?v:(v?'':'hidden');return e;}
function $fb(e,fb){if(e=$(e))if(fb)e.focus();else e.blur();return e;}

function $pz(e){var z=0;if(e=$(e))while((e=e.parentNode)&&(e.style)&&!(z=_int($gs(e,'z-index'))));return z;}
function $pn(e,t){e=$(e);if(e&&e.nodeType)while((e=e.parentNode)&&e.tagName)if(!t||e.tagName.toUpperCase()==t.toUpperCase())return e;return null;}
function $pid(e,id,ret){var r;if(e=$(e))do{if(e&&e.nodeType&&e.tagName&&strlen(e.id)&&(r=e.id.match(id)))return isdef(ret)?(ret!==null&&ret>=0?r[ret]:r):e;}while((e=e.parentNode)&&e.tagName&&e.nodeType);return null;}
function $pcn(e,cn,t,ret){var r;if(e=$(e))do{if(e&&e.nodeType&&e.tagName&&(!t||e.tagName.toUpperCase()==t.toUpperCase())&&(r=$cn(e,cn)))return isdef(ret)?(ret!==null&&ret>=0?r[ret]:r):e;}while((e=e.parentNode)&&e.tagName&&e.nodeType);return null;}
function $isChild(p,c,r){p=$(p);c=$(c);if(!p||!c||!c.nodeType)return false;r=ifdef(r,true);if(p==c)return r;while(c.parentNode)if((c=c.parentNode)==p)return r;return false;}
function $clean(p,t){var e,e2;if(!t)t=1;if((p=$(p))&&(e=p.firstChild))while(e){e2=e.nextSibling;if(e.nodeType&&(typeof t=='object'?inA(e.nodeType,t):(e.nodeType!=t)))p.removeChild(e);e=e2;}return p;}
function $child(p,n){return (p=$(p))&&p.hasChildNodes?p.childNodes[ifnum(n,0)]:null;}
function $n(e){var i,c=(e=$(e))&&e.parentNode&&e.parentNode.childNodes;if(c)for(i=0;i<c.length;i++)if(e==c[i])return i;return -1;}
function $ccn(p,cn,ret){var i,r,e;if((p=$(p))&&p.hasChildNodes)for(i=0;i<p.childNodes.length;i++)if((e=p.childNodes[i])&&e.nodeType&&e.tagName&&(r=$cn(e,cn)))return isdef(ret)?(ret!==null&&ret>=0?r[ret]:r):e;return null;}
function $cid(p,r,ret){var i,e,r2;if((p=$(p))&&p.hasChildNodes)for(i=0;i<p.childNodes.length;i++)if((e=p.childNodes[i])&&e.nodeType&&e.tagName&&(r2=$id(e,r,ret)))return r2;return null;}

function CSS(s,x,p,id){var e=document.createElement(x?'link':'style');e.type='text/css';if(x){e.rel='stylesheet';e.href=s;}else if(e.styleSheet)e.styleSheet.cssText=s;else e.appendChild(document.createTextNode(s));if(id&&(id=$(e.id=id))&&!p)p=id.parentNode;p=$(p)||document.getElementsByTagName('head')[0];return id?p.replaceChild(e,id):p.appendChild(e);}
function JS(src,a,p,id,c){var e=document.createElement('script');e.type='text/javascript';if(id)id=$(e.id=id);if(src)e.src=src;if(c)e.text=c;e.async=!!a;p=$(p)||document.getElementsByTagName('head')[0];return id?p.replaceChild(e,id):p.appendChild(e);}

function $at(x,y){if(!document.elementFromPoint)return false;if(clientL()>0&&!document.elementFromPoint(-1,0))x-=clientL();if(clientT()>0&&!document.elementFromPoint(0,-1))y-=clientT();return document.elementFromPoint(x,y);}

function clientL(){if(isdef(window.pageXOffset))return window.pageXOffset;if(isdef(window.scrollX))return window.scrollX;var e;if((e=(document.documentElement||document.body.parentNode||document.body))&&isnum(e.scrollLeft))return e.scrollLeft;return 0;}
function clientT(){if(isdef(window.pageYOffset))return window.pageYOffset;if(isdef(window.scrollY))return window.scrollY;var e;if((e=(document.documentElement||document.body.parentNode||document.body))&&isnum(e.scrollTop)) return e.scrollTop;return 0;}
function clientW(){if(window.innerWidth)return window.innerWidth;if(document.documentElement)return document.documentElement.clientWidth;if(document.body)return document.body.clientWidth;return 0;}
function clientH(){if(window.innerHeight)return window.innerHeight;if(document.documentElement)return document.documentElement.clientHeight;if(document.body)return document.body.clientHeight;return 0;}

function scrollT(){return document.body.scrollTop||document.documentElement.scrollTop;} 
function scrollL(){return document.body.scrollLeft||document.documentElement.scrollLeft;} 

function docW(){return document.documentElement?document.documentElement.scrollWidth:Math.max(document.body.scrollWidth,document.body.offsetWidth);}
function docH(){return Math.max(clientT()+clientH(),document.documentElement?document.documentElement.scrollHeight:Math.max(document.body.scrollHeight,document.body.offsetHeight));}

function curL(ev){if(ev.pageX)return ev.pageX;if(ev.clientX)return ev.clientX+clientL();return 0;}
function curT(ev){if(ev.pageY)return ev.pageY;if(ev.clientY)return ev.clientY+clientT();return 0;}

function ieF(e,en){if((e=$(e))&&e.filters)for(var i=0;i<e.filters.length;i++)e.filters.item(i).enabled=!!en;}

function cssPrefix(e,s,x,r){if(e=($(e)||document.body)){s=s||'boxShadow';if(isstr(e.style[s]))return r?s:'';s=s.charAt(0).toUpperCase()+s.substr(1);if(!isobj(x))x=['webkit','Moz','Ms','O'];for(var i in x)if(isstr(e.style[x[i]+s]))return x[i]+(r?s:'');}return undef;}
function cssPrefixProp(s,x){return strlen(x)?x+s.charAt(0).toUpperCase()+s.substr(1):s;}
function cssTransition(e,s,x){if((e=$(e)||document.body)&&e.addEventListener&&isstr(x=cssPrefix(e,'transition',x)))return strlen(s)?cssPrefixProp(s,x):x;return undef;}
function $evTransition(e,fct,unreg){if((e=$(e))&&e.addEventListener&&fct)for(var i=0,ev=['transitionEnd','transitionend','webkitTransitionEnd','oTransitionEnd'];i<ev.length;i++)unreg?e.removeEventListener(ev[i],fct,false):e.addEventListener(ev[i],fct,false);}

function cssRuleX(s,v,x){var r='';if(isstr(x))x=[x];else if(!isobj(x))x=['webkit','moz','ms','o',''];for(var i in x)r+=(strlen(x[i])?'-'+x[i]+'-':'')+s+':'+v+';';return r;}
function cssRuleFilter(f,v){return (document.body&&document.body.filters)?'filter: '+((!f||f=='none')?'none':(' progid:DXImageTransform.Microsoft.'+f+'('+((v===true||!v)?'enable='+(v?'true':'false'):v)+')'))+';':'';}

function cssRuleLinearGradiant(c1,c2,noie)
{
 var s = 'background-image: -webkit-gradient(linear, left top, left bottom, from(__1), to(__2));' 
       + 'background-image: -webkit-linear-gradient(top, __1, __2);' 
       + 'background-image:    -moz-linear-gradient(top, __1, __2);' 
       + 'background-image:     -ms-linear-gradient(top, __1, __2);' 
       + 'background-image:      -o-linear-gradient(top, __1, __2);' 
       + (ifdef(noie,true)?cssRuleFilter('gradient','startColorstr="__1",endColorstr="__2",GradientType=0'):'')
       + 'background-image:         linear-gradient(top, __1, __2);';
 return s.replace(/__1/g,c1).replace(/__2/g,c2);
}

function cssRuleBackgroundSize(x,y){return cssRuleX('background-size',x=='cover'||x=='containt'?x:ifdef(x,'auto')+' '+ifdef(y,'auto'));}

function selChild(p,sel,c,n,reg){var e,i,r;if((p=$(p))&&p.hasChildNodes())for(i=0,reg=new RegExp('_('+ifdef(reg,'[0-9]+')+')$','');i<p.childNodes.length;i++)if((e=p.childNodes[i])&&e.id&&(r=reg.exec(e.id)))$cnT(e,c||'Selected',isdef(sel)&&sel!==null&&(sel=='*'||(!n&&sel.toString()==r[1])||(n&&sel.toString()!=r[1]))?1:-1);}


//---

function $qHTMLr( xid )
{
 var x = window.$qHTML_&&window.$qHTML_[xid];
 if( x && x.x && x.x.readyState == 4 )
      {
       if(x.x.status==200)$sHTML($cnR(x.e,'((Load|Update)Flag)|Loading|Updating'),x.x.responseText)&&x.f&&x.f(x.e);
       window.$qHTML_[xid]=x.x=x.e=x.f=null;
      }
 x = null;
}

function $qHTML( e, u, f, sync )
{
 var xid=-1, x={'e':$(e),'x':window.XMLHttpRequest && new XMLHttpRequest(),'f':f};
 if(!x.e||!x.x) return false;
 (window.$qHTML_||(window.$qHTML_=[]))[xid=window.$qHTML_.length]=x;
 x.x.onreadystatechange=!sync?new Function('$qHTMLr('+xid+')'):null;
 with(x.x){open('GET',u,!sync);setRequestHeader('Accept','text/html');send(null);}
 if(sync)$qHTMLr(xid);
 x=null;return true;
}

// -----------------------------------------------------------------------------

function selectValue(s,v){if(!(s=$(s))||!s.options)return false;if(!isdef(v))return s.options[s.selectedIndex].value;for(var i=0;i<s.options.length;i++)if(s.options[i].value==''+v)return s.selectedIndex=i;}

// -----------------------------------------------------------------------------

function QSj(qs,p,v){while(qs.charAt(0)=='?')qs=qs.substr(1);for(var i=1;i<QSj.arguments.length;i+=2)qs+='&'+QSj.arguments[i]+'='+encodeURIComponent(QSj.arguments[i+1]);return (qs=qs.replace(/^&*/,'')).length?'?'+qs:'';}
function QS(qs,p,v){while(qs.charAt(0)=='?')qs=qs.substr(1);if(qs.length&&qs.charAt(0)!='&')qs='&'+qs;for(var i=1;i<QS.arguments.length;i+=2)qs=qs.replace(new RegExp('&'+QS.arguments[i].replace(/([.*+?^${}()|[\]\/\\])/g,'\\$1')+'=[^&]*','g'),'')+'&'+QS.arguments[i]+'='+encodeURIComponent(QS.arguments[i+1]);v=/&[^=]+=(&|$)/;do{p=qs;qs=qs.replace(v,'$1');}while(p!=qs);return qs.length?'?'+qs.substr(1):'';}
function QSu(u){var i;if((u=(u=ifstr(u,ifstr(u&&u.href,''))).replace(/#[^!]*!/,u.indexOf('?')<0?'?':'&')).indexOf('?')<0)return '';if((i=u.indexOf('#'))>=0)u=u.substr(0,i);while((i=u.indexOf('?'))>=0)u=u.substr(i+1);return u.length?'?'+u:'';}
function QSr(l,qs){l=ifobj(l,{'href':ifstr(l,'')});return l.href=l.href.replace(/[?#].*/g,'')+QSu(qs);}
function QSm(l,qs2){var i,j,k,qs=QSu(l=ifobj(l,{'href':ifstr(l,'')}));for(i=1;i<QSm.arguments.length;i++)for(j=0,qs2=QSu(QSm.arguments[i]).substr(1).split('&');j<qs2.length;j++)if((k=qs2[j].indexOf('='))>0)qs=QS(qs,qs2[j].substr(0,k),decodeURIComponent(qs2[j].substr(k+1)));return QSr(l,qs);}
function QSc(l){return QSr(l,QSm('',QSu(l)));}
function QSa(u,r){var i=0,k,a={};for(u=QSu(u).substr(1).split('&');i<u.length;i++)if((k=u[i].indexOf('='))>0&&(!r||u[i].substr(0,k).match(r)))a[u[i].substr(0,k)]=decodeURIComponent(u[i].substr(k+1));return a;}
function QSv(u,p,d,r,ret){var res;u=QSa(u,p);for(p in u)if(!r)return ifdef(u[p],d);else if(isdef(u[p])&&(res=u[p].match(r)))return isdef(ret)?(ret!==null&&ret>=0?res[ret]:res):u[p];return d;}
function UQSH(l,p,v,ha)
{
 var u,q='',h='',hq='',i;
 u=(l=ifobj(l,{'href':ifstr(l,'')})).href;
 if((i=u.indexOf('#'))>=0){h=u.substr(i);u=u.substr(0,i);if((i=h.indexOf("!"))>0){hq=QSu('?'+h.substr(i+1));h=h.substr(0,i);}}
 if((i=u.indexOf('?'))>=0){q=QSu(u.substr(i));u=u.substr(0,i);}
 for(i=1;i<UQSH.arguments.length;i+=3){p=UQSH.arguments[i];v=ifdef(UQSH.arguments[i+1],'');ha=ifdef(UQSH.arguments[i+2],0);q=QS(q,p,ha?'':v);hq=QS(hq,p,ha?v:'');}
 if(hq.length)hq=(h.length?'!':'#!')+hq.substr(1);
 return l.href=u+q+h+hq;
}

// -----------------------------------------------------------------------------

function KI(n,v,x,p,d,s){var xp=new Date();xp.setTime(xp.getTime()+(x=_int(x)*1000));document.cookie=n+'='+encodeURIComponent(v)+(x?';expires='+xp.toUTCString():'')+(p?';path='+p:'')+(d?';domain='+d:'')+(s?';secure':'');} 
function KId(n,p,d){KI(n,'',(new Date()).getTime()-86400*1000,p,d);} 
function KIa(r){var i=0,c=document.cookie.split(';'),k,n,a={};for(i=0;i<c.length;i++)if((k=c[i].indexOf('='))>0&&strlen(n=trim(c[i].substr(0,k)))&&(!r||n.match(r)))a[n]=decodeURIComponent(c[i].substr(k+1));return a;}
function KIv(p,d,r,ret){var res,c=KIa(p);for(p in c)if(!r)return ifdef(c[p],d);else if(isdef(c[p])&&(res=c[p].match(r)))return isdef(ret)?(ret!==null&&ret>=0?res[ret]:res):c[p];return d;} 

// -----------------------------------------------------------------------------

function YM( ym, off )
{
 var y,m; ym=''+ym; if(!(off=_int(off)))return _int(ym.substr(0,6));
 y=_int(ym.substr(0,4)); m=_int(ym.substr(4,2));
 do{m+=(off>0?1:-1);if(m<1){m=12;y--}else if(m>12){m=1;y++;}}while(off-=(off>0?1:-1));
 return _int(''+y+(m<10?'0':'')+m);
}

// -----------------------------------------------------------------------------

function TW(u,s){return window.open('http://twitter.com/share?url='+encodeURIComponent(u)+'&text='+encodeURIComponent(s),'_blank','width=550,height=450,directories=no,location=no,menubar=no,resizable=yes,scrollbars=yes,status=yes,toolbar=no');}
function APIplusone(a,x) {return null;}
function FBLike(u,w,h,fblayout,fbcolor){return'<iframe src="http://www.facebook.com/plugins/like.php?href='+encodeURIComponent(u)+'&amp;layout='+ifstr(fblayout,'standard')+'&amp;show_faces=false&amp;width='+ifnum(w,350)+'&amp;action=like&amp;colorscheme='+ifstr(fbcolor,'light')+'&amp;height='+ifnum(h,35)+'&amp;locale=fr_FR" scrolling="no" frameborder="0" allowTransparency="true"></iframe>';}

function GAEV(ev,l,f) {if(window._gaq)_gaq.push(['_trackEvent',ev,l,ifdef(f,window.location.pathname+window.location.search)]);}
function GAL(l,f) {GAEV('Lien',l,f);}
function GAV(l,f) {GAEV('Video',l,f);}

function TWWJS(e,a){var d=document,id='twitter-wjs';if(!d.getElementById(id)){var s='script',fjs=d.getElementsByTagName(s)[0],js=d.createElement(s);js.id=id;if(a)js.async=true;js.src=(/^http:/.test(d.location)?'http':'https')+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}else if(window.twttr && window.twttr.widgets && window.twttr.widgets.load)(e=$(e))?window.twttr.widgets.load(e):window.twttr.widgets.load();}

function TWHREF(t,r,l){return 'https://twitter.com/intent/tweet?text='+encodeURIComponent(t)+'&related='+encodeURIComponent(ifdef(r,'maree_info'))+"&lang="+encodeURIComponent(ifdef(l,'fr'));}

// -----------------------------------------------------------------------------

function isSVG() {return !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg','svg').createSVGRect;}

// -----------------------------------------------------------------------------

function isTouch()  {return (/*window.Touch||*/(window.navigator&&window.navigator.msMaxTouchPoints)||('ontouchstart' in document))?1:0;}
function evNoDef(ev){if(ev)if(ev.preventDefault)ev.preventDefault();else ev.returnValue=false;}
function evS(ev){if(ev)ev.cancelBubble=true;if(ev&&ev.stopPropagation)ev.stopPropagation();return ev;}
function evPD(ev){if(ev)if(ev.preventDefault)ev.preventDefault();else ev.returnValue=false;return ev;}

function OneTouchCapture(e,ev,opt,fs,fm,fe,fc)
{
 if(!(e=$(e))||!e.addEventListener||!isTouch())return;
 e.ontouchstart=null;e.OneTouchCapture=this;
 this.e=e;this.options=ifdef(opt,'');this.PreventDefault=isOpt('PreventDefault',this.options);this.state=0;this.target=null;
 this.moved=-1;this.lastEvent=this.tid=this.x0=this.x=this.y0=this.y=this.dx=this.dy=null;this.t0=time();
 if(isdef(fs))this.touchstart=fs;
 if(isdef(fm))this.touchmove=fm;
 if(isdef(fe))this.touchend=fe;
 if(isdef(fc))this.touchcancel=fc;
 $evL(this.e,'touchstart',this,false,false);
 if(ev&&ev.type=='touchstart')this.handleEvent(ev);
}
OneTouchCapture.prototype.Remove = function () {this.handleEvent(null);$evL(this.e,'touchstart',this,true,false);if(this.e)this.e.OneTouchCapture=null;this.e=null;}
OneTouchCapture.prototype.handleEvent = function(ev){
                                                     if(ev&&this.PreventDefault)ev.preventDefault();
                                                     if( !this.state && ev && ev.type=='touchstart' && ev.touches && ev.touches.length==1 )
                                                        {
                                                         this.lastEvent=ev;this.moved=0;
                                                         this.x0=this.x=ev.touches[0].pageX;
                                                         this.y0=this.y=ev.touches[0].pageY;
                                                         this.dx=this.dy=0;
                                                         this.target=this.GetTarget(ev.touches[0]);
                                                         if( this.target && !this[ev.type] || this[ev.type](ev) )
                                                            {
                                                             this.state=1; this.t0=time();
                                                             $evL(this.e,'touchmove,touchend,touchcancel',this,false,true);
                                                             this.tid=window.setTimeout( function(otc,ev){ 
                                                                                                           if( ev && otc && otc.e && otc.state==1 && otc.moved == 0 && otc.target )
                                                                                                             {otc.state=2;otc.tid=null;if(otc['touchstartdelay'])otc['touchstartdelay'](ev);}
                                                                                                           otc=ev=null; 
                                                                                                          }, 300, this, ev );                                                             
                                                            }
                                                         return;
                                                        }
                                                     if(this.tid){window.clearTimeout(this.tid);this.tid=null;}
                                                     if( this.state >= 1 && ev && ev.type == 'touchmove' )
                                                        {
                                                         this.moved++;
                                                         this.dx=ev.touches[0].pageX-this.x;
                                                         this.dy=ev.touches[0].pageY-this.y;
                                                         this.x=ev.touches[0].pageX;
                                                         this.y=ev.touches[0].pageY;
                                                         if((!this.dx&&!this.dy)||!this[ev.type]||this[ev.type](ev)){this.lastEvent=ev;return;}
                                                        }
                                                     if(this.tid){window.clearTimeout(this.tid);this.tid=null;}   
                                                     if( this.state && ev && ( ev.type == 'touchend' || ev.type == 'touchcancel' ) )
                                                         if(this[ev.type])this[ev.type](ev);
                                                     $evL(this.e,'touchmove,touchend,touchcancel',this,true,true);
                                                     this.lastEvent=null;this.state=0;
                                                     this.PreventDefault=isOpt('PreventDefault',this.options);
                                                    }

OneTouchCapture.prototype.GetTarget = function (xy){var t=xy&&document.elementFromPoint(xy.clientX,xy.clientY);while(t&&t.nodeType!=1&&t.parentNode )t=t.parentNode;t=(t&&t.nodeType==1)?$isChild(this.e,t,t):null;return (t&&isOpt('Capture',this.options))?this.e:t;}
OneTouchCapture.prototype.sendEvent = function (t,type,xy,rt){if(!t||!xy)return;var ev=document.createEvent('MouseEvents');ev.initMouseEvent(type,true,true,window,0,xy.screenX,xy.screenY,xy.clientX,xy.clientY,false,false,false,false,0,ifdef(rt,null));ev.isTouch=1;t.dispatchEvent(ev);}


function OneTouchME(e,ev,opt){$s(e,'UserSelect','none',true);this.OneTouchCapture(e,ev,opt);}                  
OneTouchME.prototype = OneTouchCapture.prototype;
OneTouchME.prototype.OneTouchCapture = OneTouchCapture;                                 
OneTouchME.prototype.touchstart = function (ev){return !!this.target;}
OneTouchME.prototype.touchstartdelay = function (ev){this.PreventDefault=true;this.e.style.webkitTouchCallout='none';this.sendEvent(this.target,'mouseover',ev.touches[0]);}     
OneTouchME.prototype.touchmove = function (ev){ 
                                               if(this.state<2)return false;
                                               var t0=this.target, t1=this.GetTarget(ev=ev.touches[0]);
                                               if(t1!=t0) {this.target=t1;this.sendEvent(t0,'mouseout',ev,t1);this.sendEvent(t1,'mouseover',ev,t0);}
                                               else { this.sendEvent(t0,'mousemove',ev);  }  
                                               return true;
                                              }
OneTouchME.prototype.touchend = function (ev) {
                                               if(this.moved==0||(this.state>=2&&isOpt('EndClick',this.options)))this.sendEvent(this.target,'click',this.lastEvent&&this.lastEvent.touches[0]);
                                               if(this.state>=2&&isOpt('EndOut',this.options))this.sendEvent(this.target,'mouseout',{clientX:null,clientY:null});
                                               this.target=null;this.e.style.webkitTouchCallout='';
                                               return true;
                                              }
OneTouchME.prototype.touchcancel = function (ev) { return this.state>=2&&this.sendEvent(this.target,'mouseout',{clientX:null,clientY:null}); }
