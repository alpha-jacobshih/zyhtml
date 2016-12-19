/*
 * jpegbox.js
 *
 * processes the jpeg file to load and analysis the pixel data.
 * 
 * @author jacob_shih
 * @date 12/01/2016 17:30:59
 * 
 */

function JpegBox(filename) {
    this.filename = filename;
    this.onload_callback = null;
    this.img = {
        "content": null,
        "elem": null,
        "data": null,
        "file": null,
    };
}

JpegBox.prototype.draw = function(img_elem) {
    $.HTML.show(img_elem);
    img_elem.src = this.img.content;
};

JpegBox.prototype.setImage = function(img_elem) {
    var processCanvas = false;
    if(processCanvas) {
        this.canvas = new $.HTML.CANVAS(document.body, {id: "tCanvas", style: "display: none;"});
        var canvas = this.canvas;
        var ctx = canvas.getContext("2d");
        canvas.width = img_elem.width;
        canvas.height = img_elem.height;
        // it takes 1 second to draw the image of size 4000 x 3000 to canvas.
        ctx.drawImage(img_elem, 0, 0, img_elem.width, img_elem.height);
        var imagedata = ctx.getImageData(0, 0, img_elem.width, img_elem.height);
        this.img.data = imagedata.data;
    }
    if(this.onload_callback) {
        this.onload_callback();
    }
};

JpegBox.prototype.onload = function(filereader) {
        var that = this;
        var filereader_result = filereader.result;
        var img_elem = new Image();
        this.img.content = filereader_result;
        this.img.elem = img_elem;
        this.img.file = filereader.file;
        // a time consuming statement, it takes 1 more second to draw the image of size 4000 x 3000 to image element.
        img_elem.src = this.img.content;
        img_elem.onload = function() {
            // this is img_elem, that is instance of JpegBox.
            that.setImage.call(that, this);
            that.loading(false);
        };
};

JpegBox.prototype.load = function(filename) {
    this.loading(true);
    this.filereader = new FileReader();
    filereader = this.filereader;
    var that = this;
    filereader.file = filename;
    filereader.onloadend = function() {
        that.onload.call(that, this);
    };
    filereader.readAsDataURL(filename);
};

JpegBox.prototype.loading = function(isLoading) {
    App.prototype.getInstance().loading(isLoading);
};

