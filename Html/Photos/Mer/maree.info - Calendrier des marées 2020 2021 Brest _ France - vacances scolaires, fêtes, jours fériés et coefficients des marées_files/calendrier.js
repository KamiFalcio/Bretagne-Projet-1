// http://maree.info 
(mareeinfo=(window.mareeinfo||{})).versionCalendrier='1.01';

function LoadCalendrierMois( ym, reload, now )
{
 var e=$('CalendrierMois_Content_'+ym);
 if(!e||!Calendrier)return false;
 if(!$cn(e,'LoadFlag')&&!reload) return 1;
 if(!now&&$cn(e,'Loading')){window.setTimeout('LoadCalendrierMois("'+ym+'",'+(reload?1:0)+',1)',5000);return 2;}
 $cnA(e,'Loading');
 return JS('/do/load-calendrier-mois.php?p='+Calendrier.Port+'&d='+ym,true,null,'LoadCalendrierMois'+ym) ? 3 : false;
}

function DoCalendrierMois(ym)
{
 var e=$('CalendrierMois_Content_'+ym),i,ym3;
 if(!e) return Calendrier.Mois;
 for(i=0;i<=3;i++){ym3=YM(ym,i);if(ym3>=Calendrier.MoisMin&&ym3<=Calendrier.MoisMax)LoadCalendrierMois(ym3);else ym3=Calendrier.MoisMax;}
 Calendrier.Mois=ym;
 $('Calendrier_Pages').style.left='0px';   
 for(e=e.parentNode.firstChild;ym=_int($id(e,/^CalendrierMois_Content_([0-9]{6})$/,1,0));e=e.nextSibling)
    $cnT(e,'Selected',ym>=Calendrier.Mois&&ym<=ym3?1:-1);
 selectValue('SelectCalendrier',Calendrier.Mois);
 return Calendrier.Mois;    
}

function GoCalendrierMois(ym)
{
 var e,ym3;
 ym=ifminmax(ym<1000?YM(Calendrier.Mois,ym>=0?1:-1):ym,Calendrier.MoisMin,YM(Calendrier.MoisMax,-3));
 for(i=3;i>=0;i--)
  if((ym3=YM(ym,i))>=Calendrier.MoisMin&&ym3<=Calendrier.MoisMax)
   if(!$cnA('CalendrierMois_Content_'+ym3,'Selected')){
   e=$('Calendrier_Pages');e.style.width=((2+e.childNodes.length)*Math.ceil(e.offsetWidth/e.childNodes.length))+'px';
   e=$c('div','CalendrierMois_Content_'+ym3,'CalendrierMois_Content Calendrier_Page Selected LoadFlag',e,$('CalendrierMois_Content_'+YM(ym3,1))||e.lastChild,'<table class="CalendrierMois"><tr><td style="height:400px;"></td></table>');
  }
 mvH('Calendrier_Pages',0.15,-ifdef($('CalendrierMois_Content_'+Calendrier.Mois).offsetLeft,0),-ifdef($('CalendrierMois_Content_'+ym).offsetLeft,0),function (e){DoCalendrierMois(ym)});
 return false;
}

function OnClickCalendrier(ev)
{
 var e,d;
 if((e=$pcn($evT(ev),'DM[0-9][0-9]','tr'))&&(d=$id(e.firstChild,/^D([0-9]{8})$/,1,0)))
  if(d>Calendrier.MareeMaxYMD)alert('Les horaires et hauteurs ne sont pas disponibles à cette date.');
  else window.location='/'+Calendrier.Port+'?d='+d;
}
