import { Point } from '../Components/Series/Series.Classes';

export class Dimension implements Point
{
    X: number;
    Y: number;
    Width: number;
    Height: number;
}

export class Dimensions 
{
    Width: number;
    Height: number;
    Plot: Dimension;
    PlotWAxes: Dimension;
    PlotWAxesALabels: Dimension;
}