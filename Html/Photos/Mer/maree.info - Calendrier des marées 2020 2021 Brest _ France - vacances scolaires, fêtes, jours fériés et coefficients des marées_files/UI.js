// http://maree.info 
(mareeinfo=(window.mareeinfo||{})).versionUI='1.04';

function InitUI()
{
}

function DoFormTarget(f,a)
{
 var n=f&&f.name&&(f.name+'_FormTarget');
 if(n&&$cnR(($(n)||$c('div',n,'FormTarget',f,null,'<iframe name="'+n+'"></iframe>')),'Delete')&&$sa(f,'target',n))
  return isdef(a)?$sa(f,'action',a):f;
 return null;
}

function ModalOpen(m,mb,mc,html,w,h)
{
 var e=$('Modal')||$c('div','Modal',null,'Body');
 if(!e)return false;
 e.innerHTML='<div id="ModalBox" onclick="$evS(event)"><div id="ModalClose" onclick="ModalClose()"></div><div id="ModalContent"></div>';
 $cnA('Body','Modal');
 if(strlen(m))$cnA('Body',m);
 if(strlen(mb))$cnA('ModalBox',mb);
 if(strlen(mc))$cnA('ModalContent',mc);
 if(strlen(html))$('ModalContent').innerHTML=html;
 ResizeModal(w,h);
 $evL( window, 'onresize', ResizeModal );
 window.setTimeout( ResizeModal, 100 );
 return true;
}

function ModalClose()
{
 $cnR('Body','(^| )Modal[^ ]*',true);
 $('Modal').innerHTML='';
 $evL( window, 'onresize', ResizeModal, true );
}

function ResizeModal(w,h)
{
 var e=$('Modal'); if(!e)return;
 $('Modal').style.width  = '0px';
 $('Modal').style.height = '0px';
 $('Modal').style.width  = docW()+'px';
 $('Modal').style.height = docH()+'px';
 e=$('ModalBox'); if(!e)return;
 if(w)e.style.width=isnum(w)?w+'px':w;
 if(h)e.style.height=isnum(h)?h+'px':h;
 e.style.left  = Math.max(0,Math.round( Math.min(clientL()+(clientW()-e.offsetWidth)/2, docW()-e.offsetWidth))) + 'px';
 e.style.top   = Math.max(0,Math.round( Math.min(clientT()+(clientH()-e.offsetHeight)/2, docH()-e.offsetHeight))) + 'px';
}

//------

var PMenu_current   = null;
var PMenu_idTimeout = undef;

function PMenu_Process( m, sm, html, options, ev, off )
{
 var cur=false;
 PMenu_Off();
 if((m=$(m))&&!sm&&strlen(m.id))sm=m.id+'_SubMenu';
 sm=$(sm)||$c('div',sm,"PMenuSubMenu PMenuOptions_AutoCreate","Body");
 if(options===true)options='PosCursor';
 options+=_a($cn(sm,'PMenuOptions?((_[a-zA-Z0-9]+)+)'),3,'').replace(/_+/g,' ');
 if(((cur=isOpt('PosCursor',options))&&!ev)||(!cur&&!m))return;
 if(isstr(html))sm.innerHTML=html;
 sm.onmouseover=PMenu_CancelOff;
 if(!isOpt('NoCancelOut',options)){sm.onmouseout=PMenu_Out;if(m&&!m.onmouseout)m.onmouseout=PMenu_Out;}
 if(!isOpt('NoCancelClick',options))sm.onclick=PMenu_SendOff;
 PMenu_current=sm;
 sm.PMenuOptions=options;
 sm.PMenuOff=off;
 if(sm.PMenu=m){m.className=m.className.replace(/(^| )(PMenu[^ ]*)Sel[0-1]( |$)/g,'$1$2Sel1$3');$cnA(m,'PMenuSel');}
 if(window.ie6SelectShowHide)ie6SelectShowHide(false); 
 $sSH(sm,'block');
 $cnA('Body','PMenu');
 if(cur){$sVH(sm,true);sm.style.top=curT(ev)+'px';sm.style.left=curL(ev)+'px';}else{PMenu_Pos();$evL(window,'onresize',PMenu_Pos);}
 sm=m=null;
}

