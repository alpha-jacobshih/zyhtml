/*
 * page.js
 *
 * constructs and draws the visual elements of the web application.
 * 
 * @author jacob_shih
 * @date 12/01/2016 17:33:37
 * 
 */

function Panel(parent, name) {
    Container.call(this, parent, name);
}

Panel.prototype = Object.create(Container.prototype);

Panel.prototype.onCreate = function() {
    this.divOpenFile = new DivOpenFile(this, K.DIV_OPEN_FILE);
    this.divPreview = new DivPreview(this, K.DIV_PREVIEW);
    this.divFileInfo = new DivFileInfo(this, K.DIV_FILE_INFO);
    this.divControl = new DivControl(this, K.DIV_CONTROL);
};

Panel.prototype.draw = function() {
    Container.prototype.draw.call(this);
};

Panel.prototype.drawOpenFileText = function() {
};

Panel.prototype.onfileload = function() {
    if(this.eventHandler) {
        this.eventHandler(event);
    }
};

Panel.prototype.setEventHandler = function(f) {
    this.eventHandler = f;
};

function DivOpenFile(parent, name) {
    Container.call(this, parent, name);
}

DivOpenFile.prototype = Object.create(Container.prototype);

DivOpenFile.prototype.onCreate = function() {
    var divLoadImage = new $.HTML.DIV(this.contr, {id: K.DIV_LOAD_IMAGE});
    var text_load_image = new $.HTML.TEXTNODE(divLoadImage, K.TEXT_LOAD_IMAGE);     // jshint ignore:line
    var anchor = new $.HTML.A(this.contr, {href: "#", class: K.FILE_BUTTON_NAME});
    var file_button_text = new $.HTML.TEXTNODE(anchor, K.FILE_BUTTON_TEXT);         // jshint ignore:line
    var filebutton = new $.HTML.INPUT.FILE(anchor, {id: K.FILE_BUTTON_NAME});
    this.divFileName = new $.HTML.DIV(this.contr, {id: K.DIV_FILE_NAME});
    this.textFileName = new $.HTML.TEXTNODE(this.divFileName, "");
    var panel = this.parent;
    var hr = new $.HTML.HR(this.contr, "");     // jshint ignore:line
    filebutton.onchange = panel.onfileload.bind(panel);
};

DivOpenFile.prototype.displayFileName = function(img) {
    this.textFileName.data = img.file.name;
};

function DivPreview(parent, name) {
    Container.call(this, parent, name);
}

DivPreview.prototype = Object.create(Container.prototype);

DivPreview.prototype.onCreate = function() {
    this.canvasPreview = new $.HTML.CANVAS(this.contr, {id: "canvasPreview"});
    this.canvasFocusArea = new $.HTML.CANVAS(this.contr, {id: "canvasFocusArea"});
    $.HTML.hide(this.contr);
};

DivPreview.prototype.getPreviewSize = function(img) {
    var w = parseFloat(window.getComputedStyle(this.contr).width);
    var h = parseFloat(window.getComputedStyle(this.contr).height);
    if(img && img.content && img.elem) {
        if(img.elem.width > img.elem.height) {
            // landscape, scaling the height of the thumbnail box
            h = w * (img.elem.height/img.elem.width);
        } else if(img.elem.width < img.elem.height) {
            // portrait, scaling the width of the thumbnail box
            w = h * (img.elem.width/img.elem.height);
        }
    }
    return {"w": w, "h": h};
};

DivPreview.prototype.resize = function(size) {
    this.contr.style.width = size.w+"px";
    this.contr.style.height = size.h+"px";
};

DivPreview.prototype.showImage = function(img) {
    this.img = img;
    var size = this.getPreviewSize(img);
    this.resize(size);
    this.initFocusArea(size);
    var ctx = this.canvasPreview.getContext("2d");
    this.canvasPreview.width = size.w;
    this.canvasPreview.height = size.h;
    ctx.drawImage(img.elem, 0, 0, size.w, size.h);
    $.HTML.show(this.contr);
};

