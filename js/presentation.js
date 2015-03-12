/**
 * Created by coreybrown on 6/27/14.
 */
(function(presObject){

    var w_width;
    var w_height;
    var c;
    var ctx;
    var _bgDiv;
    var _imgPres;
    var _src = function(){var m = navigator.userAgent.match(/(Chrome)/i); if(m){_src = 'chrome_bg.png' }else{_src = 'bg.png'} return _src;};
    //_presContent is a JSON file which contains the presentation content
    var _presContent;
    var _clicked = 0;
    var _title = createEle('h1');
    var _desc = createEle('p');
    var _dif;
    var _xpos;
    var _ypos;
    var _adjustX;

    function presentation ()
    {
        _presContent = presentationContent;
        w_width = window.innerWidth;
        w_height = window.innerHeight;
        c = document.getElementById("myCanvas");
        ctx = c.getContext("2d");
        c.width = w_width - 20;
        c.height = w_height + 400;
        _bgDiv = document.getElementById('presentation');
        _bgDiv.style.position = 'absolute';
        _bgDiv.style.top = '0px';
        c.style.backgroundColor = "#333333";
        c.style.opacity = ".8";

        console.log("_src",_src());

        _imgPres = createEle('img');
        _imgPres.setAttribute('width','100%');
        _imgPres.src = './presentationAssets/' + _src;
        _imgPres.naturalWidth = '1140px';
        var _btn = new button((w_width - 200),(w_height - 100),90,35,"next",c.parentNode.id,'btnEle');
        addBTnListener(_btn);
        var _prevBtn = new button((w_width - 300),(w_height - 100),90,35,"prev",c.parentNode.id,'prevBtn');
        addBTnListener(_prevBtn);
        var _closeBtn = new button(75,40,90,35,"close",c.parentNode.id,'clsBtn');
        addBTnListener(_closeBtn);
        var _openBtn = new button(75,40,90,35,"open",c.parentNode.id,'opnBtn');
        addBTnListener(_openBtn);
        getElement('opnBtn').style.display = 'none';
        c.addEventListener("mousemove", mouseHandler);
        _imgPres.onload = function (){console.log("onLoad");loadedImg(_clicked);};

        console.log('_imgPres',_imgPres);
        console.log('_presContent',_presContent);
       // c.addEventListener("mousedown", mouseHandler);

    }
    function getAdjustments()
    {

    }
    function buildPres()
    {
        _desc.style.textAlign = 'left';
        _title.setAttribute('width','300px');
        _desc.setAttribute('width','300px');
        _title.style.position = 'absolute';
        _desc.style.position = 'absolute';
        _title.style.fontSize = '2em';
        _desc.style.fontSize = '1.5em';
        _title.style.color = '#fff';
        _title.style.opacity = 1;
        _desc.style.color = '#fff';

        addPresContent(0);

        console.log('Title',_title);
        getElement(c.parentNode.id).appendChild(_title);
        getElement(c.parentNode.id).appendChild(_desc);

    }
    function addPresContent(j)
    {
        console.log(j);
        var _setTop;
        var _setBtm;
        var _setCopy = parseFloat(_presContent['Coords'][1]['x']) + _xpos;
        if(j==1){
            _setTop = 10;
            _setBtm = 15;

        }
        else{
            _setTop = 3;
            _setBtm = 6;
        }
        _title.style.top = _setTop + 'em';
        _desc.style.top = _setBtm + 'em';
        _title.style.left = _setCopy +'px';
        _desc.style.left = _setCopy +'px';
        _title.innerHTML = _presContent['Title'][j];
        _desc.innerHTML = _presContent['Content'][j];
    }
    function addBTnListener(_btnId)
    {

        console.log(_btnId._btnEleId);
        _btnId.addListenersToBtn(_btnId._btnEleId,'click',clickHandlerBtn);
    }
    function clickHandlerBtn(e)
    {
        switch (this.id)
        {
            case 'clsBtn':
                getElement('clsBtn').style.display = 'none';
                getElement('btnEle').style.display = 'none';
                getElement('prevBtn').style.display = 'none';
                getElement('opnBtn').style.display = 'block';
                _bgDiv.style.display = 'none';
            break;
            case 'opnBtn':
                getElement('clsBtn').style.display = 'block';
                getElement('btnEle').style.display = 'block';
                getElement('prevBtn').style.display = 'block';
                getElement('opnBtn').style.display = 'none';
                _bgDiv.style.display = 'block';
            break;
            case 'btnEle':
                clear(_adjustX,_presContent['Coords'][_clicked]['y'],_presContent['Coords'][_clicked]['w'],_presContent['Coords'][_clicked]['h']);
                _clicked++;
                if(_clicked >= _presContent['Title'].length)
                {
                    _clicked = 0;
                }
                addPresContent(_clicked);
                console.log(_clicked);
                loadedImg(_clicked);
            break;
            case 'prevBtn':
                clear(_adjustX,_presContent['Coords'][_clicked]['y'],_presContent['Coords'][_clicked]['w'],_presContent['Coords'][_clicked]['h']);
                _clicked--;
                if(_clicked < 0)
                {
                    _clicked = _presContent['Title'].length-1;
                }
                addPresContent(_clicked);
                loadedImg(_clicked);
            break;
        }

    }
    function mouseHandler(me)
    {
       // console.log(me.clientX, me.clientY);
    }
    function loadedImg(j)
    {
        _dif = _bgDiv.offsetWidth - _imgPres.naturalWidth;
        _xpos = _dif/2;
        if(j == 0)
        {
            buildPres();
        }
        _adjustX = parseFloat(_presContent['Coords'][j]['x']) + _xpos;
        chromeFix(_bgDiv.clientHeight);
        console.log("height",_bgDiv.clientHeight);
        ctx.save();
        ctx.beginPath();
        //ctx.rect(155, 40, 780, 440);
        ctx.rect(_adjustX,_presContent['Coords'][j]['y'],_presContent['Coords'][j]['w'],_presContent['Coords'][j]['h']);
        ctx.clip();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'red';
        ctx.drawImage(_imgPres, (_xpos + 4), _ypos);
        ctx.stroke();
        ctx.restore();


    }
    function chromeFix(_ht)
    {
        if(_ht > 1176)
        {
            _ypos = 3;
        }else
        {
            _ypos = 0;
        }
    }
    function clear(i,j,k,l)
    {
        console.log(i,j,k,l);
        ctx.clearRect(i,j,k,l);
    }
    presObject.presentation = presentation;
}(window));