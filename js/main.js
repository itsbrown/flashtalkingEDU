var _responsiveSize = 1140;
var _touchLoc;
var _startX;
var _endX;
var right;
var _scriptTypeSelect;
var _tgImg;
var _watchList;
var _tutList;
var open = false;
var l=0;
var _cards;
var _wCards
var dlIcons = ["./assets/download_icon.gif","./assets/add_to_watchlist_icon.gif","./assets/chapters_icon.gif","./assets/readMeFile_icon.gif"];
var wlIcons = ["./assets/download_icon.gif","./assets/remove_from_watchlist_icon.gif","./assets/chapters_icon.gif","./assets/readMeFile_icon.gif"];
var _currentScript = "ftEdu";
var myDD;

window.onload = function () {
};

function getUAwidth ()
{
    console.log("getUAwidth",ua);
    if(ua == "mobile")
    {
        _responsiveSize = 320;
        setMobile();
    }else
    {
        _responsiveSize = 1140;
    }

}

function toggleControls() {
    var v = getElement('videoHolder');
    if (v.currentTime <= 0 || v.paused) {
        console.log(v.currentTime);
        v.play;
        v.removeAttribute("controls")
    } else {
        v.pause;
        v.setAttribute("controls","controls");
    }
}
function initMain()
{
    uaCheck();
    getUAwidth();
    setNav("mainNav");
    setNav("chapterNav");
    setNxVid("nextVideoDiv","nxtImage");
    setSelectBox("scriptSelectDropDown","scriptTypeImg");
    setSelectBox("adTypeSelectDropDown","adTypeImg");
    assignElements();
    setCards("tutorials","watchList");
    addAllListeners("liveChat", "click", navClickHandler);
    addAllListeners("videoHolder","click",toggleControls);
    _cards = tutCards;
    _wCards = watchCards;
    firstCardLoad("ftEdu");

}
function firstCardLoad (fl)
{
    for(var i = 0; i < _cards[fl].length; i++)
    {
        _tutorialCard("tutorials", fl, i, dlIcons);
    }
}
function addAllListeners(ele,evt,fun)
{
    getElement(ele).addEventListener(evt, fun);
}
function setSelectBox(_ulId,imAr)
{
    var _scriptSelect = getElement(_ulId);
    /*var _selects = _scriptSelect.getElementsByTagName("li");
     var offsetHeight = (_scriptSelect.parentNode.offsetHeight)/_selects.length;
     setTogleImg(_scriptSelect);
     _scriptTypeSelect = new DropDownMenu(_scriptSelect,_selects,getElement('imgTag'+i),offsetHeight);
     */
    myDD = new DropDownMenu(_ulId,imAr);
    //myDD.attachListeners(_scriptSelect);
}
/********************************************************************************************************/
/****************************** Video *************************************/
/********************************************************************************************************/

function mainVideoUpdate(_src)
{
    var _videoHolder = getElement('videoHolder');
    _videoHolder.src = _src;
    console.log(_videoHolder.src);
}





/********************************************************************************************************/
/****************************** Tutorial Cards *************************************/
/********************************************************************************************************/
function clearAllFlashCards(_cn)
{
    var div_wrap = document.getElementsByClassName(_cn);
    for(var i = 0; i < div_wrap.length;i++)
    {
        // console.log("div",div_wrap[i]);
        TweenMax.to(div_wrap[i],.4,{css:{margin:"+33px 0 0 0", opacity:0, display:"none"}});
    }
}
function cardLoadHandler(str,_menu)
{
    console.log(str,_menu);
    switch (_menu)
    {
        case "adTypeSelectDropDown":
            loadAdType(str);
            break;
        case "scriptSelectDropDown":
            loadScrypt(str);
            break;
    }

}
/****************************** Loads selected script type from dropdown *************************************/

function loadScrypt(_str)
{
    clearAllFlashCards("cardWrapperMainStyle");
    var _icons;
    switch (_str)
    {
        case "ACTIONSCRIPT 3":
            _str = "AS3";
            _icons = dlIcons;
            break;
        case "ACTIONSCRIPT 2":
            _str = "AS2";
            _icons = dlIcons;
            break;
        case "JAVASCRIPT":
            _str = "JS";
            _icons = dlIcons;
            break;
        case "Creative Interface":
            _str = "ftEdu";
            _icons = dlIcons;
            break;
        case "HTML5":
            _str = "HTML5";
            _icons = dlIcons;
            break;
        case "watchHeader":
            _cards = watchCards;
            _str = _currentScript;
            _icons = wlIcons;
            break;
        case "tutHeader":
            _cards = tutCards;
            _str = "ftEdu";
            _icons = dlIcons;
            break;
    }
    _currentScript = _str;
    console.log(_icons);
    for(var i = 0; i < _cards[_currentScript].length; i++)
    {
        _tutorialCard("tutorials", _str, i, _icons);
    }
}

/****************************** Loads selected Ad type from dropdown *************************************/
function loadAdType(_str)
{
    clearAllFlashCards("cardWrapperMainStyle");
    switch (_str)
    {
        case "Standard Ad":
            _str = "Standard ad";
            break;
        case "Instant Ad":
            _str = "Instant ad";
            break;
        case "Expandable":
            _str = "Expandable";
            break;
        case "Web Capture":
            _str = "Web Capture";
            break;
    }
    searchCards("name",_str);
}
/****************************** Searches for selected Ad type from dropdown *************************************/

function searchCards(_terms, _clicked)
{
    for(var i = 0; i < _cards[_currentScript].length; i++)
    {
        if (_clicked == _cards[_currentScript][i][_terms])
        {
            console.log("cards",_cards[_currentScript][i][_terms]);
            _tutorialCard("tutorials", _currentScript, i, dlIcons);
        }
    }
}
function setCards(tut,watch)
{
    _watchList = getElement(watch);
    _tutList = getElement(tut);
}
/****************************** sets toggle arrow image in dropdown *************************************/

