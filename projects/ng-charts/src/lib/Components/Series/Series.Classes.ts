import { Line, Polygon,  } from '../../SVG/SVG.Classes';
import { TooltipProperties } from '../Tooltip/Tooltip.Classes';


export interface Point {
    X: any;
    Y: any;
}

export interface ScatterPoint extends Point {
    Radius: number;
}

interface Series {
    Name: string;
    Data: Point[] | ScatterPoint[];
    YAxis: 'Left' | 'Right';
    Type: 'Line' | 'Area' | 'Scatter';
    Style: Line | Polygon;
    Show: boolean;
    Tooltip: TooltipProperties;
    LegendTransform: string;
}

export class LineSeries implements Series {
    Name: string;
    Data: Point[];
    YAxis: 'Left' | 'Right';
    readonly Type = 'Line';
    Style: Line;
    Show: boolean;
    Tooltip: TooltipProperties;
    LegendTransform: string;
}

export class AreaSeries implements Series {
    Name: string;
    Data: Point[];
    YAxis: 'Left' | 'Right';
    readonly Type = 'Area';
    Style: Polygon;
    Show: boolean;
    Tooltip: TooltipProperties;
    LegendTransform: string;
}

export class ScatterSeries implements Series {
    Name: string;
    Data: ScatterPoint[];
    YAxis: 'Left' | 'Right';
    readonly Type = 'Scatter';
    Style: Polygon;
    Show: boolean;
    Tooltip: TooltipProperties;
    LegendTransform: string;
}

//export class Point
//{
//    X: any;
//    Y: number;
//}

//export class ScatterPoint extends Point
//{
//    Radius: number;
//}

//export class Series
//{
//    constructor() {
//        this.Data = [];
//    }

//    Name: string;
//    Data: Point[] | ScatterPoint[];
//    SVGStyles: Line | Polygon;
//    YAxis: 'Left' | 'Right';
//    Type: 'Line' | 'Area' | 'Scatter';
//}
