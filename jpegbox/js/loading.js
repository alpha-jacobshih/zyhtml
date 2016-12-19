/*
 * loading.js
 *
 * draws a loading icon.
 * 
 * @author jacob_shih
 * @date 12/01/2016 17:31:49
 * 
 */

/*
 * LoadingIcon, draws a loading icon.
 */
LoadingIcon = function(parent) {
    this.parent = parent;
    this.DIV_LOADING = "divLoading";
    this.DIV_BLANKET = "divBlanket";
    var rect = { w: 40, h: 40};
    this.addLoadingIcon(this.DIV_LOADING, this.DIV_BLANKET);
    return new Popup(this.DIV_LOADING, this.DIV_BLANKET, rect.w, rect.h);
};

LoadingIcon.prototype.addLoadingIcon = function(loading, blanket) {
    /*
        <div id="divBlanket" style="display:none;"></div>
        <div id="divLoading" style="display:none;">
          <div id='divLoadingIcon'>
            <div class="sk-circle">
              <div class="sk-circle1  sk-child"></div>
              <div class="sk-circle2  sk-child"></div>
              <div class="sk-circle3  sk-child"></div>
              <div class="sk-circle4  sk-child"></div>
              <div class="sk-circle5  sk-child"></div>
              <div class="sk-circle6  sk-child"></div>
              <div class="sk-circle7  sk-child"></div>
              <div class="sk-circle8  sk-child"></div>
              <div class="sk-circle9  sk-child"></div>
              <div class="sk-circle10 sk-child"></div>
              <div class="sk-circle11 sk-child"></div>
              <div class="sk-circle12 sk-child"></div>
            </div>
          </div>
        </div>
     */
    var divBlanket = $(blanket);
    var divLoading = $(loading);
    var contr = this.parent.contr;
    if(!divBlanket) {
        divBlanket = new $.HTML.DIV(contr, {id: blanket, style: "display: none;"});
    }
    if(!divLoading) {
        var DIV_LOADING_ICON = "divLoadingIcon";
        var DIV_CLASS_CIRCLE = "sk-circle";
        var DIV_CLASS_CHILD = "sk-child";
        divLoading = new $.HTML.DIV(contr, {id: loading, style: "display: none;"});
        divLoadingIcon = new $.HTML.DIV(divLoading, {id: DIV_LOADING_ICON});
        divCircle = new $.HTML.DIV(divLoadingIcon, {class: DIV_CLASS_CIRCLE});
        var bubbles = 12;
        for(var i=0; i<bubbles; i++) {
            var n = i+1;
            divCircleElem = new $.HTML.DIV(divCircle, {class: DIV_CLASS_CIRCLE+n+" "+DIV_CLASS_CHILD});
        }
    }
};
