import { LegendOptions } from "./Components/Legend/Legend.Classes";
import { Axis } from './Components/Axes/Axes.Classes';
import {AreaSeries, LineSeries, ScatterSeries    } from './Components/Series/Series.Classes'

export function BuildDefaultLegend(Position: 'Top' | 'Left' | 'Bottom' | 'Right', Orientation: 'Horizontal' | 'Vertical') : LegendOptions
{
    let legendOptions: LegendOptions = {
        Position: Position,
        Orientation: Orientation,
        Space: (Orientation == 'Horizontal' ? 25 : 75),
        Style: {
            Color: 'black',
            Fill: 'black',
            Thickness: 0.01,
            Dash: 0,
            FontSize: 12
        }
    };
    return legendOptions;
}

export function BuildDefaultAxis(Title: string, Color: string, Position: 'Left' | 'Right' | 'Top' | 'Bottom', POrS: 'Primary' | 'Secondary'): Axis {
    let axis: Axis =
    {
        Show: true,
        Position: Position,
        TickCount: 10,
        Title: {
            Show: true,
            Text: Title,
            Space: 25,
            Style: {
                Color: Color,
                Fill: Color,
                Thickness: 0.1,
                FontSize: 20,
                Dash: 0
            }
        },
        Labels:
        {
            Show: true,
            Format: function (obj: any) { return obj; },
            Space: 20,
            Style: {
                Color: Color,
                Fill: Color,
                FontSize: 12,
                Dash: 0,
                Thickness: 0.01
            }
        },
        TickMarks: {
            Show: (POrS == 'Primary' ? false : true),
            Style: {
                Color: Color,
                Thickness: 2,
                Dash : 0
            },
            Size: 8
        },
        GridLines:
        {
            Show: (POrS == 'Primary' ? true : false),
            Style:
            {
                Color: 'lightgrey',
                Dash: 0,
                Thickness: 1
            }
        },
        Min: undefined,
        Max: undefined,
        Reverse: false
    }
    return axis;
}

export function BuildDefaultSeries(Name: string, Data: any[], YAxis: 'Left' | 'Right', Type: 'Area' | 'Line' | 'Scatter', Color: string) : AreaSeries | LineSeries | ScatterSeries
{
    
    if (Type == 'Area')
    {
        let series: AreaSeries = {
            Name: Name,
            Data: Data,
            Show : true,
            YAxis: YAxis,
            Style: {
                Color: Color,
                Fill: Color,
                Thickness: 2,
                Dash : 0
            },
            Tooltip: {
                Show: true,
                Position: null,
                CustomClass: null,
                Template: null,
                Style: {
                    Color: Color,
                    Fill: Color,
                    Thickness: 1,
                    Dash : 0
                }
            },
            LegendTransform: null,
            Type: 'Area'
        }
        return series;
    }
    else if (Type == 'Line') {
        let series: LineSeries = {
            Name: Name,
            Data: Data,
            Show: true,
            YAxis: YAxis,
            Style: {
                Color: Color,
                Thickness: 2,
                Dash: 0
            },
            Tooltip: {
                Show: true,
                Position: null,
                CustomClass: null,
                Template: null,
                Style: {
                    Color: Color,
                    Fill: Color,
                    Thickness: 1,
                    Dash: 0
                }
            },
            LegendTransform: null,
            Type: 'Line'
        }
        return series;
    }
    else if (Type == 'Scatter') {
        let series: ScatterSeries = {
            Name: Name,
            Data: Data,
            Show: true,
            YAxis: YAxis,
            Style: {
                Color: Color,
                Fill: Color,
                Thickness: 2,
                Dash: 0
            },
            Tooltip: {
                Show: true,
                Position: null,
                CustomClass: null,
                Template: null,
                Style: {
                    Color: Color,
                    Fill: Color,
                    Thickness: 1,
                    Dash: 0
                }
            },
            LegendTransform: null,
            Type: 'Scatter'
        }
        return series;
    }

}