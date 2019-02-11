import { scaleBand, scaleLinear, scalePoint, scaleTime } from 'd3-scale';

import { Point, Series } from '../Series/Series.Classes';
import { Dimensions, Dimension } from '../../AdditionalClasses/AdditionalClasses';
import { Axis } from '../Axes/Axes.Classes';
import { LegendOptions } from '../Legend/Legend.Classes';


export interface BaseChart
{
    update: Function;
}

export class BaseChartClass implements BaseChart
{

    update()
    {
    }
    public BuildXScale(Series: Series[], Width: number, Min?: any, Max?: any): any
    {
        // #region Get X Domain
        let uniqueValues = [];
        for (let series of Series) {
            for (let point of series.Data) { 
                if (!uniqueValues.includes(point.X)) {
                    uniqueValues.push(point.X);
                }
            }
        }

        let scaleType;
        if (uniqueValues.length > 0) {
            scaleType = this.GetScaleType(uniqueValues);
        }
        else if (Min != null || Max != null) {
            if (Min != null && Max != null) {
                let minPoint: Point = {
                    X: Min,
                    Y: 0
                };
                let maxPoint: Point = {
                    X: Max,
                    Y: 0
                }
                scaleType = this.GetScaleType([minPoint, maxPoint]);
            }
            else if (Min != null) {
                let minPoint: Point = {
                    X: Min,
                    Y: 0
                };
                scaleType = this.GetScaleType([minPoint]);
            }
            else if (Max != null) { 
                let maxPoint: Point = {
                    X: Max,
                    Y: 0
                }
                scaleType = this.GetScaleType([maxPoint]);
            }
            
        }
        else {
            scaleType = 'Linear';
        }

        let domain = [];
        let min, max;

        if (scaleType == 'Linear') {
            uniqueValues = uniqueValues.map(v => Number(v));    //Converts all of Unique Values to numbers if they're in string form.
        }

        if (scaleType == 'Time' || scaleType == 'Linear')   //Define min and max for reasonable scale types.
        {
            min = Min != null ? Min : Math.min(...uniqueValues);
            max = Max != null ? Max : Math.max(...uniqueValues);
        }

        if (scaleType == 'Time') {
            domain = [new Date(min), new Date(max)];
            //I had some stuff about XSet here.  Don't remember what that does.
        }
        else if (scaleType == 'Linear') {
            domain = [min, max];
            //I had some stuff about XSet here.  Don't remember what that does.
        }
        else {
            domain = uniqueValues;
            //I had some stuff about XSet here.  Don't remember what that does.
        }

        // #endregion
        // #region Get X Scale
        let scale;
        let bandwidth = 1;  //Not sure what this does yet.  I think it has something to do with the bars, but I havent tested it at all yet.

        if (scaleType == 'Time') {
            scale = scaleTime();
        }
        else if (scaleType == 'Linear') {
            scale = scaleLinear();
        }
        else if (scaleType == 'Ordinal')   //Could be an else.
        {
            scale = scalePoint().padding(0.1);
        }
        scale.range([0, Width]).domain(domain);
        // #endregion

        return scale;
    }

    public BuildYScale(Series: Series[],Height:number,  Min?: any, Max?: any): any
    {
        let uniqueValues = [];
        for (let series of Series) {
            for (let point of series.Data) {
                if (!uniqueValues.includes(point.Y)) {
                    uniqueValues.push(point.Y);
                }
            }
        }

        let min, max;

        min = Min != undefined ? Min : Math.min(...uniqueValues);
        max = Max != undefined ? Max : Math.max(...uniqueValues);

        let domain = [min, max];

        const scale = scaleLinear()
            .range([Height, 0])
            .domain(domain);

        return scale;
    }

    private GetScaleType(Points: Point[]): 'Linear' | 'Time' | 'Ordinal'
    {
        let IsDate: boolean = true;
        let isNum: boolean = true;

        if (Points.length == 0) //Error handling if no values are passed in.
        {
            return 'Linear';
        }

        for (const point of Points) {
            if (!(point.X instanceof Date)) {
                IsDate = false;
            }
            else if (typeof point.X !== 'number') {

                isNum = false;
                break;  //If its not a date and not a number, its ordinal.
            }
        }
        return (IsDate ? 'Time' : (isNum ? 'Linear' : 'Ordinal'));
    }

