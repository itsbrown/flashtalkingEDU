/**
 * Created by coreybrown on 3/27/14.
 */
var tutorials;
var _div_wrapper;
var _div_tag;
var _div_thumb;
var _div_desc;
var _div_downloadBtns;
var _head;
var _ul;
var _li;
var _vidPL;
var _vidTP;
var _icons = [];
var _sectionH1;
var _addRemove;
var _img = function (){var _imgEle = document.createElement('img'); return _imgEle};
var _li = function (){var _liEle = document.createElement('li'); return _liEle};

var _tutorialCard = function (parentDiv,cardSec,j, icons){
    createElements();
    addRules();
    addStyles();
    _sectionH1 = document.getElementById(parentDiv).firstElementChild;
    buildCard(cardSec,j);
    _icons = icons;
    addIcons();
    addCardtoPage(document.getElementById(parentDiv));
};
function createElements ()
{
     _div_wrapper = document.createElement('div');
    _div_tag = document.createElement('div');
    _div_thumb = document.createElement('div');
    _div_desc = document.createElement('div');
    _div_downloadBtns = document.createElement('div');
    _head = document.createElement('h2');
    _ul = document.createElement('ul');
    _vidPL = new _img();
}
function addRules()
{
    _div_wrapper.className = "cardWrapperMainStyle";
    _div_tag.className = "cardTagMainStyle";
    _div_thumb.className = "thumbDev";
    _div_desc.className = "cardDescription";
    _div_downloadBtns.className = "downLoadBtns";
    _ul.className = "action_icons";
}
function addStyles()
{
   _vidPL.setAttribute('width', '100%');
   //_div_wrapper.style.opacity = '0';
}
function buildCard(_cProp,k)
{
    _div_desc.innerHTML = _cards[_cProp][k]["desc"];
    _div_tag.innerHTML = _cards[_cProp][k]["tag"];
    _sectionH1.innerHTML = _cards[_cProp][k]["tag"];
    _vidPL.src = "./assets/" + _cards[_cProp][k]["img"];
    _vidTP = "../" + _cards[_cProp][k]["video"];
    _div_wrapper.setAttribute('data-type',_cProp);
    _div_wrapper.setAttribute('data-number',k);
    addListenersToCards(_vidPL);
}
function addListenersToCards(_vh)
{
    _vh.addEventListener('click', videoClickHandler);
}
function videoClickHandler(e)
{
    mainVideoUpdate(_vidTP);
    console.log(e);
}
function addCardtoPage(_pd)
{
    _div_wrapper.appendChild(_div_tag);
    _div_thumb.appendChild(_vidPL);
    _div_wrapper.appendChild(_div_thumb);
    _div_wrapper.appendChild(_div_desc);
    _div_wrapper.appendChild(_div_downloadBtns);
    _div_downloadBtns.appendChild(_ul);
    _pd.appendChild(_div_wrapper);
    TweenMax.from(_div_wrapper,.8,{css:{margin:"+33px 0 0 0", autoAlpha:0},easeOut:SineOut});

}
function iconClickHandler()
{
    toggleAddRemoveicon(this.parentElement.parentElement.parentElement,this.firstElementChild);

    var _n = parseInt(this.parentElement.parentElement.parentElement.dataset.number,10);
    toggleWatchList(getType(this.parentElement.parentElement.parentElement.dataset.type),_n);
  //
    //console.log(this.parentElement.parentElement.parentElement.dataset.type);
    //console.log(this.parentElement.parentElement.parentElement.dataset.number);
}
function toggleAddRemoveicon(_pd,_ce)
{
        console.log("toggleAddRemove");
    var _stIcon = _ce.src;
    if(_stIcon.search("add_to") > -1)
    {
        var _replacedIcon = _stIcon.replace("add_to", "remove_from");
        _pd.style.backgroundImage = "url('../assets/bg_2px_blue.gif')";
    }else
    {
        console.log("toggleAddRemove - else");
        var _replacedIcon = _stIcon.replace("remove_from","add_to");
        _pd.style.backgroundImage = "url('../assets/bg_2px.gif')";
        clearCard(_pd);
    }

    _ce.src = _replacedIcon;
}
function clearCard(_rd)
{
    console.log(_rd);
    TweenMax.to(_rd,.4,{css:{opacity:0.3}});

}
function getType(_cardType)
{
  //  _cardType.toString();
    return _cardType;
}
function toggleWatchList(_ctype,j)
{
    if(watchCards[_ctype][j])
    {
        watchCards[_ctype].pop(_cards[_ctype][j]);
    }
    else
    {
        watchCards[_ctype].push(_cards[_ctype][j]);
    }
}
function addIcons()
{
    for(var i = 0; i < _icons.length; i++)
    {
        var _iconLi = new _li();
        var _newImage = new _img();
        _newImage.src = _icons[i];
        _newImage.setAttribute("width", "auto");
        _newImage.setAttribute("height", "100%");
        _newImage.setAttribute("id", "icon"+i);
        _iconLi.appendChild(_newImage);
        _iconLi.addEventListener('click', iconClickHandler);
        _ul.appendChild(_iconLi);
    }
}

