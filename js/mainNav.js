uaCheck();
function getUAwidth ()
{
    if(ua == "mobile")
    {
        setMobile();
    }

}
function mobileNav(nav)
{
    nav.className = "mainNavMobile";
    nav.setAttribute("bottom", "0");
}
function setMobile()
{
    var _nav = getElement("mainNav");
    mobileNav(_nav);

}
function getElement(_ele)
{
    return document.getElementById(_ele);
}
function createEle(_ele)
{
    return document.createElement(_ele);
}