import { SVGLine, SVGCircle, SVGPath } from '../../SVG/SVG.Classes';


export class Point
{
    X: any;
    Y: number;
}

export class ScatterPoint extends Point
{
    Radius: number;
}

export class Series
{
    constructor() {
        this.Data = [];
    }

    Name: string;
    Data: Point[] | ScatterPoint[];
    SVGStyles: SVGCircle | SVGLine | SVGPath;
    YAxis: 'Left' | 'Right';
    Type: 'Line' | 'Area' | 'Scatter';
}