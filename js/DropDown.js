(function(ddObject){

    var expanded;
    var _newSelects;
    var _selectBox;
    var _selects;
    var _toggleIcon;
    var _origl;
    var _oldTI;
    var _oldTB;
    var _ary = [];
    var _clickedItem = function (str){ return str;};
    var _clickedType = function (_menu){ return _menu;};
    var menuOption = new Event('menuOptionClicked')
    var _clearCards = new Event('clearCards')

    var liArray = [];
    var ddUl;
    var _ddIcon;
    var ulTotalHeight;
    var _tweenAry = [];

        function DropDownMenu (_ul,_imgArrow)
        {
            ddUl = _ul;
            _ddIcon = getEle(_imgArrow);
            addListenersTodd(_ddIcon, 'click', expandContractClickHandler);
            setUpDropDownVars(setUpLiArray(ddUl));
        }
        function setUpLiArray(_ul)
        {
            liArray =  getEle(_ul).getElementsByTagName("li");
            return liArray;
        }
        function liClickHandler(e)
        {
            console.log(e);
            var _menuSelected = e.target.parentNode.id.toString();
            _newSelects = e.target.parentNode.children;
            var _str = e.target.innerHTML.toString();
            cardLoadHandler(_clickedItem(_str), _clickedType(_menuSelected));
            // e.target.parentNode.dispatchEvent(menuOption);
            var _boxHeight = _newSelects.length*_origl;
            var _ti = e.target.parentNode.nextElementSibling.firstElementChild;
            for(var i = 0; i < _newSelects.length;i++)
            {

                if(_newSelects[i].innerHTML == _str)
                {
                    var _ih = _newSelects[0].innerHTML;
                    _newSelects[i].innerHTML = _ih;
                    _newSelects[0].innerHTML = _str;
                }
            }
           // expandContractHandler(e.target.parentNode, _ddIcon);
            expandContractHandler(_tweenAry[1],_tweenAry[0]);
        }
        function expandContractClickHandler(e)
        {
            expandContractHandler(e.target.previousElementSibling,e.target);
        }
        function expandContractHandler(tb,ti)
        {
            /**************** tb should == ul & ti should == arrow image div  *****************/
            if(!_origl)
            {
                _origl = tb.clientHeight;
            }
            var bh = ulTotalHeight;

            console.log("_oldTI",_oldTI);
            console.log("_origl",_origl);
            console.log("bh",bh);
            console.log("ti",ti);
            console.log("tb",tb);
            if(_oldTI && _oldTI != ti)
            {
                console.log("expand",expanded);
                console.log("ti - true",ti);
                console.log("_oldTI - true",_oldTI);
                console.log("_tweenAry - true",_tweenAry);
                TweenMax.to(_tweenAry[0],.4,{rotation:0,ease:Power4.easeOut});
                TweenMax.to(_tweenAry[1],.2,{height:_origl,ease:Power4.easeOut});
                _tweenAry = [];
                expanded = false;
            }
            if(!expanded)
            {
                TweenMax.to(ti,.4,{rotation:-90,ease:Power4.easeOut});
                TweenMax.to(tb,.3,{height:bh,ease:Power4.easeOut});
                _oldTI = ti;
                _oldTB = tb;
                _tweenAry.push(_oldTI,_oldTB);
                expanded = true;
            }else
            {
                TweenMax.to(ti,.4,{rotation:0,ease:Power4.easeOut});
                TweenMax.to(tb,.2,{height:_origl,ease:Power4.easeOut});
                expanded = false;
            }
            console.log("expand2",expanded);
        }
        /****************************************/
        /********* global functions *************/
        /****************************************/
        function setUpDropDownVars(_ary)
        {
            for(var i = 0; i <_ary.length; i++)
            {
                _ary[i].setAttribute('id','li_'+i);
                _ary[i].addEventListener('click',liClickHandler);
            }
            ulTotalHeight = _ary[0].clientHeight*_ary.length;
        }
        function addListenersTodd(_ele,_event,fun)
        {
            _ele.addEventListener(_event,fun);
        }
        function getEle(_pd)
        {
            var ele =  document.getElementById(_pd);
            return ele;
        }
        ddObject.DropDownMenu = DropDownMenu;
    }(window));