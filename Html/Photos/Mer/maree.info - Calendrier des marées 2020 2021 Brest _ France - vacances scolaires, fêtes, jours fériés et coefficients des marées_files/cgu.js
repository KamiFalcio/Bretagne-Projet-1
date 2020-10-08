// http://maree.info 
(mareeinfo=(window.mareeinfo||{})).versionCGU='1.01';

function CGUCookieAccept() { KI('CGUCookie','ok',12*31*24*3600,'/','.maree.info'); $d('CGUCookie'); GAEV('Action','CGUCookie'); }
(function ()
{
	if( !$('CGUCookie') )
		$c('div','CGUCookie','','Body',null,"<table><tr><td>En poursuivant votre navigation sur ce site, vous acceptez les conditions d'utilisation dont l'utilisation de Cookies pour réaliser des statistiques de visites et vous proposer des publicités ciblées. <a href=\"/cgu\">Lire les conditions d'utilisation</a></td><td><div onclick=\"CGUCookieAccept()\">J'accepte</div></td></table>");
})(); 