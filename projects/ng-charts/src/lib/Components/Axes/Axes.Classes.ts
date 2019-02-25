import { Line, Text } from '../../SVG/SVG.Classes';

export interface Axis
{
    Show: boolean;
    Position: 'Left' | 'Right' | 'Top' | 'Bottom';
    Title: Title;   //The Label associated with the Axis.
    GridLines: GridLines;   //Gridlines for the Axis.
    TickMarks: TickMarks;   //Tick Marks For the Axis (the little ticks on the Axis).
    Labels: Labels; //The Date/Times on the Axis
    Min: any;
    Max: any;
    TickCount: number;
    Reverse: boolean;
}

export interface GridLines
{
    Show: boolean;
    Style: Line;
}

export interface TickMarks
{
    Show: boolean;
    Style: Line;
    Size: number;
}

export interface Labels
{
    Show: boolean;
    Space: number;
    Style: Text;
    Format: Function;
}

export interface Title
{
    Show: boolean;
    Style: Text;
    Space: number;
    Text: string;
}

//export function BuildDefaultAxis(Title: string, Color: string, Position: 'Left' | 'Right' | 'Top' | 'Bottom'): Axis
//{
//    let axis:Axis =
//    {
//        Show: true,
//        Position: Position,
//        TickCount : 10,
//        Title: {
//            Show: true,
//            Text: Title,
//            Space: 30,
//            Style: {
//                Color: Color,
//                Fill: Color,
//                Thickness: 0.1,
//                FontSize: 25,
//                Dash: 0
//            }
//        },
//        Labels:
//        {
//            Show: true,
//            Format: function (obj: any) { return obj; },
//            Space: 20,
//            Style: {
//                Color: Color,
//                Fill: Color,
//                FontSize: 12,
//                Dash: 0,
//                Thickness : 0.01
//            }
//        },
//        TickMarks: {
//            Show: false,
//            Style: null,
//            Size : 0
//        },
//        GridLines:
//        {
//            Show: true,
//            Style:
//            {
//                Color: 'lightgrey',
//                Dash: 0,
//                Thickness: 1
//            }
//        },
//        Min: undefined,
//        Max: undefined,
//        Reverse: false        
//    }
//    return axis;
//}


//export class GridLine
//{
//    constructor()
//    {
//        this.Show = false;
//        this.SVGStyle = new SVGLine('rgba(190,190,190,0.4)', 0.01);
//    }

//    Show: boolean;
//    SVGStyle: SVGLine;
//}

//export class TickLabel
//{
//    constructor()
//    {
//        this.SVGStyle = new SVGText(12);
//        this.Space = this.SVGStyle.FontSize + 4;
//    }
//    Show: boolean;
//    SVGStyle: SVGText;
//    Space: number;
//}

//export class TickMark
//{
//    constructor(Size?:number)
//    {
//        if (Size > 0) {
//            this.Size = 6
//        }
//        this.SVGStyle = new SVGLine('Black', 0.01);
//    }

//    Show: boolean;
//    Size: number;
//    SVGStyle: SVGLine;
//}


//export class TickMarks
//{
//    constructor()
//    {
//        this.TickMarks = new TickMark();
//        this.GridLines = new GridLine();
//        this.Labels = new TickLabel();
//        //this.SetDefaultFormat();
//    }

//    //SetDefaultFormat(AxisType?: string) : void
//    //{
//    //    if (true)
//    //    {
//    //        this.Format = function (any) { return any; };
//    //    }
//    //}

//    Format: Function;
//    TickMarks: TickMark;
//    GridLines: GridLine;
//    Labels: TickLabel;
//}


//export class AxisLabel
//{
//    constructor(Space?:number)
//    {
//        this.SVGStyle = new SVGText();
//        if (Space > 0) {
//            this.Space = Space;
//        }
//        else {
//            this.Space = 30;
//        }
//    }

//    Show: boolean;
//    SVGStyle: SVGText;
//    Space: number;
//    Text: string;
//}


//export class Axis
//{
//    constructor() {
//        this.Label = new AxisLabel();
//        this.MajorTicks = new TickMarks();
//    }
//    Show: boolean;
//    Position: 'Left' | 'Right' | 'Top' | 'Bottom';
//    Label: AxisLabel;
//    Min: any;
//    Max: any;
//    MajorTicks: TickMarks;
//    MinorTicks: TickMarks;
//    Count: number;
//}
