import {Alignment} from "./ReceiptImageBuilder";

export interface IReceiptBuilder<T> {
    //     public ReceiptBuilder(int width) {
//     this.width = width;
// }
//     width: number;


// public ReceiptBuilder setTextSize(float textSize) {
//     this.textSize = textSize;
//     return this;
// }
//      textSize: number;
    setTextSize(textSize: number): this;

// public ReceiptBuilder setBackgroudColor(int backgroundColor) {
//     this.backgroundColor = backgroundColor;
//     return this;
// }
//      backgroundColor: string;
    setBackgroundColor(backgroundColor: string): this;

// public ReceiptBuilder setColor(int color) {
//     this.color = color;
//     return this;
// }
//      color: string;
    setColor(color: string): this;

// public ReceiptBuilder setTypeface(Context context, String typefacePath) {
//     typeface = Typeface.createFromAsset(context.getAssets(), typefacePath);
//     return this;
// }
//
// public ReceiptBuilder setDefaultTypeface() {
//     typeface = null;
//     return this;
// }
    //TODO typeface



// public ReceiptBuilder setAlign(Paint.Align align) {
//     this.align = align;
//     return this;
// }

     // align: Alignment;
    setAlign(align: Alignment): this;

// public ReceiptBuilder setMargin(int margin) {
//     this.marginLeft = margin;
//     this.marginRight = margin;
//     this.marginTop = margin;
//     this.marginBottom = margin;
//     return this;
// }
//

    setMarginAll(margin: number): this;


// public ReceiptBuilder setMargin(int marginTopBottom, int marginLeftRight) {
//     this.marginLeft = marginLeftRight;
//     this.marginRight = marginLeftRight;
//     this.marginTop = marginTopBottom;
//     this.marginBottom = marginTopBottom;
//     return this;
// }

    setMarginHomogenous(marginTopBottom: number, marginLeftRight: number): this;


// public ReceiptBuilder setMarginLeft(int margin) {
//     this.marginLeft = margin;
//     return this;
// }

    setMarginLeft(margin: number): this;


// public ReceiptBuilder setMarginRight(int margin) {
//     this.marginRight = margin;
//     return this;
// }

    setMarginRight(margin: number): this;


// public ReceiptBuilder setMarginTop(int margin) {
//     this.marginTop = margin;
//     return this;
// }

    setMarginTop(margin: number): this;


// public ReceiptBuilder setMarginBottom(int margin) {
//     this.marginBottom = margin;
//     return this;
// }

    setMarginBottom(margin: number): this;


    //
    // marginLeft: number;
    //  marginRight: number;
    //  marginTop: number;
    //  marginBottom: number;
    //
    //



    // public ReceiptBuilder addText(String text) {
//     return addText(text, true);
// }



// public ReceiptBuilder addText(String text, Boolean newLine) {
//     DrawText drawerText = new DrawText(text);
//     drawerText.setTextSize(this.textSize);
//     drawerText.setColor(this.color);
//     drawerText.setNewLine(newLine);
//     if (typeface != null) {
//         drawerText.setTypeface(typeface);
//     }
//     if (align != null) {
//         drawerText.setAlign(align);
//     }
//     listItens.add(drawerText);
//     return this;
// }

    addText(text: string, newLine?: boolean): this;


// public ReceiptBuilder addImage(Bitmap bitmap) {
//     DrawImage drawerImage = new DrawImage(bitmap);
//     if (align != null) {
//         drawerImage.setAlign(align);
//     }
//     listItens.add(drawerImage);
//     return this;
// }

    //TODO addImage(bitmap)


// public ReceiptBuilder addItem(IDrawItem item) {
//     listItens.add(item);
//     return this;
// }


    //TODO addItem(IDrawItem item)



// public ReceiptBuilder addBlankSpace(int heigth) {
//     listItens.add(new DrawBlankSpace(heigth));
//     return this;
// }

    addBlankSpace(height: number): this;

// public ReceiptBuilder addParagraph() {
//     listItens.add(new DrawBlankSpace((int) textSize));
//     return this;
// }

    addParagraph(): this;

// public ReceiptBuilder addLine() {
//     return addLine(width - marginRight - marginLeft);
// }




// public ReceiptBuilder addLine(int size) {
//     DrawLine line = new DrawLine(size);
//     line.setAlign(align);
//     line.setColor(color);
//     listItens.add(line);
//     return this;
// }

    addLine(size?: number): this;


// private int getHeight() {
//     int height = 5 + marginTop + marginBottom;
//     for (IDrawItem item : listItens) {
//         height += item.getHeight();
//     }
//     return height;
// }

    getHeight(): number;



    buildImage(): Promise<T>;
}