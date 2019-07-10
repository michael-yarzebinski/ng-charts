import { Line, Polygon, Text  } from '../../SVG/SVG.Classes';
import { TooltipProperties } from '../Tooltip/Tooltip.Classes';


export interface Point {
    X: any;
    Y: any;
}

export interface ScatterPoint extends Point {
    Radius: number;
}

export interface BlockBasedSeriesStyle
{
    Name: string;
    Style: Polygon;
}

export interface Bar
{
    Value: any;
    Text: string;
    TextStyle: Text;
    SeriesStyle: BlockBasedSeriesStyle;
}

export interface Block
{
    Start: any;
    End: any;
    Text: string;
    TextStyle: Text;
    SeriesStyle: BlockBasedSeriesStyle;
}

interface Series {
    Name: string;
    Data: Point[] | ScatterPoint[] | Bar[] | Block[];
    YAxis: 'Top' | 'Bottom' | 'Left' | 'Right';
    Type: 'Line' | 'Area' | 'Scatter' | 'Bar' | 'Block';
    Style: Line | Polygon | Text;
    Show: boolean;
    Tooltip: TooltipProperties;
}

interface PointBasedSeries extends Series
{
    Name: string;
    Data: Point[] | ScatterPoint[] ;
    YAxis: 'Left' | 'Right';
    Type: 'Line' | 'Area' | 'Scatter';
    Style: Line | Polygon;
    Show: boolean;
    Tooltip: TooltipProperties;
    //LegendTransform: string;
}

interface BlockBasedSeries extends Series
{
    Name: string;
    Data: Bar[] | Block[];
    YAxis: 'Top' | 'Bottom' | 'Left' | 'Right';
    Type: 'Bar' | 'Block';
    Style: Text;
    Show: boolean;
    Tooltip: TooltipProperties;
}

export class LineSeries implements PointBasedSeries {
    Name: string;
    Data: Point[];
    YAxis: 'Left' | 'Right';
    readonly Type = 'Line';
    Style: Line;
    Show: boolean;
    Tooltip: TooltipProperties;
    //LegendTransform: string;
}

export class AreaSeries implements PointBasedSeries {
    Name: string;
    Data: Point[];
    YAxis: 'Left' | 'Right';
    readonly Type = 'Area';
    Style: Polygon;
    Show: boolean;
    Tooltip: TooltipProperties;
    //LegendTransform: string;
}

export class ScatterSeries implements PointBasedSeries {
    Name: string;
    Data: ScatterPoint[];
    YAxis: 'Left' | 'Right';
    readonly Type = 'Scatter';
    Style: Polygon;
    Show: boolean;
    Tooltip: TooltipProperties;
    //LegendTransform: string;
}

export class BarSeries implements BlockBasedSeries
{
    Name: string;
    Data: Bar[];
    YAxis: 'Top' | 'Bottom' | 'Left' | 'Right';
    readonly Type = 'Bar';
    Style: Text;
    Show: boolean;
    Tooltip: TooltipProperties;
    //LegendTransform: string;
}

export class BlockSeries implements BlockBasedSeries
{
    Name: string;
    Data: Block[];
    YAxis: 'Top' | 'Bottom' | 'Left' | 'Right';
    readonly Type = 'Block';
    Style: Text;
    Show: boolean;
    Tooltip: TooltipProperties;
    //LegendTransform: string;
}