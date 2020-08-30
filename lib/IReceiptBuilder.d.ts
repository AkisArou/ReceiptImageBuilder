import { Alignment } from "./ReceiptImageBuilder";
export interface IReceiptBuilder<T> {
    setTextSize(textSize: number): this;
    setBackgroundColor(backgroundColor: string): this;
    setColor(color: string): this;
    setAlign(align: Alignment): this;
    setMarginAll(margin: number): this;
    setMarginHomogenous(marginTopBottom: number, marginLeftRight: number): this;
    setMarginLeft(margin: number): this;
    setMarginRight(margin: number): this;
    setMarginTop(margin: number): this;
    setMarginBottom(margin: number): this;
    addText(text: string, newLine?: boolean): this;
    addBlankSpace(height: number): this;
    addParagraph(): this;
    addLine(size?: number): this;
    getHeight(): number;
    buildHTMLImage(): Promise<T>;
}
//# sourceMappingURL=IReceiptBuilder.d.ts.map