DivPreview.prototype.initFocusArea = function(size) {
    this.canvasFocusArea.width = size.w;
    this.canvasFocusArea.height = size.h;
};

DivPreview.prototype.drawFocusArea = function(x, y, w, h) {
    var canvasFocusAreaW = this.canvasFocusArea.width;
    var canvasFocusAreaH = this.canvasFocusArea.height;
    var scaleX = canvasFocusAreaW / this.img.elem.width;
    var scaleY = canvasFocusAreaH / this.img.elem.height;
    var ctx = this.canvasFocusArea.getContext("2d");
    ctx.clearRect(0, 0, canvasFocusAreaW, canvasFocusAreaH);
    ctx.strokeStyle="#FF0000";
    ctx.strokeRect(x*scaleX, y*scaleY, w*scaleX, h*scaleY);
};

function DivFileInfo(parent, name) {
    Container.call(this, parent, name);
}

DivFileInfo.prototype = Object.create(Container.prototype);

DivFileInfo.prototype.onCreate = function() {
    var fileInfoTable = new $.HTML.TABLE(this.contr, {id: "tableFileInfo"});
    this.textFileSize = new $.HTML.TEXTNODE(null, "File size");
    this.valueFileSize = new $.HTML.TEXTNODE(null, "");
    this.textFileType = new $.HTML.TEXTNODE(null, "File type");
    this.valueFileType = new $.HTML.TEXTNODE(null, "");
    this.textWidth = new $.HTML.TEXTNODE(null, "Width");
    this.valueWidth = new $.HTML.TEXTNODE(null, "");
    this.textHeight = new $.HTML.TEXTNODE(null, "Height");
    this.valueHeight = new $.HTML.TEXTNODE(null, "");
    $.HTML.TABLE.addRow(fileInfoTable, [this.textFileSize, this.valueFileSize]);
    $.HTML.TABLE.addRow(fileInfoTable, [this.textFileType, this.valueFileType]);
    $.HTML.TABLE.addRow(fileInfoTable, [this.textWidth, this.valueWidth]);
    $.HTML.TABLE.addRow(fileInfoTable, [this.textHeight, this.valueHeight]);
    $.HTML.hide(this.contr);
};

DivFileInfo.prototype.showFileInfo = function(img) {
    this.valueFileSize.data = img.file.size ? img.file.size.toLocaleString() + " bytes" : "-";
    this.valueFileType.data = img.file.type;
    this.valueWidth.data = img.elem.width;
    this.valueHeight.data = img.elem.height;
    $.HTML.show(this.contr);
};

function DivControl(parent, name) {
    Container.call(this, parent, name);
}

DivControl.prototype = Object.create(Container.prototype);