function PMenu_Pos()
{
 if(!PMenu_current||!PMenu_current.PMenu||isOpt('PosCursor',PMenu_current.PMenuOptions))return;$sVH(PMenu_current,true);
 if(isOpt('MenuLeft',PMenu_current.PMenuOptions)) $ltwh(PMenu_current,$left(PMenu_current.PMenu)-PMenu_current.offsetWidth,$top(PMenu_current.PMenu)-(isOpt('AlignTop',PMenu_current.PMenuOptions)?-PMenu_current.PMenu.offsetHeight+PMenu_current.offsetHeight:0));
 else if(isOpt('MenuRight',PMenu_current.PMenuOptions))  $ltwh(PMenu_current,$right(PMenu_current.PMenu),$top(PMenu_current.PMenu)-(isOpt('AlignTop',PMenu_current.PMenuOptions)?-PMenu_current.PMenu.offsetHeight+PMenu_current.offsetHeight:0));
 else $ltwh(PMenu_current,$left(PMenu_current.PMenu)+(isOpt('AlignRight',PMenu_current.PMenuOptions)?PMenu_current.PMenu.offsetWidth-PMenu_current.offsetWidth:0),$top(PMenu_current.PMenu)+(isOpt('AlignTop',PMenu_current.PMenuOptions)?-PMenu_current.offsetHeight:PMenu_current.PMenu.offsetHeight));
}

function PMenu_Out(event)  {if(PMenu_current&&!$isChild(PMenu_current,$evRT(event))&&!$isChild(PMenu_current.PMenu,$evRT(event)))PMenu_SendOff();}
function PMenu_SendOff(f)  {PMenu_CancelOff();if(f||!$cn(PMenu_current,'PMenuFlagLocked'))PMenu_idTimeout=window.setTimeout(PMenu_Off,250);}
function PMenu_CancelOff() {if(isdef(PMenu_idTimeout))window.clearTimeout(PMenu_idTimeout);PMenu_idTimeout=undef;}

//if(isTouch())$evL(document,'ontouchstart',PMenu_Out);

function PMenu_Off(sm)
{
 if(!PMenu_current||(isdef(sm)&&$(sm)==PMenu_current)) return;
 $evL(window,'onresize',PMenu_Pos,true);
 PMenu_current.style.left = "-500px";
 PMenu_current.style.top  = "-500px";
 $sVH(PMenu_current,false);
 if(window.ie6SelectShowHide)ie6SelectShowHide(true); 
 if(PMenu_current.PMenu){$cnR(PMenu_current.PMenu,'PMenuSel');PMenu_current.PMenu.className=PMenu_current.PMenu.className.replace(/(^| )(PMenu[^ ]*)Sel[0-1]( |$)/g,'$1$2Sel0$3');}
 if(PMenu_current.PMenuOff)PMenu_current.PMenuOff(); 
 PMenu_current.PMenu = null;
 if(isOpt('AutoCreate',PMenu_current.PMenuOptions)&&!isOpt('NoAutoDelete',PMenu_current.PMenuOptions))$d(PMenu_current);
 PMenu_current = null;
 PMenu_CancelOff();
 $cnR('Body','PMenu');
}

// -----------------------------------------------------------------------------

function mvH(id,t,l0,l1,cb,t0,cnt)
{
 var e=$(id),l=l1;
 if(!cnt){t0=t0||0.05;if(e.mvH_TID)window.clearTimeout(e.mvH_TID);e.style.left=l0+'px';}
 if(t)e.style.left=(l=e.offsetLeft+Math.round((l1-l0)/(t/t0)))+'px';
 if((l1<l0&&l>l1)||(l1>l0&&l<l1)){id=e.id;e.mvH_TID=window.setTimeout(function (){mvH(id,t,l0,l1,cb,t0,_int(cnt)+1)},t0*1000);e=null;return;}
 e.style.left=l1+'px';e.mvH_TID=0;id=e.id;e=null;
 if(cb)window.setTimeout(function(){var e=$(id);if(e&&cb)cb(e);e=cb=null;},1);
}

