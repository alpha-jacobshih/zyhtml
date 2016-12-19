/*
 * main.css
 * 
 * application main functions.
 * 
 * @author jacob_shih
 * @date 12/01/2016 21:21:18
 * 
 */

/*
+= containerMain ============================================================+
|+= containerPanel =========================================================+|
||                                                                          ||
||                                                                          ||
|+==========================================================================+|
|+= containerResult ========================================================+|
||                                                                          ||
||                                                                          ||
||                                                                          ||
||                                                                          ||
||                                                                          ||
||                                                                          ||
||                                                                          ||
||                                                                          ||
|+==========================================================================+|
+============================================================================+
 */

function Main() {
    this.jpegbox = null;
}

Main.prototype = Object.create(Container.prototype);

Main.prototype.onDocumentReady = function() {
    var app = App.prototype.getInstance();
    Container.call(this, app, K.CONTAINER_MAIN);
    this.panel = new Panel(this, K.CONTAINER_PANEL);
    this.panel.setEventHandler(this.eventHandler.bind(this));
    this.result = new Result(this, K.CONTAINER_RESULT);
    this.initDragAndDrop();
    app.draw();
};

Main.prototype.draw = function() {
    Container.prototype.draw.call(this);
};

Main.prototype.initDragAndDrop = function() {
    document.body.ondragenter = function(e) { e.preventDefault(); };
    document.body.ondragover = function(e) { e.preventDefault(); };
    document.body.ondrop = this.eventHandler.bind(this);
    document.body.onload = function() {};
};

Main.prototype.openFile = function(filename) {
    if(filename) {
        this.jpegbox = new JpegBox(filename);
        this.jpegbox.onload_callback = this.onImageReady.bind(this);
        this.jpegbox.load(filename);
    }
};

Main.prototype.onImageReady = function() {
    if(this.jpegbox) {
        this.panel.divOpenFile.displayFileName(this.jpegbox.img);
        this.panel.divPreview.showImage(this.jpegbox.img);
        this.panel.divFileInfo.showFileInfo(this.jpegbox.img);
        this.panel.divControl.showControl(this.jpegbox.img);
    }
};

Main.prototype.eventHandler = function(e) {
    e.preventDefault();
    var files;
    if(e instanceof(DragEvent)) {
        files = e.dataTransfer.files;
        this.openFile(files[0]);
    } else if(e.target.id === K.FILE_BUTTON_NAME) {
        if(e.type === "change") {
            files = e.target.files;
            this.openFile(files[0]);
        }
    }
};

var main = new Main();
window.onload = main.onDocumentReady.bind(main);