DivControl.prototype.onCreate = function() {
    var labels = ["x", "y", "w", "h"];
    var inputs = [];
    this.divControlFocusArea = new $.HTML.DIV(this.contr, {id: "divControlFocusArea"});
    var focusTable = new $.HTML.TABLE(divControlFocusArea, {id: "tableFocusArea"});
    $.HTML.TABLE.addRow(focusTable, labels);
    for(i = 0; i < 4; i++) {
        inputs[i] = new $.HTML.INPUT.TEXT(null, {value: 0, size: 4, maxlength: 4});
        inputs[i].onchange = this.onFocusAreaChanged.bind(this);
    }
    this.inputRectX = inputs[0];
    this.inputRectY = inputs[1];
    this.inputRectW = inputs[2];
    this.inputRectH = inputs[3];
    $.HTML.TABLE.addRow(focusTable, inputs);
    // default size full, half, quater, eighth.
    this.radios = {
        full:   { name: "focusSize", id: "focusFull",   text: "Full", value: 1 },
        half:   { name: "focusSize", id: "focusHalf",   text: "1/2",  value: 0.5 },
        quater: { name: "focusSize", id: "focusQuater", text: "1/4",  value: 0.25 },
        eighth: { name: "focusSize", id: "focusEighth", text: "1/8",  value: 0.125 },
    };
    var trRadios = new $.HTML.TR(focusTable);
    var rowRadios = new $.HTML.TD(trRadios, {colspan: 4, style: "text-align: right;"});
    var divRadios = new $.HTML.DIV(rowRadios);
    for(var x in this.radios) {
        if(this.radios.hasOwnProperty(x)) {
            var o = this.radios[x];
            this.radios[x].radio = new $.HTML.INPUT.RADIO(divRadios, {name: o.name, id: o.id, value: o.value});
            this.radios[x].label = new $.HTML.LABEL(divRadios, {for: o.id});
            this.radios[x].text  = new $.HTML.TEXTNODE(this.radios[x].label, o.text);
            this.radios[x].radio.onclick = this.onDefaultSize.bind(this);
        }
    }
// +++
// FIXME: REMOVED
var trRange = new $.HTML.TR(focusTable);
var rowRange = new $.HTML.TD(trRange, {colspan: 4, style: "text-align: right;"});
var divTolerance = new $.HTML.DIV(rowRange);
this.addToleranceSlider(divTolerance);
// ---
    $.HTML.hide(this.contr);
};

DivControl.prototype.addToleranceSlider = function(parent_node) {
    var defaultTolerance = 3;
    var divToleranceLabel = new $.HTML.DIV(parent_node, {id: "divToleranceLabel"});
    var divToleranceValue = new $.HTML.DIV(parent_node, {id: "divToleranceValue"});
    var divToleranceSlider = new $.HTML.DIV(parent_node, {id: "divToleranceSlider"});
    this.labelTolerance = new $.HTML.TEXTNODE(divToleranceLabel, "Tolerance: ");
    this.valueTolerance = new $.HTML.TEXTNODE(divToleranceValue, defaultTolerance);
    this.tolerance = new $.HTML.INPUT.RANGE(divToleranceSlider, {id: "tolerance", min: 0, max: 50, step: 1, value: defaultTolerance});
    this.tolerance.onchange = (function() {
        this.valueTolerance.data = this.tolerance.value;
        var result = this.parent.parent.result;
        result.displayReport();
        result.drawBarChart();
        result.displayDistribution();
    }).bind(this);
};

DivControl.prototype.drawFocusArea = function(x, y, w, h) {
    this.parent.divPreview.drawFocusArea(x, y, w, h);
    var result = this.parent.parent.result;
    result.drawTargetArea(x, y, w, h);
    result.displayReport();
    result.drawBarChart();
    result.displayDistribution();
};

DivControl.prototype.onDefaultSize = function(e) {
    var scale = e.target.value;
    var w = this.img.elem.width * scale;
    var h = this.img.elem.height * scale;
    var x = Math.floor((this.img.elem.width - w) / 2);
    var y = Math.floor((this.img.elem.height - h) / 2);
    this.inputRectX.value = x;
    this.inputRectY.value = y;
    this.inputRectW.value = w;
    this.inputRectH.value = h;
    this.drawFocusArea(x, y, w, h);
};

DivControl.prototype.onFocusAreaChanged = function(e) {
    e.preventDefault();
    var x = this.inputRectX.value;
    var y = this.inputRectY.value;
    var w = this.inputRectW.value;
    var h = this.inputRectH.value;
    this.drawFocusArea(x, y, w, h);
};

DivControl.prototype.showControl = function(img) {
    this.img = img;
    this.inputRectX.value = 0;
    this.inputRectY.value = 0;
    this.inputRectW.value = img.elem.width;
    this.inputRectH.value = img.elem.height;
    this.radios.eighth.radio.click();
    $.HTML.show(this.contr);
};

function Result(parent, name) {
    Container.call(this, parent, name);
}

Result.prototype = Object.create(Container.prototype);