function rH(id1,id2,t,dir,cb)
{
 var e1=$(id1), e2=$(id2), z=$pz(e1);
 e1.style.zIndex  = z+2;
 e1.style.position='relative';
 if(e1==e2){t=0;e2=id2=null;}
 if(e2){e2.style.zIndex=z+1;e2.style.position='absolute';}
 $cnA(e1,'Selected');
 e1.style.left = ( dir<0 ? (e2||e1).offsetWidth : -e1.offsetWidth )+'px';
 if(e2) e2.style.top=e1.offsetTop+'px';
 mvH(id1,t,e1.offsetLeft,0,function (e){$cnR(id2,'Selected');if(cb)cb(e);});
 e1=e2=null;
}

// -----------------------------------------------------------------------------

function SetBackground( img, c1, c2, sX, sY )
{
 var s = 'BODY {background-color:'+c2+';';
 if( typeof img == 'string' ) // img
   {
    s +=  'background-image:url('+img+');';
    s +=  'background-size: '+(isdef(sX)?sX:'auto')+' '+(isdef(sY)?sY:'auto')+';';
   } 
 else if( c1 && c1!=c2 )
    s += cssRuleLinearGradiant(c1,c2);
 s += '}';
 ieF('Body',false);
 CSS(s,false,null,'cssPrefUser');
}

// -----------------------------------------------------------------------------

function WaitAlert( s, w, c )
{
 var e; $d('SplashAlert');
 if( s )
  {
   e=$c('div','SplashAlert',trim('WaitAlert '+ifstr(c,'')),'Body',null,s);
   e.SplashAlert=time();
   $ltwh(e,(clientW()-e.offsetWidth)/2,(clientH()-e.offsetHeight)/2);
   window.setTimeout("var e=$('SplashAlert');if(e&&e.SplashAlert=="+e.SplashAlert+")$cnA(e,'Waiting')",w>0?w:100); 
  }
}

function SplashAlert(s,cnt)
{
 var e=$('SplashAlert');
 if(!isnum(cnt))
  {
   $d(e);e=$c('div','SplashAlert','','Body',null,s);
   $ltwh(e,scrollL()+(clientW()-e.offsetWidth)/2,scrollT()+(clientH()-e.offsetHeight)/2); 
   s=e.SplashAlert=time();
   cnt=10;
  }
 if(e&&e.SplashAlert==s)
  if(ifnum(cnt,0)>0){if(cnt<10)$sOP(e,cnt*10);window.setTimeout('SplashAlert("'+s+'",'+(cnt-1)+')',cnt==10?1000:15);}
  else $d(e);
}

// -----------------------------------------------------------------------------

function InitSlide(s,go)
{
 var e=strlen(s)&&$clean(s+'_Pages'),e2=e&&$clean(s+'_Selector');if(!e)return false;
 while(e2&&e2.childNodes.length<e.childNodes.length)$c('span',null,null,e2);
 e.Slide_N=ifdef(e.Slide_N,$n($id($ccn(e,'Selected'),'^'+s+'_Content')));
 if(isdef(go))GoSlide(s,go);
}

function DoSlide(s,n)
{
 var i,e=strlen(s)&&$(s+'_Pages'),e2=$(s+'_Selector');if(!e||!isdef(e.Slide_N))return false;
 if(isstr(n=ifdef(n,e.Slide_N)))n=$(s+'_Content_'+n)||$(n);
 if(isobj(n)&&!($id(n.parentNode,s+'_(Selector|Pages)')&&(n=$n(n))>=0))return false;
 for(i=0;$cnT($child(e,i),'Selected',i==n?1:-1);i++)$cnT($child(e2,i),'Selected',i==n?1:-1);
 return e.Slide_N=n;
}

