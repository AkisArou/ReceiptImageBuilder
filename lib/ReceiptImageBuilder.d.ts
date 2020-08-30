import { IReceiptBuilder } from "./IReceiptBuilder";
export declare enum Alignment {
    Left = "left",
    Center = "center",
    Right = "right"
}
export declare enum FontWeight {
    Normal = "400",
    Bold = "bold"
}
export declare enum ImageType {
    PNG = 0,
    JPEG = 1
}
export declare class ReceiptImageBuilder implements IReceiptBuilder<HTMLImageElement> {
    private readonly parent;
    private readonly parentId;
    private row;
    private imageQuality;
    private align;
    private backgroundColor;
    private color;
    private fontWeight;
    private paddingBottom;
    private paddingLeft;
    private paddingRight;
    private paddingTop;
    private textSize;
    private width;
    constructor(width: number);
    private addEmptyElement;
    private makeNewRow;
    addBlankSpace(height: number): this;
    addLine(size?: number): this;
    private addRow;
    addParagraph(): this;
    addText(text: string, changeLine?: boolean): this;
    setAlign(align: Alignment): this;
    setBackgroundColor(backgroundColor: string): this;
    setColor(color: string): this;
    setFontWeight(fontWeight: FontWeight): this;
    setPaddingAll(padding: number): this;
    setPaddingBottom(padding: number): this;
    setPaddingHomogenous(paddingTopBottom: number, paddingLeftRight: number): this;
    setPaddingLeft(padding: number): this;
    setPaddingRight(padding: number): this;
    setPaddingTop(padding: number): this;
    setTextSize(textSize: number): this;
    setImageQuality(quality: number): this;
    buildImage(type?: ImageType): Promise<HTMLImageElement>;
    getRawData(type?: ImageType): Promise<string>;
    addImage(imageUrl: string): this;
}
//# sourceMappingURL=ReceiptImageBuilder.d.ts.map