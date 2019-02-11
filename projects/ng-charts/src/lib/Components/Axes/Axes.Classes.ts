import { SVGLine, SVGText } from '../../SVG/SVG.Classes';

export class GridLine
{
    constructor()
    {
        this.Show = false;
        this.SVGStyle = new SVGLine('rgba(190,190,190,0.4)', 0.01);
    }

    Show: boolean;
    SVGStyle: SVGLine;
}

export class TickLabel
{
    constructor()
    {
        this.SVGStyle = new SVGText(12);
        this.Space = this.SVGStyle.FontSize + 4;
    }
    Show: boolean;
    SVGStyle: SVGText;
    Space: number;
}

export class TickMark
{
    constructor(Size?:number)
    {
        if (Size > 0) {
            this.Size = 6
        }
        this.SVGStyle = new SVGLine('Black', 0.01);
    }

    Show: boolean;
    Size: number;
    SVGStyle: SVGLine;
}


export class TickMarks
{
    constructor()
    {
        this.TickMarks = new TickMark();
        this.GridLines = new GridLine();
        this.Labels = new TickLabel();
        //this.SetDefaultFormat();
    }

    //SetDefaultFormat(AxisType?: string) : void
    //{
    //    if (true)
    //    {
    //        this.Format = function (any) { return any; };
    //    }
    //}

    Format: Function;
    TickMarks: TickMark;
    GridLines: GridLine;
    Labels: TickLabel;
}


export class AxisLabel
{
    constructor(Space?:number)
    {
        this.SVGStyle = new SVGText();
        if (Space > 0) {
            this.Space = Space;
        }
        else {
            this.Space = 30;
        }
    }

    Show: boolean;
    SVGStyle: SVGText;
    Space: number;
    Text: string;
}


export class Axis
{
    constructor() {
        this.Label = new AxisLabel();
        this.MajorTicks = new TickMarks();
    }
    Show: boolean;
    Position: 'Left' | 'Right' | 'Top' | 'Bottom';
    Label: AxisLabel;
    Min: any;
    Max: any;
    MajorTicks: TickMarks;
    MinorTicks: TickMarks;
    Count: number;
}