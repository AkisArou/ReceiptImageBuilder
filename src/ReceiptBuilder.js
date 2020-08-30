"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alignment = void 0;
var html_to_image_1 = __importDefault(require("html-to-image"));
var Alignment;
(function (Alignment) {
    Alignment["Left"] = "left";
    Alignment["Center"] = "center";
    Alignment["Right"] = "right";
})(Alignment = exports.Alignment || (exports.Alignment = {}));
var ReceiptBuilder = /** @class */ (function () {
    function ReceiptBuilder() {
    }
    ReceiptBuilder.prototype.build = function () {
        var el = document.createElement("h1");
        el.textContent = "Hello from ReceiptBuilder";
        html_to_image_1.default.toJpeg(el).then(function (img) {
            console.log(img);
        });
    };
    return ReceiptBuilder;
}());
new ReceiptBuilder().build();
