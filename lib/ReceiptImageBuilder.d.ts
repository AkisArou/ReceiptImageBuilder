import { IReceiptBuilder } from "./IReceiptBuilder";
export declare enum Alignment {
    Left = "left",
    Center = "center",
    Right = "right"
}
export declare enum ImageType {
    PNG = 0,
    JPEG = 1
}
export declare class ReceiptImageBuilder implements IReceiptBuilder<HTMLImageElement> {
    private readonly parent;
    private readonly parentId;
    private imageQuality;
    private align;
    private backgroundColor;
    private color;
    private marginBottom;
    private marginLeft;
    private marginRight;
    private marginTop;
    private textSize;
    private width;
    constructor(width: number);
    private addEmptyElement;
    addBlankSpace(height: number): this;
    addLine(size?: number): this;
    addParagraph(): this;
    addText(text: string, newLine?: boolean): this;
    getHeight(): number;
    setAlign(align: Alignment): this;
    setBackgroundColor(backgroundColor: string): this;
    setColor(color: string): this;
    setMarginAll(margin: number): this;
    setMarginBottom(margin: number): this;
    setMarginHomogenous(marginTopBottom: number, marginLeftRight: number): this;
    setMarginLeft(margin: number): this;
    setMarginRight(margin: number): this;
    setMarginTop(margin: number): this;
    setTextSize(textSize: number): this;
    setImageQuality(quality: number): this;
    buildHTMLImage(type?: ImageType): Promise<HTMLImageElement>;
    getRawData(type?: ImageType): Promise<string>;
}
//# sourceMappingURL=ReceiptImageBuilder.d.ts.map