    public CalculateDimensions(Width: number, Height: number, XAxis:Axis, YAxes: Axis[], LegendOptions: LegendOptions): Dimensions
    {
        let chartDimensions = new Dimensions();
        chartDimensions.Width = Width;
        chartDimensions.Height = Height;

        chartDimensions.PlotWAxesALabels = new Dimension();
        chartDimensions.PlotWAxesALabels.X = (LegendOptions.Position == 'Left' ? LegendOptions.Space : 0); 
        chartDimensions.PlotWAxesALabels.Y = (LegendOptions.Position == 'Top' ? LegendOptions.Space : 0);
        chartDimensions.PlotWAxesALabels.Width = chartDimensions.Width - (LegendOptions.Position == 'Right' ? LegendOptions.Space : 0) - chartDimensions.PlotWAxesALabels.X;
        chartDimensions.PlotWAxesALabels.Height = chartDimensions.Height - (LegendOptions.Position == 'Bottom' ? LegendOptions.Space : 0) - chartDimensions.PlotWAxesALabels.Y;


        chartDimensions.PlotWAxes = new Dimension();
        chartDimensions.PlotWAxes.X = (YAxes.findIndex((axis) => axis.Position == 'Left') > -1 ? YAxes.find((axis) => axis.Position == 'Left').Label.Space : 0);// + chartDimensions.PlotWAxesALabels.X;   //If the X Axis is on the top, leave space for the label.
        chartDimensions.PlotWAxes.Y = (XAxis.Position == 'Top' ? XAxis.Label.Space : 0);// + chartDimensions.PlotWAxesALabels.Y;
        chartDimensions.PlotWAxes.Width = chartDimensions.PlotWAxesALabels.Width - (YAxes.findIndex((axis) => axis.Position == 'Right') > -1 ? YAxes.find((axis) => axis.Position == 'Right').Label.Space : 0) - chartDimensions.PlotWAxes.X;
        chartDimensions.PlotWAxes.Height = chartDimensions.PlotWAxesALabels.Height - (XAxis.Position == 'Bottom' ? XAxis.Label.Space : 0) - chartDimensions.PlotWAxes.Y;
        

        chartDimensions.Plot = new Dimension();
        chartDimensions.Plot.X = (YAxes.findIndex((axis) => axis.Position == 'Left') > -1 && YAxes.find((axis) => axis.Position == 'Left').MajorTicks.Labels.Show ? YAxes.find((axis) => axis.Position == 'Left').MajorTicks.Labels.Space : 0);// + chartDimensions.PlotWAxes.X;
        chartDimensions.Plot.Y = (XAxis.MajorTicks.Labels.Show && XAxis.Position == 'Top' ? XAxis.MajorTicks.Labels.Space : 0);// + chartDimensions.PlotWAxes.Y;
        chartDimensions.Plot.Height = chartDimensions.PlotWAxes.Height - (XAxis.Position == 'Bottom' ? XAxis.MajorTicks.Labels.Space : 0) - chartDimensions.Plot.Y;
        chartDimensions.Plot.Width = chartDimensions.PlotWAxes.Width - (YAxes.findIndex((axis) => axis.Position == 'Right') > -1 ? YAxes.find((axis) => axis.Position == 'Right').MajorTicks.Labels.Space : 0) - chartDimensions.Plot.X;

        return chartDimensions;
    }

    public CombineChartSeries(ChartSeries: [Series[], Series[], Series[]]): Series[]
    {
        let ro = [];
        for (let chart of ChartSeries)
        {
            for (let series of chart)
            {
                ro.push(series);
            }
        }
        return ro;
    }

    // #region Old
    //GetXDomain(Series: Series[], Min?: any, Max?:any): any[]
    //{
    //    let uniqueValues = [];
    //    for (let series of Series)
    //    {
    //        for (let point of series.Data)
    //        {
    //            if (!uniqueValues.includes(point.X))
    //            {
    //                uniqueValues.push(point.X);
    //            }
    //        }
    //    }

    //    let scaleType = this.GetScaleType(uniqueValues);

    //    let domain = [];
    //    let min, max;

    //    if (scaleType == 'Linear')
    //    {
    //        uniqueValues = uniqueValues.map(v => Number(v));    //Converts all of Unique Values to numbers if they're in string form.
    //    }

    //    if (scaleType == 'Time' || scaleType == 'Linear')   //Define min and max for reasonable scale types.
    //    {
    //        min = Min != null ? min : Math.min(...uniqueValues);
    //        max = Max != null ? min : Math.max(...uniqueValues);
    //    }

    //    if (scaleType == 'Time') {
    //        domain = [new Date(min), new Date(max)];
    //        //I had some stuff about XSet here.  Don't remember what that does.
    //    }
    //    else if (scaleType == 'Linear') {
    //        domain = [min, max];
    //        //I had some stuff about XSet here.  Don't remember what that does.
    //    }
    //    else
    //    {
    //        domain = uniqueValues;
    //        //I had some stuff about XSet here.  Don't remember what that does.
    //    }

    //    return domain;
    //}

    //GetYDomain(Series: Series[], Min?: any, Max?: any): any[] {
    //    let uniqueValues = [];
    //    for (let series of Series) {
    //        for (let point of series.Data) {
    //            if (!uniqueValues.includes(point.Y)) {
    //                uniqueValues.push(point.Y);
    //            }
    //        }
    //    }

    //    let min, max;
    
    //    min = Min != null ? min : Math.min(...uniqueValues);
    //    max = Max != null ? min : Math.max(...uniqueValues);

    //    return [min,max];
    //}

    //GetXScale(Domain: any[], Width: number, ScaleType: string): any
    //{
    //    let scale;
    //    let bandwidth = 1;  //Not sure what this does yet.  I think it has something to do with the bars, but I havent tested it at all yet.

    //    if (ScaleType == 'time') {
    //        scale = scaleTime();
    //    }
    //    else if (ScaleType == 'linear') {
    //        scale = scaleLinear();
    //    }
    //    else if (ScaleType == 'ordinal')   //Could be an else.
    //    {
    //        scale = scalePoint().padding(0.1);
    //    }
    //    scale.range([0, Width]).domain(Domain);
    //    return scale;
    //}

    //GetYScale(Domain: any[], Height: number): any
    //{
    //    const scale = scaleLinear()
    //        .range([Height, 0])
    //        .domain(Domain);
    //    return scale;
    //}
    // #endregion
}