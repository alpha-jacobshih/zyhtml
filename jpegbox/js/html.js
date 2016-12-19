/*
 * html.js
 *
 * $.HTML, an html element creation helper class.
 * each derived class stands for an html tag, e.g. $.HTML.DIV for div element.
 * to create an element, use the new operator to create an html element.
 * e.g.,
 *
 *  var divElement = new $.HTML.DIV(parent_node, {id:"temp", class:"tempClass"});
 *
 * it creates a div element with id "temp" and class is assigned to "tempClass".
 * 
 * @author jacob_shih
 * @date 12/01/2016 17:30:24
 * 
 */

// +++ fixed for ie9 and below.
if (!Object.create) {
    Object.create = function(o, properties) {
        if (typeof o !== 'object' && typeof o !== 'function') {
            throw new TypeError('Object prototype may only be an Object: ' + o);
        } else if (o === null) {
            throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");
        }
        if (typeof properties != 'undefined') {
            throw new Error("This browser's implementation of Object.create is a shim and doesn't support a second argument.");
        }
        function F() {}
        F.prototype = o;
        return new F();
    };
}
// --- fixed for ie9 and below.

/*
 * How do I get the name of an object's type in JavaScript?
 * http://stackoverflow.com/a/332429
 */
/*
Object.prototype.getName = function() { 
   var funcNameRegex = /function (.{1,})\(/;
   var results = (funcNameRegex).exec((this).constructor.toString());
   return (results && results.length > 1) ? results[1] : "";
};
 */

$ = function(n) { return document.getElementById(n); };

$.HTML = function(parent_node, tag, args) {
    this.parent_node = parent_node;
    this.tag = tag;
    this.args = args;
    if(tag !== "") {
        return this.createElement(parent_node, tag, args);
    } else {
        return this.createTextNode(parent_node, args);
    }
};
$.HTML.prototype.createElement = function(parent_node, tag, args) {
    var elem = document.createElement(this.tag);
    for(var i in args) {
        if(true) {
            elem.setAttribute(i, args[i]);
        }
    }
    if(parent_node !== null) {
        parent_node.appendChild(elem);
    }
    return elem;
};
$.HTML.prototype.createTextNode = function(parent_node, data) {
    var text = document.createTextNode(data);
    if(parent_node !== null) {
        parent_node.appendChild(text);
    }
    return text;
};

$.HTML.HR = function (parent_node, args) {
    return $.HTML.call(this, parent_node, "hr", args);
};
$.HTML.HR.prototype = Object.create($.HTML.prototype);

$.HTML.BR = function (parent_node, args) {
    return $.HTML.call(this, parent_node, "br", args);
};
$.HTML.BR.prototype = Object.create($.HTML.prototype);

$.HTML.A = function (parent_node, args) {
    return $.HTML.call(this, parent_node, "a", args);
};
$.HTML.A.prototype = Object.create($.HTML.prototype);

$.HTML.DIV = function (parent_node, args) {
    return $.HTML.call(this, parent_node, "div", args);
};
$.HTML.DIV.prototype = Object.create($.HTML.prototype);

$.HTML.LABEL = function (parent_node, args) {
    return $.HTML.call(this, parent_node, "label", args);
};
$.HTML.LABEL.prototype = Object.create($.HTML.prototype);

$.HTML.TABLE = function (parent_node, args) {
    return $.HTML.call(this, parent_node, "table", args);
};
$.HTML.TABLE.prototype = Object.create($.HTML.prototype);

$.HTML.TABLE.addRow = function(table, cells, args) {
    var len = cells.length;
    var tr = new $.HTML.TR(table);
    for(var i = 0; i < len; i++) {
        var cell = cells[i];
        if(typeof cell === "string") {
            cell = new $.HTML.TEXTNODE(null, cells[i]);
        }
        var td = new $.HTML.TD(tr, args);
        td.appendChild(cell);
    }
    return tr;
};

$.HTML.TH = function (parent_node, args) {
    return $.HTML.call(this, parent_node, "th", args);
};
$.HTML.TH.prototype = Object.create($.HTML.prototype);

$.HTML.TR = function (parent_node, args) {
    return $.HTML.call(this, parent_node, "tr", args);
};
$.HTML.TR.prototype = Object.create($.HTML.prototype);

$.HTML.TD = function (parent_node, args) {
    return $.HTML.call(this, parent_node, "td", args);
};
$.HTML.TD.prototype = Object.create($.HTML.prototype);

$.HTML.INPUT = function (parent_node, args) {
    return $.HTML.call(this, parent_node, "input", args);
};
$.HTML.INPUT.prototype = Object.create($.HTML.prototype);

$.HTML.INPUT.TEXT = function (parent_node, args) {
    args = args ? args : {};
    args.type = "text";
    return $.HTML.INPUT.call(this, parent_node, args);
};
$.HTML.INPUT.TEXT.prototype = Object.create($.HTML.INPUT.prototype);

$.HTML.INPUT.RADIO = function (parent_node, args) {
    args = args ? args : {};
    args.type = "radio";
    return $.HTML.INPUT.call(this, parent_node, args);
};
$.HTML.INPUT.RADIO.prototype = Object.create($.HTML.INPUT.prototype);

$.HTML.INPUT.FILE = function (parent_node, args) {
    args = args ? args : {};
    args.type = "file";
    return $.HTML.INPUT.call(this, parent_node, args);
};
$.HTML.INPUT.FILE.prototype = Object.create($.HTML.INPUT.prototype);

$.HTML.INPUT.RANGE = function (parent_node, args) {
    args = args ? args : {};
    args.type = "range";
    return $.HTML.INPUT.call(this, parent_node, args);
};
$.HTML.INPUT.RANGE.prototype = Object.create($.HTML.INPUT.prototype);

$.HTML.TEXTNODE = function (parent_node, text) {
    return $.HTML.call(this, parent_node, "", text);
};
$.HTML.TEXTNODE.prototype = Object.create($.HTML.prototype);

$.HTML.IMG = function (parent_node, args) {
    return $.HTML.call(this, parent_node, "img", args);
};
$.HTML.IMG.prototype = Object.create($.HTML.prototype);

$.HTML.CANVAS = function (parent_node, args) {
    return $.HTML.call(this, parent_node, "canvas", args);
};
$.HTML.CANVAS.prototype = Object.create($.HTML.prototype);

/*
 * $.HTML.show to show the specified element.
 * @param[in] elem
 *  the element to show.
 */
$.HTML.show = function (elem) {
    elem.style.visibility = "visible";
};

/*
 * $.HTML.hide to hide the specified element.
 * @param[in] elem
 *  the element to hide.
 */
$.HTML.hide = function (elem) {
    elem.style.visibility = "hidden";
};
