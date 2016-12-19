/*
 * container.js
 *
 * implements an html elements container.
 * 
 * @author jacob_shih
 * @date 12/01/2016 17:29:22
 * 
 */

function Container(parent, name) {
    this.parent = parent;
    this.name = name;
    if(parent === null) {
        this.contr = document.body;
    } else {
        this.contr = this.getContainer(name);
        this.parent.addChild(this);
    }
    this.children = [];
    if(this.onCreate) {
        this.onCreate();
    }
}

Container.prototype.getContainer = function(name) {
    var elem = $(name);
    if(!elem) {
        elem = new $.HTML.DIV(this.parent.contr, {id: name, class: name});
    }
    return elem;
};

Container.prototype.addChild = function(child) {
    this.children.push(child);
};

Container.prototype.removeAllNodes = function() {
    var contr = this.contr;
    while (contr.firstChild) {
        contr.removeChild(contr.firstChild);
    }
};

Container.prototype.draw = function() {
    for(var i in this.children) {
        if(this.children.hasOwnProperty(i)) {
            this.children[i].draw();
        }
    }
};

Container.prototype.onCreate = function() {
};

Container.prototype.show = function() {
     $.HTML.show(this.contr);
};

Container.prototype.hide = function() {
     $.HTML.hide(this.contr);
};
