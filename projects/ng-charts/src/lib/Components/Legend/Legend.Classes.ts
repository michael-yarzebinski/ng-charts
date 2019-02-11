export class LegendOptions
{
    constructor(Position?: 'Top' | 'Left' | 'Bottom' | 'Right', Orientation?: 'Horizontal' | 'Vertical',
        Space?: number, ObjectWidth?: number, TextWidth?: number, ItemWidth?: number, Padding?: number,
                ItemHeight?:number, FontSize?:number
                ) {
        if (Position) {
            this.Position = Position;
        }
        else {
            this.Position = "Left";
        }
        if (Orientation) {
            this.Orientation = Orientation;
        }
        else {
            if (this.Position == 'Top' || this.Position == 'Bottom') {
                this.Orientation = 'Horizontal';
            }
            else {
                this.Orientation = 'Vertical';
            }
        }
        if (FontSize > 0) {
            this.FontSize = FontSize;
        }
        else {
            this.FontSize = 12;
        }
        if (ObjectWidth > 0) {
            this.ObjectWidth = ObjectWidth;
        }
        else {
            this.ObjectWidth = 10;
        }
        if (TextWidth > 0) {
            this.TextWidth = TextWidth
        }
        else {
            this.TextWidth = 100;
        }
        if (Padding) {
            this.Padding = this.Padding;
        }
        else {
            this.Padding = 5;
        }
        if (ItemWidth > 0) {
            this.ItemWidth = ItemWidth;
        }
        else {
            this.ObjectWidth + this.Padding * 2 + this.TextWidth;
        }
        if (ItemHeight > 0) {
            this.ItemHeight = ItemHeight;
        }
        else {
            this.ItemHeight = this.FontSize + this.Padding;
        }
        if (Space > 0) {
            this.Space = Space;
        }
        else {
            if (this.Position == 'Top' || this.Position == 'Bottom') {
                this.Space = this.ItemWidth;
            }
            else {
                this.Space = this.ItemHeight;
            }
        }
    }

    Space: number;  //Total Legend Size.
    Position: 'Top' | 'Left' | 'Bottom' | 'Right';
    Orientation: 'Horizontal' | 'Vertical';
    FontSize: number;
    ObjectWidth: number;    //Width the the dot, box, or line.
    TextWidth: number;
    ItemWidth: number;  //Object + Text
    ItemHeight: number; //Object + Text
    Padding: number;
}