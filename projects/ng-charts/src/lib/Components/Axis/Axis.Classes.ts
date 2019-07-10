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
    Rotate: boolean;
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