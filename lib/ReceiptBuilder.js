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
exports.ReceiptBuilder = exports.Alignment = void 0;
var htmlToImage = __importStar(require("html-to-image"));
var makePixel = function (num) { return num + "px"; };
var Alignment;
(function (Alignment) {
    Alignment["Left"] = "left";
    Alignment["Center"] = "center";
    Alignment["Right"] = "right";
})(Alignment = exports.Alignment || (exports.Alignment = {}));
var HTMLElem;
(function (HTMLElem) {
    HTMLElem["Div"] = "div";
    HTMLElem["P"] = "p";
    HTMLElem["Br"] = "br";
})(HTMLElem || (HTMLElem = {}));
var ReceiptBuilder = /** @class */ (function () {
    function ReceiptBuilder(width) {
        this.parent = document.createElement(HTMLElem.Div);
        this.parentId = "ReceiptBuilderParentIdNeetbit";
        this.align = Alignment.Center;
        this.backgroundColor = "white";
        this.color = "black";
        this.marginBottom = 0;
        this.marginLeft = 0;
        this.marginRight = 0;
        this.marginTop = 0;
        this.textSize = 12;
        this.width = 600;
        this.width = width;
    }
    ReceiptBuilder.prototype.addEmptyElement = function (height) {
        var line = document.createElement(HTMLElem.Br);
        line.style.height = makePixel(height);
        this.parent.appendChild(line);
        return this;
    };
    ReceiptBuilder.prototype.addBlankSpace = function (height) {
        return this.addEmptyElement(height);
    };
    ReceiptBuilder.prototype.addLine = function (size) {
        return this.addEmptyElement(size || this.width - this.marginRight - this.marginLeft);
    };
    ReceiptBuilder.prototype.addParagraph = function () {
        return this.addEmptyElement(this.textSize);
    };
    ReceiptBuilder.prototype.addText = function (text, newLine) {
        if (newLine === void 0) { newLine = false; }
        var p = document.createElement(HTMLElem.P);
        p.textContent = text;
        p.style.color = this.color;
        p.style.fontSize = makePixel(this.textSize);
        this.parent.appendChild(p);
        if (newLine)
            this.addLine();
        return this;
    };
    ReceiptBuilder.prototype.getHeight = function () {
        //TODO
        return 500;
    };
    ReceiptBuilder.prototype.setAlign = function (align) {
        this.align = align;
        return this;
    };
    ReceiptBuilder.prototype.setBackgroundColor = function (backgroundColor) {
        this.backgroundColor = backgroundColor;
        return this;
    };
    ReceiptBuilder.prototype.setColor = function (color) {
        this.color = color;
        return this;
    };
    ReceiptBuilder.prototype.setMarginAll = function (margin) {
        this.marginLeft = this.marginBottom = this.marginTop = this.marginRight = margin;
        return this;
    };
    ReceiptBuilder.prototype.setMarginBottom = function (margin) {
        this.marginBottom = margin;
        return this;
    };
    ReceiptBuilder.prototype.setMarginHomogenous = function (marginTopBottom, marginLeftRight) {
        this.marginTop = this.marginBottom = marginTopBottom;
        this.marginLeft = this.marginRight = marginLeftRight;
        return this;
    };
    ReceiptBuilder.prototype.setMarginLeft = function (margin) {
        this.marginLeft = margin;
        return this;
    };
    ReceiptBuilder.prototype.setMarginRight = function (margin) {
        this.marginRight = margin;
        return this;
    };
    ReceiptBuilder.prototype.setMarginTop = function (margin) {
        this.marginTop = margin;
        return this;
    };
    ReceiptBuilder.prototype.setTextSize = function (textSize) {
        this.textSize = textSize;
        return this;
    };
    ReceiptBuilder.prototype.build = function () {
        var hidden = document.createElement(HTMLElem.Div);
        hidden.style.opacity = "0";
        hidden.style.height = "0";
        hidden.style.width = "0";
        document.body.appendChild(hidden);
        var shadow = hidden.attachShadow({ mode: "open" });
        this.parent.id = this.parentId;
        this.parent.style.marginBottom = makePixel(this.marginBottom);
        this.parent.style.marginTop = makePixel(this.marginTop);
        this.parent.style.marginRight = makePixel(this.marginRight);
        this.parent.style.marginLeft = makePixel(this.marginLeft);
        this.parent.style.backgroundColor = this.backgroundColor;
        this.parent.style.height = makePixel(this.getHeight());
        this.parent.style.width = makePixel(this.width);
        shadow.appendChild(this.parent);
        var el = shadow.getElementById(this.parentId);
        return htmlToImage.toPng(el)
            .then(function (dataUrl) {
            el.remove();
            hidden.remove();
            var img = new Image();
            img.src = dataUrl;
            return img;
        });
    };
    return ReceiptBuilder;
}());
exports.ReceiptBuilder = ReceiptBuilder;
//# sourceMappingURL=ReceiptBuilder.js.map