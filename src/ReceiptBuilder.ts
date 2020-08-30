import * as htmlToImage from 'html-to-image';
import {IReceiptBuilder} from "./IReceiptBuilder";


const makePixel = (num: number) => num + "px";

export enum Alignment {
    Left = "left",
    Center = "center",
    Right = "right"
}

enum HTMLElem {
    Div = "div",
    P = "p",
    Br = "br",
}


export class ReceiptBuilder implements IReceiptBuilder {
    private readonly parent = document.createElement(HTMLElem.Div);
    private readonly parentId = "ReceiptBuilderParentIdNeetbit";

    private align: Alignment = Alignment.Center;
    private backgroundColor = "white";
    private color = "black";
    private marginBottom = 0;
    private marginLeft = 0;
    private marginRight = 0;
    private marginTop = 0;
    private textSize = 12;
    private width = 600;


    constructor(width: number) {
        this.width = width;
    }

    private addEmptyElement(height: number): this {
        const line = document.createElement(HTMLElem.Br);
        line.style.height = makePixel(height);
        this.parent.appendChild(line);
        return this;
    }

    addBlankSpace(height: number): this {
        return this.addEmptyElement(height);
    }

    addLine(size?: number): this {
        return this.addEmptyElement(size || this.width - this.marginRight - this.marginLeft);
    }

    addParagraph(): this {
        return this.addEmptyElement(this.textSize);
    }

    addText(text: string, newLine: boolean = false): this {
        const p = document.createElement(HTMLElem.P);
        p.textContent = text;
        p.style.color = this.color;
        p.style.fontSize = makePixel(this.textSize);
        this.parent.appendChild(p);
        if (newLine) this.addLine();
        return this;
    }

    getHeight(): number {
        //TODO
        return 500;
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

    setMarginAll(margin: number): this {
        this.marginLeft = this.marginBottom = this.marginTop = this.marginRight = margin;
        return this;
    }

    setMarginBottom(margin: number): this {
        this.marginBottom = margin;
        return this;
    }

    setMarginHomogenous(marginTopBottom: number, marginLeftRight: number): this {
        this.marginTop = this.marginBottom = marginTopBottom;
        this.marginLeft = this.marginRight = marginLeftRight;
        return this;
    }

    setMarginLeft(margin: number): this {
        this.marginLeft = margin;
        return this;
    }

    setMarginRight(margin: number): this {
        this.marginRight = margin;
        return this;
    }

    setMarginTop(margin: number): this {
        this.marginTop = margin;
        return this;
    }

    setTextSize(textSize: number): this {
        this.textSize = textSize;
        return this;
    }

    build(): Promise<HTMLImageElement> {
        const hidden = document.createElement(HTMLElem.Div);
        hidden.style.opacity = "0";
        hidden.style.height = "0";
        hidden.style.width = "0";

        document.body.appendChild(hidden);
        const shadow = hidden.attachShadow({mode: "open"});

        this.parent.id = this.parentId;
        this.parent.style.marginBottom = makePixel(this.marginBottom);
        this.parent.style.marginTop = makePixel(this.marginTop);
        this.parent.style.marginRight = makePixel(this.marginRight);
        this.parent.style.marginLeft = makePixel(this.marginLeft);
        this.parent.style.backgroundColor = this.backgroundColor;
        this.parent.style.height = makePixel(this.getHeight());
        this.parent.style.width = makePixel(this.width);

        shadow.appendChild(this.parent);
        const el = shadow.getElementById(this.parentId) as HTMLDivElement;

        return htmlToImage.toPng(el)
            .then(dataUrl => {
                el.remove();
                hidden.remove();
                const img = new Image();
                img.src = dataUrl;
                return img;
            });
    }
}

