import { IReceiptBuilder } from "./IReceiptBuilder";
export declare enum Alignment {
    Left = "left",
    Center = "center",
    Right = "right"
}
export declare class ReceiptBuilder implements IReceiptBuilder {
    private readonly parent;
    private readonly parentId;
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
    build(): Promise<HTMLImageElement>;
}
//# sourceMappingURL=ReceiptBuilder.d.ts.map