function GoSlide(s,n,t,t2)
{
 var e=strlen(s)&&$(s+'_Pages'),old=e&&e.Slide_N;if(!e||!isdef(e.Slide_N))return false;
 if(n===null)n=$child(e,old)||$child(e,0);
 if(n===-2)n=$child(e,old+1)||$child(e,0);
 if(isstr(n))n=$(s+'_Content_'+n)||$(n);
 if(isobj(n)&&!($id(n.parentNode,s+'_(Selector|Pages)')&&(n=$n(n))>=0))return false;
 if(e.Slide_TID)window.clearTimeout(e.Slide_TID);
 if(e.childNodes[n]){rH(e.childNodes[n],e.childNodes[old],ifnum(t2,0.2),old-n,function (){DoSlide(s);});}
 if(n!=old)$cnR($child(s+'_Selector',old),'Selected');
 e.Slide_TID=(t=ifnum(t,$ga(e.childNodes[n],'data-timer')||$ga(e,'data-timer')||5000))>0?window.setTimeout('GoSlide("'+s+'",-2)',t):0;
 return e.Slide_N=n;
}

function OnSlide(s,ev)
{
 var e=$evT(ev);if(isobj(s))s=$id(s,'^([^_]+)_',1);
 if(!strlen(s)||!e||(isTouch()&&!ev.isTouch))return;
 if($id(e.parentNode,'^'+s+'_(Selector|Pages)')||(e=$pid(e,'^'+s+'_Content_')))
   (ev.type=='mouseout')?GoSlide(s,null):GoSlide(s,e,0);
} 

// -----------------------------------------------------------------------------

function Youtube(vid,ap,ah,fs,w,h,s)
{ 
 if(!isdef(w))w=640; if(w>0)w='width="'+w+'"';
 if(!isdef(h))h=360; if(h>0)h='height="'+(h+(ifdef(ah,0)?0:35))+'"';
 return strlen(vid)&&ModalOpen('ModalMedia','Youtube','Youtube','<iframe '+w+' '+h+' '+(strlen(s)?'style="'+s+'"':'')+' src="http://www.youtube.com/embed/'+vid+'?rel=0&autoplay='+(ifdef(ap,0)?1:0)+'&autohide='+(ifdef(ah,0)?1:0)+'&fs='+(ifdef(fs,1)?1:0)+'" frameborder="0" scrolling="no" webkitAllowFullScreen mozallowfullscreen allowfullscreen></iframe>');
}

function YoutubePlaylist(pl,ap,ah,fs,w,h,s)
{ 
 if(!isdef(w))w=640; if(w>0)w='width="'+w+'"';
 if(!isdef(h))h=360; if(h>0)h='height="'+(h+(ifdef(ah,0)?0:35))+'"';
 return strlen(pl)&&ModalOpen('ModalMedia','Youtube','Youtube','<iframe '+w+' '+h+' '+(strlen(s)?'style="'+s+'"':'')+' src="http://www.youtube.com/embed/videoseries?list='+pl+'&rel=0&autoplay='+(ifdef(ap,0)?1:0)+'&autohide='+(ifdef(ah,0)?1:0)+'&fs='+(ifdef(fs,1)?1:0)+'" frameborder="0" scrolling="no" webkitAllowFullScreen mozallowfullscreen allowfullscreen></iframe>');
}

function Vimeo(vid,ap,t,l,p,w,h,s)
{ 
 if(!isdef(w))w=640; if(w>0)w='width="'+w+'"';
 if(!isdef(h))h=360; if(h>0)h='height="'+h+'"';
 return strlen(vid)&&ModalOpen('ModalMedia','Vimeo','Vimeo','<iframe '+w+' '+h+' '+(strlen(s)?'style="'+s+'"':'')+' src="http://player.vimeo.com/video/'+vid+'?title='+(ifdef(t,1)?1:0)+'&amp;byline='+(ifdef(l,1)?1:0)+'&amp;portrait='+(ifdef(p,0)?1:0)+'&amp;autoplay='+(ifdef(ap,0)?1:0)+'" frameborder="0" scrolling="no" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>');
}
