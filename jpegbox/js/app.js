/*
 * app.js
 *
 * the class declaration of the application.
 * 
 * @author jacob_shih
 * @date 12/01/2016 17:34:25
 * 
 */

/*
 * App, the application class.
 */
function App() {
    Container.call(this, null);
    this.contr = document.body;
    this.children = [];
    this.loadingIcon = new LoadingIcon(this);
}

App.prototype = Object.create(Container.prototype);

App.prototype.getInstance = function() {
    if(!window.app) {
        window.app = new App();
    }
    return window.app;
};

App.prototype.loading = function(isLoading) {
    this.loadingIcon.show(isLoading);
};

App.prototype.addChild = function(child) {
    this.children.push(child);
};

App.prototype.draw = function() {
    this.loading(true);
    Container.prototype.draw.call(this);
    setTimeout(function() {
        this.loading(false);
    }.bind(this), 500);
};