Result.prototype.onCreate = function() {
    this.divTargetArea = new DivTargetArea(this, K.DIV_TARGET_AREA);
    this.divReport = new DivReport(this, K.DIV_REPORT);
    this.divBarChart = new DivBarChart(this, K.DIV_BAR_CHART);
    this.divDistribution = new DivDistribution(this, K.DIV_DISTRIBUTION);
// +++
// FIXME: REMOVED
//this.dummy = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,2,8,22,45,99,182,318,606,1140,1734,2540,3133,3365,3173,3046,2796,2210,1657,1143,762,512,367,376,358,382,308,221,141,82,62,51,24,12,9,3,3,3,5,2,3,3,6,3,7,1,1,2,4,4,3,3,8,3,2,7,10,9,14,14,20,9,17,14,2,2,5,9,7,7,1,3,8,4,4,2,4,22,11,20,19,33,28,26,13,7,15,22,55,96,125,143,83,97,111,94,123,58,32,17,17,3,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//this.drawBarChart();
// ---
};

Result.prototype.draw = function() {
};

Result.prototype.displayReport = function() {
    var pixels = {
        valid: 0,
        noise: 0,
        total: 0,
        };
    var data = this.statistics;
    for(var i = 0; i < data.length; i++) {
        if(this.checkTolerance(i)) {
            pixels.valid += data[i];
        } else {
            pixels.noise += data[i];
        }
        pixels.total += data[i];
    }
    this.divReport.displayReport("noise ratio: "+(pixels.noise / pixels.total).toFixed(2)+" %");
};

Result.prototype.drawTargetArea = function(x, y, w, h) {
    this.divTargetArea.drawTargetArea(x, y, w, h);
};

Result.prototype.drawBarChart = function() {
    this.divBarChart.drawBarChart();
};

Result.prototype.displayDistribution = function() {
    this.divDistribution.displayDistribution();
};

Result.prototype.getImage = function() {
    var img = this.parent.panel.divPreview.img;
    return img;
};

Result.prototype.getStatistics = function() {
// +++
// FIXME: REMOVED
    if(this.dummy) {
        return this.dummy;
    }
// ---
    return this.statistics;
};

Result.prototype.getImageData = function() {
    return this.imagedata;
};

Result.prototype.setImageData = function(imagedata) {
    // this.statistics: distibution of the grey scale values.
    this.statistics = new Array(256).fill(0);
    this.imagedata = imagedata;
    var size = this.divTargetArea.getCanvasSize();
    var i, j;
    for(i=0; i < size.h; i++) {
        for(j=0; j < size.w; j++) {
            var n = (i * size.w + j) * 4;
            var greyscalevalue = this.imagedata[n];
            this.statistics[greyscalevalue]++;
        }
    }
    var value = Math.max.apply(Math, this.statistics);
    var index = this.statistics.findIndex(function(element, index, array) { // jshint ignore: line
        return element == value;
    });
    this.pole = { index: index, value: value };
};

Result.prototype.getTolerance = function() {
   return this.parent.panel.divControl.tolerance.value;
};

Result.prototype.checkTolerance = function(index) {
    var poleposition = this.pole.index + 1;
    var ppLeft = (poleposition*(1-this.getTolerance()/100));
    var ppRight = (poleposition*(1+this.getTolerance()/100));
    return (index >= ppLeft && index <= ppRight);
};

function DivReport(parent, name) {
    Container.call(this, parent, name);
}

DivReport.prototype = Object.create(Container.prototype);

DivReport.prototype.onCreate = function() {
    $.HTML.hide(this.contr);
};

DivReport.prototype.displayReport = function(s) {
    this.removeAllNodes();
    this.report = new $.HTML.TEXTNODE(this.contr, s);
    $.HTML.show(this.contr);
};

function DivTargetAreaPopup(parent, name) {
    Container.call(this, parent, name);
}

DivTargetAreaPopup.prototype = Object.create(Container.prototype);

