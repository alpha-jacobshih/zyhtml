/*
 * popup.js
 *
 * draws a popup window.
 * 
 * @author jacob_shih
 * @date 12/01/2016 17:32:33
 * 
 */

function Popup(divPopup, divBlanket, width, height) {
    this.width = width;
    this.height = height;
    this.popup = divPopup;
    this.blanket = divBlanket;
    this.init();
}

Popup.prototype.viewport = function() {
    w = (typeof window.innerWidth != 'undefined') ? window.innerWidth : document.documentElement.clientWidth;
    h = (typeof window.innerHeight != 'undefined') ? window.innerHeight : document.documentElement.clientHeight;
    return { 'width': w, 'height': h };
};

Popup.prototype.init = function() {
    var viewport = this.viewport();
    if ((viewport.height > document.body.parentNode.scrollHeight) && (viewport.height > document.body.parentNode.clientHeight)) {
        contentHeight = viewport.height;
    } else {
        if (document.body.parentNode.clientHeight > document.body.parentNode.scrollHeight) {
            contentHeight = document.body.parentNode.clientHeight;
        } else {
            contentHeight = document.body.parentNode.scrollHeight;
        }
    }
    if ((viewport.width > document.body.parentNode.scrollWidth) && (viewport.width > document.body.parentNode.clientWidth)) {
        contentWidth = viewport.width;
    } else {
        if (document.body.parentNode.clientWidth > document.body.parentNode.scrollWidth) {
            contentWidth = document.body.parentNode.clientWidth;
        } else {
            contentWidth = document.body.parentNode.scrollWidth;
        }
    }
    var blanket = document.getElementById(this.blanket);
    blanket.style.height = contentHeight + 'px';
    var top = (viewport.height > this.height) ? (viewport.height - this.height) / 2 : 0;
    var left = (contentWidth > this.width) ? (contentWidth - this.width) / 2 : 0;
    var el = document.getElementById(this.popup);
    el.style.width = this.width + 'px';
    el.style.height = this.height + 'px';
    el.style.top = top + 'px';
    el.style.left = left + 'px';
};

Popup.prototype.show = function(isShow) {
    if(isShow) {
        $(this.blanket).style.display = 'block';
        $(this.popup).style.display = 'block';
    } else {
        $(this.blanket).style.display = 'none';
        $(this.popup).style.display = 'none';
    }
};

Popup.prototype.addEventListener = function(name, handler) {
    $(this.popup).addEventListener(name, handler);
};
