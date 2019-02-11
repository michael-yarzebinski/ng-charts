import { line, area, curveLinear } from 'd3-shape';
import { Point } from './Series.Classes';

export function GenerateLinePath(Data: any[], XScale: any, YScale: any): string
{
    let lineGenerator = LineGenerator(XScale, YScale);
    let path: string = lineGenerator(Data);
    return path;

}

function LineGenerator(XScale: any, YScale: any): any
{
    return line<Point>()
        .x(d => {
            const X = d.X;
            let value = XScale(X);
            return value;
        })
        .y(d => YScale(d.Y));
}

export function GenerateAreaPath(Data: any[], XScale: any, YScale: any): any
{
    let areaGenerator = AreaGenerator(XScale, YScale);
    areaGenerator.curve(curveLinear);
    let path: any = areaGenerator(Data);
    return path; 
}

function AreaGenerator(XScale: any, YScale: any): any
{
    let xValue = (d) => {
        const X = d.X;
        return XScale(X);
    }

    return area<any>()
        .x(xValue)
        .y0(YScale(0))
        .y1(d => YScale(d.Y));
}