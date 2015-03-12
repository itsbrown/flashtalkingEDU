/**
 * Created by coreybrown on 6/27/14.
 */

(function(_btn){

    var _ctaBtn = function(_str){return _str;};
    function button(_x,_y,_w,_h,_cta,_pd,_id)
    {
        var _txtField = createEle('h3');
        var _ele = createEle('div');
        var _mainDiv = getElement(getElement(_pd).parentNode.id);
        console.log(_txtField);

        _txtField.style.color = '#fff';
        _txtField.style.fontSize = '9px;'
        _txtField.innerHTML = _cta;
        _ele.setAttribute('width', _w);
        _ele.setAttribute('height', _h);
        _ele.setAttribute('id', _id);
        _ele.style.position = 'absolute';
        _ele.style.top = _y + 'px';
        _ele.style.left = _x + 'px';
        _ele.style.cursor = 'pointer';

        _ele.style.zIndex = '10000';
        _ele.style.backgroundColor = '#000';
        _ele.appendChild(_txtField);
        _mainDiv.appendChild(_ele);

        button.prototype._btnEleId = _ele.id;
    }
    button.prototype.addListenersToBtn = function (_ele,_evt,_fun)
    {
        console.log(_evt,_fun);
        getElement(_ele).addEventListener(_evt,_fun);
    }
    function setText(_ctx, _str)
    {
        console.log('canvasX',_ctx);
        _ctx.textBaseline = 'bottom';
        _ctx.fillText(_str, 25,25);
    }
    _btn.button = button;
}(window));