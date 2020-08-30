"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptImageBuilder = exports.ImageType = exports.FontWeight = exports.Alignment = void 0;
var htmlToImage = __importStar(require("html-to-image"));
var makePixel = function (num) { return num + "px"; };
var Alignment;
(function (Alignment) {
    Alignment["Left"] = "left";
    Alignment["Center"] = "center";
    Alignment["Right"] = "right";
})(Alignment = exports.Alignment || (exports.Alignment = {}));
var FontWeight;
(function (FontWeight) {
    FontWeight["Normal"] = "400";
    FontWeight["Bold"] = "bold";
})(FontWeight = exports.FontWeight || (exports.FontWeight = {}));
var ImageType;
(function (ImageType) {
    ImageType[ImageType["PNG"] = 0] = "PNG";
    ImageType[ImageType["JPEG"] = 1] = "JPEG";
})(ImageType = exports.ImageType || (exports.ImageType = {}));
var HTMLElem;
(function (HTMLElem) {
    HTMLElem["Div"] = "div";
    HTMLElem["P"] = "p";
})(HTMLElem || (HTMLElem = {}));
var ReceiptImageBuilder = /** @class */ (function () {
    function ReceiptImageBuilder(width) {
        this.parent = document.createElement(HTMLElem.Div);
        this.parentId = "ReceiptBuilderParentIdNeetbit";
        this.imageQuality = 1;
        this.align = Alignment.Left;
        this.backgroundColor = "white";
        this.color = "black";
        this.fontWeight = FontWeight.Normal;
        this.paddingBottom = 0;
        this.paddingLeft = 0;
        this.paddingRight = 0;
        this.paddingTop = 0;
        this.textSize = 12;
        this.width = 600;
        this.width = width;
        this.makeNewRow();
    }
    ReceiptImageBuilder.prototype.addImage = function (imageUrl) {
        var imageContainer = document.createElement(HTMLElem.Div);
        imageContainer.style.width = "100%";
        imageContainer.style.display = "flex";
        imageContainer.style.justifyContent = "center";
        imageContainer.style.margin = "10px 0";
        var image = new Image();
        image.src = imageUrl;
        image.style.height = "50px";
        imageContainer.appendChild(image);
        this.parent.appendChild(imageContainer);
        return this;
    };
    ReceiptImageBuilder.prototype.addEmptyElement = function (height, dotted) {
        var line = document.createElement(HTMLElem.Div);
        line.style.height = makePixel(height);
        if (dotted)
            line.style.borderBottom = "1px dashed black";
        this.parent.appendChild(line);
        return this;
    };
    ReceiptImageBuilder.prototype.makeNewRow = function () {
        this.row = document.createElement(HTMLElem.Div);
        this.row.style.display = "grid";
        this.row.style.gridTemplateColumns = "repeat(3, auto)";
        this.row.style.gridGap = makePixel(10);
    };
    ReceiptImageBuilder.prototype.addBlankSpace = function (height) {
        return this.addEmptyElement(height, false);
    };
    ReceiptImageBuilder.prototype.addLine = function (size) {
        this.addRow();
        return this.addEmptyElement(size || 1, true);
    };
    ReceiptImageBuilder.prototype.addRow = function () {
        this.parent.appendChild(this.row);
        this.makeNewRow();
        return this;
    };
    ReceiptImageBuilder.prototype.addParagraph = function () {
        return this.addEmptyElement(this.textSize, false);
    };
    ReceiptImageBuilder.prototype.addText = function (text, changeLine) {
        if (changeLine === void 0) { changeLine = true; }
        var p = document.createElement(HTMLElem.P);
        p.textContent = text;
        p.style.color = this.color;
        p.style.fontSize = makePixel(this.textSize);
        p.style.fontWeight = this.fontWeight;
        switch (this.align) {
            case Alignment.Left:
                p.style.gridColumn = "1/2";
                p.style.justifySelf = "start";
                break;
            case Alignment.Center:
                p.style.gridColumn = "2/3";
                p.style.justifySelf = "center";
                break;
            case Alignment.Right:
                p.style.gridColumn = "3/4";
                p.style.justifySelf = "end";
                break;
        }
        this.row.appendChild(p);
        if (changeLine)
            this.addRow();
        return this;
    };
    ReceiptImageBuilder.prototype.setAlign = function (align) {
        this.align = align;
        return this;
    };
    ReceiptImageBuilder.prototype.setBackgroundColor = function (backgroundColor) {
        this.backgroundColor = backgroundColor;
        return this;
    };
    ReceiptImageBuilder.prototype.setColor = function (color) {
        this.color = color;
        return this;
    };
    ReceiptImageBuilder.prototype.setFontWeight = function (fontWeight) {
        this.fontWeight = fontWeight;
        return this;
    };
    ReceiptImageBuilder.prototype.setPaddingAll = function (padding) {
        this.paddingLeft = this.paddingBottom = this.paddingTop = this.paddingRight = padding;
        return this;
    };
    ReceiptImageBuilder.prototype.setPaddingBottom = function (padding) {
        this.paddingBottom = padding;
        return this;
    };
    ReceiptImageBuilder.prototype.setPaddingHomogenous = function (paddingTopBottom, paddingLeftRight) {
        this.paddingTop = this.paddingBottom = paddingTopBottom;
        this.paddingLeft = this.paddingRight = paddingLeftRight;
        return this;
    };
    ReceiptImageBuilder.prototype.setPaddingLeft = function (padding) {
        this.paddingLeft = padding;
        return this;
    };
    ReceiptImageBuilder.prototype.setPaddingRight = function (padding) {
        this.paddingRight = padding;
        return this;
    };
    ReceiptImageBuilder.prototype.setPaddingTop = function (padding) {
        this.paddingTop = padding;
        return this;
    };
    ReceiptImageBuilder.prototype.setTextSize = function (textSize) {
        this.textSize = textSize;
        return this;
    };
    /*
    * A number between 0 and 1 indicating image quality (e.g. 0.92 => 92%) of the image.
    * Defaults to 1.0 (100%)
    * */
    ReceiptImageBuilder.prototype.setImageQuality = function (quality) {
        this.imageQuality = quality;
        return this;
    };
    ReceiptImageBuilder.prototype.buildHTMLElement = function () {
        var hidden = document.createElement(HTMLElem.Div);
        hidden.style.opacity = "0";
        hidden.style.height = "0";
        hidden.style.width = "0";
        document.body.appendChild(hidden);
        var shadow = hidden.attachShadow({ mode: "open" });
        this.parent.id = this.parentId;
        this.parent.style.width = makePixel(this.width);
        this.parent.style.paddingBottom = makePixel(this.paddingBottom);
        this.parent.style.paddingTop = makePixel(this.paddingTop);
        this.parent.style.paddingRight = makePixel(this.paddingRight);
        this.parent.style.paddingLeft = makePixel(this.paddingLeft);
        this.parent.style.backgroundColor = this.backgroundColor;
        shadow.appendChild(this.parent);
        var el = shadow.getElementById(this.parentId);
        return [el, hidden];
    };
    /*
    * Can set image type (PNG, JPEG). Defaults to PNG.
    * Returns Promise with HTMLImageElement.
    * */
    ReceiptImageBuilder.prototype.buildImage = function (type) {
        if (type === void 0) { type = ImageType.PNG; }
        return this.getRawData(type)
            .then(function (dataUrl) {
            var img = new Image();
            img.src = dataUrl;
            return img;
        });
    };
    /*
    * Can set image type (PNG, JPEG). Defaults to PNG.
    * Returns Promise with a PNG image base64-encoded data URL, a compressed JPEG image.
    * */
    ReceiptImageBuilder.prototype.getRawData = function (type) {
        if (type === void 0) { type = ImageType.PNG; }
        var options = { quality: this.imageQuality };
        var _a = this.buildHTMLElement(), el = _a[0], hidden = _a[1];
        var imageDataPromise = type === ImageType.JPEG
            ? htmlToImage.toJpeg(el, options)
            : htmlToImage.toPng(el, options);
        return imageDataPromise.then(function (rawData) {
            el.remove();
            hidden.remove();
            return rawData;
        });
    };
    ReceiptImageBuilder.prototype.getPixelData = function () {
        var _a = this.buildHTMLElement(), el = _a[0], hidden = _a[1];
        return htmlToImage
            .toPixelData(el)
            .then(function (rawData) {
            el.remove();
            hidden.remove();
            return rawData;
        });
    };
    return ReceiptImageBuilder;
}());
exports.ReceiptImageBuilder = ReceiptImageBuilder;
//# sourceMappingURL=ReceiptImageBuilder.js.map