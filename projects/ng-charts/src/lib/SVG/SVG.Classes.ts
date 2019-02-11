
export class SVGLine
{
    constructor(Stroke?: string, StrokeWidth?: number, Dash?: number)
    {
        if (Stroke) {
            this.Stroke = Stroke;
        }
        else
        {
            this.Stroke = 'Black';
        }

        if (StrokeWidth > 0) {
            this.StrokeWidth = StrokeWidth;
        }
        else {
            this.StrokeWidth = 0.01;
        }

        if (Dash > 0) {
            this.Dash = Dash;
        }
        else {
            this.Dash = 0;
        }
    }

    Stroke: string;
    StrokeWidth: number;
    Dash: number;
}

export class SVGCircle extends SVGLine
{
    constructor(Fill?: string) {
        super();
        if (this.Fill) {
            this.Fill = Fill;
        }
        else {
            this.Fill = 'Black';
        }
    }
    Fill: string;
}

export class SVGPath extends SVGLine
{
    constructor(Fill?: string) {
        super();
        if (this.Fill) {
            this.Fill = Fill;
        }
        else {
            this.Fill = 'Black';
        }
    }
    Fill: string;
}

export class SVGPathPoint
{
    X: number;
    Y: number;
    Command: 'M' | 'L' | 'H' | 'V' | 'C' | 'S' | 'Q' | 'T' | 'A' | 'Z'
}

export class SVGText extends SVGLine
{
    constructor(FontSize?:number) {
        super();
        if (FontSize > 0) {
            this.FontSize = FontSize;
        }
        else {
            this.FontSize = 12;
        }

    }
    FontSize: number; 
}