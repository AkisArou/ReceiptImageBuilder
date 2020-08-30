import { Alignment, FontWeight } from "./ReceiptImageBuilder";
export interface IReceiptBuilder<T> {
    setTextSize(textSize: number): this;
    setBackgroundColor(backgroundColor: string): this;
    setColor(color: string): this;
    setAlign(align: Alignment): this;
    setPaddingAll(margin: number): this;
    setPaddingHomogenous(marginTopBottom: number, marginLeftRight: number): this;
    setPaddingLeft(padding: number): this;
    setPaddingRight(padding: number): this;
    setPaddingTop(padding: number): this;
    setPaddingBottom(padding: number): this;
    addText(text: string, newLine?: boolean): this;
    addBlankSpace(height: number): this;
    addParagraph(): this;
    addLine(size?: number): this;
    setFontWeight(fontWeight: FontWeight): this;
    addImage(imageUrl: string): this;
    buildImage(): void;
}
//# sourceMappingURL=IReceiptBuilder.d.ts.map