function setTogleImg(_div)
{
    l++;
    _tgImg = _div.parentNode.getElementsByTagName('div');
    var _img = createEle('img');
    _img.src = "./assets/arrow.gif";
    _img.setAttribute('id','imgTag'+l);
    _tgImg[0].appendChild(_img);
}
function drpClickHandler()
{
    mobileClass(_tgImg[0],'clickedToggleImg');
}
function assignElements ()
{
    getElement("tutHeader").addEventListener("click",clickHandler);
    getElement("watchHeader").addEventListener("click",clickHandler);
    getElement("chIcon").addEventListener("click",navClickHandler);

}
function setNav(_div)
{
    var _nav = getElement(_div);
    var _navSection = _nav.children;
    for(var i = 0; i < _navSection.length; i++)
    {
        _navSection[i].addEventListener("click", navClickHandler);
    }
}
function navClickHandler(e)
{
    switch (this.id)
    {
        case "chIcon":
            var _eleTarget = getElement('chapterContainer');
            if(open){
                _eleTarget.style.top = '-250px';
                open = false;
            }else{
                _eleTarget.style.top = '150px';
                open = true;
            }
            console.log("navClickHandler", window.innerWidth);
            break;

    }
}
function sbClickHandler(e)
{
    console.log("navClickHandler",this.id);

}

/****************************** Mobile Set up *************************************/

function setMobile()
{
    var _nav = getElement("mainNav");
    var _tutContain = getElement("tutorialContainer");
    var _sideBar = getElement("sidebar");
    mobileNav(_nav, _tutContain, _sideBar);
    setMobileClasses();
    hidePages();
    setTouchEvents();
}
function hidePages()
{
    var _page = getElement("watchList");
    var _chNav = getElement('chapterContainer');
    var _setPos = (window.innerWidth/2) - (_chNav.offsetWidth/2)
    _chNav.style.left = _setPos + 'px';
    _page.style.display = "none";
}
function mobileNav(nav,tutContain,sideBar)
{
    console.log("_tutContain", tutContain);
    nav.className = "mainNavMobile";
    nav.setAttribute("bottom", "0");
    tutContain.className = "hay1";
    sideBar.className = "hay1";
}
function setTouchEvents()
{
    var _chNav = getElement('chapterContainer');
    var _tutSection = document.getElementsByClassName("tutorialCards");
    for(var i = 0; i < _tutSection.length; i++)
    {
        _tutSection[i].addEventListener('touchstart', clickHandler);
        _tutSection[i].addEventListener('touchend', clickHandler);
    }
}
function navClickHandler()
{
    alert('LIVE CHAT WITH STUDIO TEAM SUCCESS');
}
function clickHandler(e)
{
    switch (e.type)
    {
        case "touchstart":
            e.preventDefault();
            _startX = e.changedTouches[0].pageX;
            break;
        case "touchend":
            _endX = e.changedTouches[0].pageX;
            _touchLoc = Math.abs(_startX -_endX);
            touchDirection();
            viewPage(this);
            break;
        case "touchmove":
            var _chNav = getElement('chapterContainer');

            break;
        case "click":
            switchClass(getElement(newId(this.id)),getElement(this.id),"focusCollection","nonfocusCollection");
            // load users watchlist
            loadScrypt(this.id);
            console.log("clickHandler",newId(this.id));
            break;
    }
}
function touchDirection()
{
    right = false;
    if(_touchLoc > 75)
    {
        if(_endX > _startX)
        {
            console.log("right",_touchLoc);
            //alert("right");
            right = true;
        }
        if(_endX < _startX)
        {
            console.log("left",_touchLoc);
            // alert("left");
        }
    }
}

function setMobileClasses()
{
    mobileClass(getElement("sectionTest"),"hay0");
}
/****************************** End Mobile Set up *************************************/


function newId(_id)
{
    if(_id == "watchHeader")
    {
        return "tutHeader";
    }
    else
    {
        return "watchHeader";
    }
}


function viewPage(pg)
{
    console.log("clicked",pg);
    var _changeTo = pg.dataset.id;
    var _changeHeader = pg.dataset.header;
    if(right)
    {
        pg.style.display = "none";
        var change = getElement(_changeTo);
        var clickedHead = getElement(_changeHeader);
        var newHead = getElement(change.dataset.header);
        switchClass(clickedHead,newHead,"focusCollection","nonfocusCollection");
        change.style.display = "block"
    }
}
function setNxVid(_div,_imgDiv)
{
    var nxContainer = getElement(_div);
    var nxImg = getElement(_imgDiv);
    var _nxImgEle = createEle("img");
    _nxImgEle.src = "./assets/nextUpThumb.jpg"
    _nxImgEle.setAttribute('width', '100%');
    nxImg.appendChild(_nxImgEle);
    console.log(nxImg.children);
}

function switchClass(oldEle,newEle,_focus,_nonFocus)
{
    oldEle.className = "";
    oldEle.className = _nonFocus;
    newEle.className = "";
    newEle.className = _focus;
    loadCards(oldEle,newEle);
}
function mobileClass(ele,eleClass)
{
    ele.className = "";
    ele.className = eleClass;
}
function loadCards(_oldEle,_newEle)
{

}
function getElement(_ele)
{
    return document.getElementById(_ele);
}
function createEle(_ele)
{
    return document.createElement(_ele);
}
function getAtt(_ele,att)
{
    return _ele.getAttribute(att);
}
function loadVideo()
{
    var _ve = document.getElementById('videoHolder');
    _ve.load();
}
