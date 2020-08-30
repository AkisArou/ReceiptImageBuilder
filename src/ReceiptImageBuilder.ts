import * as htmlToImage from 'html-to-image';
import {IReceiptBuilder} from "./IReceiptBuilder";

const makePixel = (num: number) => num + "px";

export enum Alignment {
    Left = "left",
    Center = "center",
    Right = "right"
}

export enum FontWeight {
    Normal = "400",
    Bold = "bold"
}

export enum ImageType {
    PNG,
    JPEG
}


enum HTMLElem {
    Div = "div",
    P = "p",
}


export class ReceiptImageBuilder implements IReceiptBuilder<HTMLImageElement> {
    private readonly parent = document.createElement(HTMLElem.Div);
    private readonly parentId = "ReceiptBuilderParentIdNeetbit";
    private row!: HTMLDivElement;


    private imageQuality = 1;
    private align: Alignment = Alignment.Left;
    private backgroundColor = "white";
    private color = "black";
    private fontWeight = FontWeight.Normal;
    private paddingBottom = 0;
    private paddingLeft = 0;
    private paddingRight = 0;
    private paddingTop = 0;
    private textSize = 12;
    private width = 600;

    constructor(width: number) {
        this.width = width;
        this.makeNewRow();
    }


    addImage(imageUrl: string): this {
        const imageContainer = document.createElement(HTMLElem.Div);
        imageContainer.style.width = "100%";
        imageContainer.style.display = "flex";
        imageContainer.style.justifyContent = "center";
        imageContainer.style.margin = "10px 0";

        const image = new Image();
        image.src = imageUrl;
        image.style.height = "50px";
        imageContainer.appendChild(image);
        this.parent.appendChild(imageContainer);

        return this;
    }

    private addEmptyElement(height: number, dotted: boolean): this {
        const line = document.createElement(HTMLElem.Div);
        line.style.height = makePixel(height);
        if (dotted) line.style.borderBottom = "1px dashed black";
        this.parent.appendChild(line);
        return this;
    }

    private makeNewRow() {
        this.row = document.createElement(HTMLElem.Div) as HTMLDivElement;
        this.row.style.display = "grid";
        this.row.style.gridTemplateColumns = "repeat(3, auto)";
        this.row.style.gridGap = makePixel(10);
    }

    addBlankSpace(height: number): this {
        return this.addEmptyElement(height, false);
    }

    addLine(size?: number): this {
        this.addRow();
        return this.addEmptyElement(size || 1, true);
    }

    private addRow(): this {
        this.parent.appendChild(this.row);
        this.makeNewRow();
        return this;
    }

    addParagraph(): this {
        return this.addEmptyElement(this.textSize, false);
    }

    addText(text: string, changeLine: boolean = true): this {
        const p = document.createElement(HTMLElem.P);
        p.textContent = text;
        p.style.color = this.color;
        p.style.fontSize = makePixel(this.textSize);
        p.style.fontWeight = this.fontWeight;

        switch (this.align) {
            case Alignment.Left:
                p.style.gridColumn = "1/2";
                p.style.justifySelf = "start"

                break;
            case Alignment.Center:
                p.style.gridColumn = "2/3";
                p.style.justifySelf = "center";

                break;
            case Alignment.Right:
                p.style.gridColumn = "3/4";
                p.style.justifySelf = "end"

                break;
        }

        this.row.appendChild(p);
        if (changeLine) this.addRow();
        return this;
    }

    setAlign(align: Alignment): this {
        this.align = align;
        return this;
    }

    setBackgroundColor(backgroundColor: string): this {
        this.backgroundColor = backgroundColor;
        return this;
    }

    setColor(color: string): this {
        this.color = color;
        return this;
    }

    setFontWeight(fontWeight: FontWeight): this {
        this.fontWeight = fontWeight;
        return this;
    }

    setPaddingAll(padding: number): this {
        this.paddingLeft = this.paddingBottom = this.paddingTop = this.paddingRight = padding;
        return this;
    }

    setPaddingBottom(padding: number): this {
        this.paddingBottom = padding;
        return this;
    }

    setPaddingHomogenous(paddingTopBottom: number, paddingLeftRight: number): this {
        this.paddingTop = this.paddingBottom = paddingTopBottom;
        this.paddingLeft = this.paddingRight = paddingLeftRight;
        return this;
    }

    setPaddingLeft(padding: number): this {
        this.paddingLeft = padding;
        return this;
    }

    setPaddingRight(padding: number): this {
        this.paddingRight = padding;
        return this;
    }

    setPaddingTop(padding: number): this {
        this.paddingTop = padding;
        return this;
    }

    setTextSize(textSize: number): this {
        this.textSize = textSize;
        return this;
    }


    /*
    * A number between 0 and 1 indicating image quality (e.g. 0.92 => 92%) of the image.
    * Defaults to 1.0 (100%)
    * */
    setImageQuality(quality: number): this {
        this.imageQuality = quality;
        return this;
    }


    private buildHTMLElement(): [HTMLDivElement, HTMLDivElement] {
        const hidden = document.createElement(HTMLElem.Div);
        hidden.style.opacity = "0";
        hidden.style.height = "0";
        hidden.style.width = "0";

        document.body.appendChild(hidden);
        const shadow = hidden.attachShadow({mode: "open"});

        this.parent.id = this.parentId;
        this.parent.style.width = makePixel(this.width);
        this.parent.style.paddingBottom = makePixel(this.paddingBottom);
        this.parent.style.paddingTop = makePixel(this.paddingTop);
        this.parent.style.paddingRight = makePixel(this.paddingRight);
        this.parent.style.paddingLeft = makePixel(this.paddingLeft);
        this.parent.style.backgroundColor = this.backgroundColor;

        shadow.appendChild(this.parent);
        const el = shadow.getElementById(this.parentId) as HTMLDivElement;
        return [el, hidden];
    }


    /*
    * Can set image type (PNG, JPEG). Defaults to PNG.
    * Returns Promise with HTMLImageElement.
    * */
    buildImage(type: ImageType = ImageType.PNG): Promise<HTMLImageElement> {
        return this.getRawData(type)
            .then(dataUrl => {
                const img = new Image();
                img.src = dataUrl;
                return img;
            });
    }


    /*
    * Can set image type (PNG, JPEG). Defaults to PNG.
    * Returns Promise with a PNG image base64-encoded data URL, a compressed JPEG image.
    * */
    getRawData(type: ImageType = ImageType.PNG): Promise<string> {
        const options: htmlToImage.OptionsType = {quality: this.imageQuality};
        const [el, hidden] = this.buildHTMLElement();

        const imageDataPromise = type === ImageType.JPEG
            ? htmlToImage.toJpeg(el, options)
            : htmlToImage.toPng(el, options);


        return imageDataPromise.then(rawData => {
            el.remove();
            hidden.remove();
            return rawData;
        });
    }

    getPixelData(): Promise<Uint8ClampedArray> {
        const [el, hidden] = this.buildHTMLElement();
        return htmlToImage
            .toPixelData(el)
            .then(rawData => {
                el.remove();
                hidden.remove();
                return rawData;
            });
    }
}