DivTargetAreaPopup.prototype.onCreate = function() {
    $.HTML.hide(this.contr);
};

DivTargetAreaPopup.prototype.show = function() {
    $.HTML.show(this.contr);
};

DivTargetAreaPopup.prototype.hide = function() {
    $.HTML.hide(this.contr);
};

DivTargetAreaPopup.prototype.displayText = function(x, y, text) {
    this.removeAllNodes();
    this.text = new $.HTML.TEXTNODE(this.contr, text);
    this.contr.style.left = x + "px";
    this.contr.style.top = y + "px";
};

function DivTargetArea(parent, name) {
    Container.call(this, parent, name);
}

DivTargetArea.prototype = Object.create(Container.prototype);

DivTargetArea.prototype.onCreate = function() {
    $.HTML.hide(this.contr);
};

DivTargetArea.prototype.getCanvasSize = function() {
    return {w: this.canvasTargetArea.width, h: this.canvasTargetArea.height};
};

DivTargetArea.prototype.onMouseEvent = function() {
    var e = window.event;
    if(e instanceof MouseEvent && e.target == this.canvasTargetArea) {
        if(e.type === "mouseover") {
            this.divPopup.show();
        } else if(e.type === "mouseout") {
            this.divPopup.hide();
        } else if(e.type === "mousemove") {
            var result = this.parent;
            var size = result.divTargetArea.getCanvasSize();
            var x = e.layerX;
            var y = e.layerY;
            if(x>=0 && x<size.w && y>=0 && y<size.h) {
                var imagedata = result.getImageData();
                var n = (y * size.w + x) * 4;
                var r = imagedata[n+0];
                var g = imagedata[n+1];
                var b = imagedata[n+2];
                var color = "RGB("+r+","+g+","+b+")";
                var text = "x: "+x+", y: "+y+" : "+color;
                this.divPopup.displayText(x + 10, y + 10, text);
            }
        }
    }
};

DivTargetArea.prototype.drawTargetArea = function(x, y, w, h) {
    this.removeAllNodes();
    this.canvasTargetArea = new $.HTML.CANVAS(this.contr, {id: K.CANVAS_TARGET_AREA});
    this.divPopup = new DivTargetAreaPopup(this, K.DIV_TARGET_AREA_POPUP);
    var img = this.parent.getImage();
    var canvas = this.canvasTargetArea;
    var ctx = canvas.getContext("2d");
    canvas.width = w;
    canvas.height = h;
    ctx.drawImage(img.elem, x, y, w, h, 0, 0, w, h);
    var imagedata = ctx.getImageData(0, 0, w, h);
    this.parent.setImageData(imagedata.data);
    this.canvasTargetArea.onmousemove = this.onMouseEvent.bind(this);
    this.canvasTargetArea.onmouseover = this.onMouseEvent.bind(this);
    this.canvasTargetArea.onmouseout  = this.onMouseEvent.bind(this);
    $.HTML.show(this.contr);
};

function BarChart(parent, name, width, height, color, barWidth, tolerance, data) {
    this.width = width ? width : 100;
    this.height = height ? height : 100;
    this.bar = {
        color: color ? color : "#808080",
        width: barWidth ? barWidth : 2,
    };
    this.tolerance = tolerance;
    this.setData(data);
    Container.call(this, parent, name);
}

BarChart.prototype = Object.create(Container.prototype);

BarChart.prototype.onCreate = function() {
    this.canvas = new $.HTML.CANVAS(this.contr, {width: this.width, height: this.height});
    $.HTML.hide(this.contr);
};

BarChart.prototype.setAttributes = function(attr) {
    if(attr.hasOwnProperty("width")) {
        this.width = attr.width;
    }
    if(attr.hasOwnProperty("height")) {
        this.height = attr.height;
    }
    if(attr.hasOwnProperty("bar")) {
        if(attr.bar.hasOwnProperty("color")) {
            this.bar.color = attr.bar.color;
        }
        if(attr.hasOwnProperty("width")) {
            this.bar.width = attr.bar.width;
        }
    }
    if(attr.hasOwnProperty("data")) {
        this.data = attr.data;
    }
};

