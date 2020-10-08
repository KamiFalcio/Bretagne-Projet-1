// http://maree.info 
(mareeinfo=(window.mareeinfo||{})).versionMain='1.01';

function SetMainPos()
{
 var e=$('Main'),m;
 if(!e) return;
 e.style.margin='auto';
 m=Math.floor((clientH()-e.offsetHeight)/2)-2;
 e.style.top=Math.max((m>=0?0:12),m)+'px';
 if(m<0)e.style.marginBottom='24px';
 m = Math.floor(((clientW()*2/3)-e.offsetWidth)/2);
 if($cn(e,'Left')){e.style.marginLeft = Math.max(m,10)+'px';if((docW()-$right(e))>10)return;}
 if($cn(e,'Right')){e.style.marginRight = Math.max(m,10)+'px';if($left(e)>10)return;}
}

function MainFadeInOut(io)
{
 var e=$('Main'),s;
 if(!e) return false;
 if(s=cssTransition(e,'transition')){e.style[s]='';$sOP(e,io?0:1);e.style[s]='opacity '+(io?'0.2s ease-out':'0.4s ease-in');$sOP(e,io?1:0);}
 else {$sOP(e,0.5);window.setTimeout("$sOP('Main',"+(io?1:0)+")",200);}
 return;
}

function InitFTG()
{
 if( isfunc(TWWJS) && $('MenuFTG_TwitterPort') )
		 TWWJS('MenuFTG_TwitterPort');    
 if($cn('FBLike','UpdateFlag'))
     $sHTML($cnR('FBLike','UpdateFlag'),FBLike('http://www.facebook.com/maree.info',370,35,'standard','light'));
 //APIplusone();
}

function DoPortFav( port, t )
{
 var p=isnum(port)?port:_int($id(port=$(port),/^Port([0-9]+)(_|$)/,1,0));if(isnum(port))port=null;
 if(!window.User||!(p>0))return;
 if(!t)t=$cn(port,'Fav')?-1:1;
 if(t>0&&User.PortsFav.length>=User.PortsFavMax){alert('Ajout impossible, le nombre de ports favoris est limité à '+User.PortsFavMax);return;}
 $cnT(port,'Fav',t);
 WaitAlert( 'Enregistrement des ports favoris...', 1000 );
 JS('/do/port-fav.php?p='+p+(t<0?'&del':'')+'&e='+encodeURIComponent($id(port,/_(.+)$/,1,''))+'&cmd='+(t=time()),true,null,'DoPortFav'+t);
}

function OnPortFav( port, t )
{
 if($id(port,/^Port([0-9]+)(_|$)/,1,0)>0)
  window.setTimeout('DoPortFav("'+port.id+'",'+(t||($cn(port,'Fav')?-1:1))+')',1); 
 return false;
}

function MenuPortsLOC()
{
 if( !navigator.geolocation ){$cnA('MenuPortsLocalisation','Disabled');return;}
 try {navigator.geolocation.getCurrentPosition(function(pos)
         {
          var e = $('MenuPortsRechercheQ');
          if(e){e.focus();e.keyRQL=null;e.value=round(pos.coords.latitude,4)+' '+round(pos.coords.longitude,4);e.onkeyup();}
        }
      ,MenuPortsLOC_Err,{maximumAge:300000,timeout:1000});}catch (err){MenuPortsLOC_Err(err);}
}

function MenuPortsLOC_Err(err)
{
 alert('Désolé, la position n\'a pas pu être déterminée.');
}

// -------

function LoadTheme(tid,save)
{    
 iffunc(window.RemoveTheme,DefRemoveTheme)(tid);
 return ((tid=ifmatch(tid,/^[1-9][0-9]+$/,window.User&&window.User.TID))&&JS('/do/theme.php?tid='+encodeURIComponent(tid)+'&w='+ifdef(screen&&(screen.availWidth||screen.width),0)+'&h='+ifdef(screen&&(screen.availHeight||screen.height),0)+(save?'&save=1':''),true,null,'ThemeJS'))?tid:0;
}

function DefInitTheme(tid)
{
 $cnA('Body','Theme'); 
 $cnR('MenuCompteNoTheme','Disabled');
}

function DefRemoveTheme(newTID)
{
 $cnA('MenuCompteNoTheme','Disabled');
 $cnR('Body','Theme');
}

function NoTheme(never,save)
{    
 iffunc(window.RemoveTheme,DefRemoveTheme)(0);
 JS('/do/theme.php?tid='+(never?-1:0)+'&w='+ifdef(screen&&(screen.availWidth||screen.width),0)+'&h='+ifdef(screen&&(screen.availHeight||screen.height),0)+(save?'&save=1':''),true,null,'ThemeJS');
}

// -------

function DlgLogin(w,h,s)
{
 if(!isdef(w))w=640; if(w>0)w='width="'+w+'"';
 if(!isdef(h))h=220; if(h>0)h='height="'+h+'"';
 return ModalOpen(null,'AutoSize',null,'<iframe '+w+' '+h+' '+(strlen(s)?'style="'+s+'"':'')+' src="/login/login-dlg.php" frameborder="0" scrolling="no" allowtransparency="true"></iframe>');
}

function ReloadStaticCSS(qs)
{
 var e,a=document.getElementsByTagName?document.getElementsByTagName("link"):[];
 for(var i=0;i<a.length;i++)
  if((e=a[i])&&e.rel=='stylesheet'&&e.href&&e.href.match(/\/css\/[^.]+\.css\?[0-9]+$/))
    e.href=e.href.replace(/\?[0-9]+$/,qs);
}

function ReloadStaticJS(qs)
{
 var e,a=document.getElementsByTagName?document.getElementsByTagName("script"):[];
 for(var i=0;i<a.length;i++)
  if((e=a[i])&&e.type=='text/javascript'&&e.src&&e.src.match(/\/js\/[^.]+\.js\?[0-9]+$/))
  {
   var js=document.createElement('script');
   js.type=e.type;js.src=e.src.replace(/\?[0-9]+$/,qs);
   e.parentNode.replaceChild(js,e);
  }
}

function CheckVersion(v,dlg)
{
    if(!window.mareeinfo||mareeinfo.version!=v)
    {
        if(dlg)ModalOpen(null,'AutoSize','Dlg','<div style="padding:20px;"><b>Mise à jour</b><br><br>Une mise à jour est disponible<br>Merci de recharger la page.<br><br><button class="BtnRed" onclick="window.location.reload()">Recharger</button></div>');
        return false;
    }
    return true;
}