BarChart.prototype.setData = function(data) {
    this.data = data;
    if(this.data) {
        var value = Math.max.apply(Math, this.data);
        var index = data.findIndex(function(element, index, array) { // jshint ignore: line
            return element == value;
        });
        this.pole = { index: index, value: value };
    }
};

BarChart.prototype.onSizeChanged = function() {
    
};

BarChart.prototype.drawChart = function() {
    var margin = {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
    };
    var data = this.data;
    this.canvas.width = (data.length * (this.bar.width + 1)) + margin.left + margin.right;
    var ctx = this.canvas.getContext("2d");
    var gradient = ctx.createLinearGradient(0, 0, this.canvas.width, 10);
    var poleposition = this.pole.index + 1;
    var pp = poleposition/data.length;
    var ppLeft = (poleposition*(1-this.tolerance/100))/data.length;
    var ppRight = (poleposition*(1+this.tolerance/100))/data.length;
    gradient.addColorStop(0, "lightgrey");
    gradient.addColorStop(ppLeft, "lightgrey");
    gradient.addColorStop(pp, "blue");
    gradient.addColorStop(ppRight, "lightgrey");
    gradient.addColorStop(1.0, "lightgrey");
    ctx.fillStyle = gradient;
    var chart_height = this.canvas.height - margin.bottom - margin.top;
    for(var i=0; i<data.length; i++) {
        var value = data[i];
        if(value) {
            var x = i * (this.bar.width + 1) + margin.left;
            var y = this.canvas.height - margin.bottom;
            var w = this.bar.width;
            var h = -(chart_height * value / this.pole.value);
            ctx.fillRect(x, y, w, h);
        }
    }
    $.HTML.show(this.contr);
};

function DivBarChart(parent, name) {
    Container.call(this, parent, name);
}

DivBarChart.prototype = Object.create(Container.prototype);

DivBarChart.prototype.onCreate = function() {
    $.HTML.hide(this.contr);
};

DivBarChart.prototype.drawBarChart = function() {
    this.removeAllNodes();
    var result = this.parent;
    var statistics = result.getStatistics();
    var tolerance = result.getTolerance();
    this.chart = new BarChart(this, K.DIV_CANVAS_BAR_CHART, K.CHART.WIDTH, K.CHART.HEIGHT, K.CHART.BAR.COLOR, K.CHART.BAR.WIDTH, tolerance, statistics);
    this.chart.drawChart();
    $.HTML.show(this.contr);
};

function DivDistribution(parent, name) {
    Container.call(this, parent, name);
}

DivDistribution.prototype = Object.create(Container.prototype);

DivDistribution.prototype.onCreate = function() {
    $.HTML.hide(this.contr);
};

DivDistribution.prototype.displayDistribution = function() {
    this.removeAllNodes();
    var result = this.parent;
    var statistics = result.getStatistics();
    var distributionTable = new $.HTML.TABLE(this.contr, {id: "tableDistribution"});
    this.textGreyScaleValue = new $.HTML.TEXTNODE(null, "Grey scale value");
    this.valueGreyScaleValue = new $.HTML.TEXTNODE(null, "Count");
    $.HTML.TABLE.addRow(distributionTable, [this.textGreyScaleValue, this.valueGreyScaleValue], {style: "font-weight: bold;"});
    for(var i=0; i<statistics.length; i++) {
        if(result.checkTolerance(i)) {
            $.HTML.TABLE.addRow(distributionTable, [i.toString(), statistics[i].toString()], {style: "color: blue; font-weight: bold;"} );
        } else {
            $.HTML.TABLE.addRow(distributionTable, [i.toString(), statistics[i].toString()], {style: "color: lightgrey;"} );
        }
    }
    $.HTML.show(this.contr);
};

