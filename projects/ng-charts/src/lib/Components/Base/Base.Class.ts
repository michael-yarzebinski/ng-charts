import { HostListener, EventEmitter } from '@angular/core'

import { scaleBand, scaleLinear, scalePoint, scaleTime, scaleOrdinal } from 'd3-scale';

import { Point, Bar, Block, AreaSeries, LineSeries, ScatterSeries, BarSeries, BlockSeries } from '../Series/Series.Classes';
import { Dimensions, Dimension } from '../../AdditionalClasses/AdditionalClasses';
import { Axis } from '../Axis/Axis.Classes';
import { LegendOptions } from '../Legend/Legend.Classes';
import { TooltipParameters } from '../Tooltip/Tooltip.Class';
import { debug } from 'util';


export interface BaseChart
{
    update: Function;
}

export class BaseChartClass implements BaseChart
{
    // #region Event Properties
    ChartHover: EventEmitter<any[]> = new EventEmitter<any[]>();
    MouseOverChart: boolean = false;

    // #endregion



    update()
    {
    }
    public BuildXScale(Series: (AreaSeries | LineSeries | ScatterSeries | BarSeries | BlockSeries)[], Width: number, Min?: any, Max?: any, Reverse?: boolean, BarPadding?: number): any
    {
        //debugger;
        // #region Get X Domain
        let uniqueValues = [];
        for (let series of Series) {
            if (series.Type == 'Line' || series.Type == 'Area' || series.Type == 'Scatter') {
                for (let point of series.Data)
                {
                    if (!uniqueValues.includes(point.X))
                    {
                        uniqueValues.push(point.X);
                    }
                }
            }
            else if (series.Type == 'Bar' || series.Type == 'Block') {
                if (!uniqueValues.includes(series.Name)) {
                    uniqueValues.push(series.Name);
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

        if (scaleType == 'Linear' || scaleType == 'Time')   //Sorts the unique values for plotting only if it makes sense (not Ordinal)
        {
            uniqueValues = uniqueValues.sort((a: any, b: any) => {
                if (a < b) {
                    return -1;
                }
                else if (a > b) {
                    return 1;
                }
                else
                {
                    return 0;
                }

            });
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
        // #region Reverse Domain if necessary
        if (Reverse)
        {
            domain = domain.reverse();
        }
        // #endregion
        // #endregion
        // #region Get X Scale
        let scale;
        let bandwidth = 1;  //Not sure what this does yet.  I think it has something to do with the bars, but I havent tested it at all yet.

        if (scaleType == 'Time') {
            scale = scaleTime();
            scale.range([0, Width]).domain(domain);
        }
        else if (scaleType == 'Linear') {
            scale = scaleLinear();
            scale.range([0, Width]).domain(domain);
        }
        else if (scaleType == 'Ordinal')   //Could be an else.
        {
            BarPadding = 0;
            scale = scaleBand()
                .domain(domain)
                .range([0, Width])
                .padding(BarPadding);
            //scale.range([0, Width]).domain(domain);//.paddingInner(25);    
        }
        //scale.range([0, Width]).domain(domain);
        // #endregion

        return scale;
    }

    public BuildYScale(Series: (AreaSeries | LineSeries | ScatterSeries | BarSeries | BlockSeries)[], Height: number, Min?: any, Max?: any, Reverse?: boolean): any
    {

        // #region Get Y Domain
        let uniqueValues = [];
        for (let series of Series) {
            if (series.Type == 'Line' || series.Type == 'Area' || series.Type == 'Scatter') {
                for (let point of series.Data) {
                    if (!uniqueValues.includes(point.X)) {
                        uniqueValues.push(point.X);
                    }
                }
            }
            else if (series.Type == 'Bar') {
                for (let bar of series.Data) {
                    if (!uniqueValues.includes(bar.Value)) {
                        uniqueValues.push(bar.Value);
                    }
                }
            }
            else if (series.Type == 'Block') {
                for (let block of series.Data) {
                    if (!uniqueValues.includes(block.Start)) {
                        uniqueValues.push(block.Start);
                    }
                    if (!uniqueValues.includes(block.End)) {
                        uniqueValues.push(block.End);
                    }
                }
            }
        }


        // #region Determine Scale Type
        let scaleType;
        //debugger;
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
        // #endregion
        let min, max;
        if (scaleType == 'Time') {
            min = Min != undefined ? Min : new Date(Math.min.apply(null, uniqueValues));
            max = Max != undefined ? Max : new Date(Math.max.apply(null, uniqueValues));
        }
        else
        {
            min = Min != undefined ? Min : Math.min(...uniqueValues);
            max = Max != undefined ? Max : Math.max(...uniqueValues);
        }

        //let min, max;

        //min = Min != undefined ? Min : Math.min(...uniqueValues);
        //max = Max != undefined ? Max : Math.max(...uniqueValues);

        let domain = [min, max];

        // #region Reverse Domain if necessary.
        if (scaleType == 'Time')    //Time axis behaves wierd on the Y.
        {
            domain = domain.reverse();
        }
        if (Reverse)
        {
            domain = domain.reverse();
        }
        // #endregion
        // #endregion
        //#region Get Y Scale
        const scale = scaleLinear()
            .range([Height, 0])
            .domain(domain);
        // #endregion

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
            if (!(point instanceof Date)) {
                IsDate = false;
            }
            if (typeof point !== 'number') {

                isNum = false;
                break;  //If its not a date and not a number, its ordinal.
            }
        }
        return (IsDate ? 'Time' : (isNum ? 'Linear' : 'Ordinal'));
    }

    public CalculateDimensions(Width: number, Height: number, XAxis:Axis, YAxes: Axis[], LegendOptions: LegendOptions, ChartOrientation?: "Horizontal" | "Vertical"): Dimensions
    {
        let chartDimensions = new Dimensions();
        chartDimensions.Width = Width;
        chartDimensions.Height = Height;

        if (ChartOrientation == null || ChartOrientation == "Horizontal") {
            chartDimensions.PlotWAxesALabels = new Dimension();
            chartDimensions.PlotWAxesALabels.X = (LegendOptions.Position == 'Left' ? LegendOptions.Space : 0);
            chartDimensions.PlotWAxesALabels.Y = (LegendOptions.Position == 'Top' ? LegendOptions.Space : 0);
            chartDimensions.PlotWAxesALabels.Width = chartDimensions.Width - (LegendOptions.Position == 'Right' ? LegendOptions.Space : 0) - chartDimensions.PlotWAxesALabels.X;
            chartDimensions.PlotWAxesALabels.Height = chartDimensions.Height - (LegendOptions.Position == 'Bottom' ? LegendOptions.Space : 0) - chartDimensions.PlotWAxesALabels.Y;

            chartDimensions.PlotWAxes = new Dimension();
            chartDimensions.PlotWAxes.X = (YAxes.findIndex((axis) => axis.Position == 'Left') > -1 ? YAxes.find((axis) => axis.Position == 'Left').Title.Space : 0);// + chartDimensions.PlotWAxesALabels.X;   //If the X Axis is on the top, leave space for the label.
            chartDimensions.PlotWAxes.Y = (XAxis.Position == 'Top' ? XAxis.Title.Space : 0);// + chartDimensions.PlotWAxesALabels.Y;
            chartDimensions.PlotWAxes.Width = chartDimensions.PlotWAxesALabels.Width - (YAxes.findIndex((axis) => axis.Position == 'Right') > -1 ? YAxes.find((axis) => axis.Position == 'Right').Title.Space : 0) - chartDimensions.PlotWAxes.X;
            chartDimensions.PlotWAxes.Height = chartDimensions.PlotWAxesALabels.Height - (XAxis.Position == 'Bottom' ? XAxis.Title.Space : 0) - chartDimensions.PlotWAxes.Y;

            chartDimensions.Plot = new Dimension();
            chartDimensions.Plot.X = (YAxes.findIndex((axis) => axis.Position == 'Left') > -1 && YAxes.find((axis) => axis.Position == 'Left').Labels.Show ? YAxes.find((axis) => axis.Position == 'Left').Labels.Space : 0);// + chartDimensions.PlotWAxes.X;
            chartDimensions.Plot.Y = (XAxis.Labels.Show && XAxis.Position == 'Top' ? XAxis.Labels.Space : 0);// + chartDimensions.PlotWAxes.Y;
            chartDimensions.Plot.Height = chartDimensions.PlotWAxes.Height - (XAxis.Position == 'Bottom' ? XAxis.Labels.Space : 0) - chartDimensions.Plot.Y;
            chartDimensions.Plot.Width = chartDimensions.PlotWAxes.Width - (YAxes.findIndex((axis) => axis.Position == 'Right') > -1 ? YAxes.find((axis) => axis.Position == 'Right').Labels.Space : 0) - chartDimensions.Plot.X;
        }
        else if(ChartOrientation == "Vertical") //X Axis is on the left.
        {
            //Legend stuff stays the same.
            chartDimensions.PlotWAxesALabels = new Dimension();
            chartDimensions.PlotWAxesALabels.X = (LegendOptions.Position == 'Left' ? LegendOptions.Space : 0);
            chartDimensions.PlotWAxesALabels.Y = (LegendOptions.Position == 'Top' ? LegendOptions.Space : 0);
            chartDimensions.PlotWAxesALabels.Width = chartDimensions.Width - (LegendOptions.Position == 'Right' ? LegendOptions.Space : 0) - chartDimensions.PlotWAxesALabels.X;
            chartDimensions.PlotWAxesALabels.Height = chartDimensions.Height - (LegendOptions.Position == 'Bottom' ? LegendOptions.Space : 0) - chartDimensions.PlotWAxesALabels.Y;

            chartDimensions.PlotWAxes = new Dimension();
            chartDimensions.PlotWAxes.X = (XAxis.Position == 'Left' ? XAxis.Title.Space : 0);
            chartDimensions.PlotWAxes.Y = (YAxes.findIndex((axis) => axis.Position == 'Top') > -1 ? YAxes.find((axis) => axis.Position == 'Top').Title.Space : 0);
            chartDimensions.PlotWAxes.Width = chartDimensions.PlotWAxesALabels.Width - (XAxis.Position == 'Right' ? XAxis.Title.Space : 0) - chartDimensions.PlotWAxes.X;
            chartDimensions.PlotWAxes.Height = chartDimensions.PlotWAxesALabels.Height - (YAxes.findIndex((axis) => axis.Position == 'Bottom') > -1 ? YAxes.find((axis) => axis.Position == 'Bottom').Title.Space : 0) - chartDimensions.PlotWAxes.Y;

            chartDimensions.Plot = new Dimension();
            chartDimensions.Plot.X = (XAxis.Labels.Show && XAxis.Position == 'Left' ? XAxis.Labels.Space : 0);
            chartDimensions.Plot.Y = (YAxes.findIndex((axis) => axis.Position == 'Top') > -1 && YAxes.find((axis) => axis.Position == 'Top').Labels.Show ? YAxes.find((axis) => axis.Position == 'Top').Labels.Space : 0);            
            chartDimensions.Plot.Height = chartDimensions.PlotWAxes.Height - (YAxes.findIndex((axis) => axis.Position == 'Right') > -1 ? YAxes.find((axis) => axis.Position == 'Right').Labels.Space : 0)  - chartDimensions.Plot.Y;
            chartDimensions.Plot.Width = chartDimensions.PlotWAxes.Width - (XAxis.Position == 'Bottom' ? XAxis.Labels.Space : 0) - chartDimensions.Plot.X;
        }

        return chartDimensions;
    }

    public CombineChartSeries(ChartSeries: [(AreaSeries | LineSeries | ScatterSeries)[], (AreaSeries | LineSeries | ScatterSeries)[], (AreaSeries | LineSeries | ScatterSeries)[]]): (AreaSeries | LineSeries | ScatterSeries)[]
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

    public ChangeMouseOverChart(Value: boolean, Event:any = null)
    {
        if (Value == false) {   //This allows hovering over paths on the chart.
            let e = Event.toElement;
            if (e != null && ["circle", "path"].indexOf(e.nodeName) == -1) {
                this.MouseOverChart = Value;
            }
        }
        else {
            this.MouseOverChart = Value;
        }

        if (!this.MouseOverChart)   //When mouse leaves chart area, reset Mouse X Position.
        {
            this.ChartHover.emit(null);
        }
    }

    public MouseMoveOverChart(Event: any)
    {
        let ChartDimensions: Point;
        let ChartLocation: Point
        try {
            let EventPath = (Event.path[0].nodeName == "rect" ? Event.path[0] : Event.path[5]);
            ChartDimensions = { //Used to position the Tooltip on the screen
                X: EventPath.getBoundingClientRect().x + document.documentElement.scrollLeft,   //There is a problem here for the Area series.  The path is incorrect because the parent is the area!
                Y: EventPath.getBoundingClientRect().y + document.documentElement.scrollTop
            }
            ChartLocation = {   //Used to identify which point is closest.
                X: Event.clientX - EventPath.getBoundingClientRect().x,
                Y: Event.clientY - EventPath.getBoundingClientRect().y
            }
        }
        catch
        {
            ChartDimensions = {
                X: Event.srcElement.getBoundingClientRect().left + document.documentElement.scrollLeft,
                Y: Event.srcElement.getBoundingClientRect().top + document.documentElement.scrollTop
            }
            ChartLocation = {
                X: Event.clientX  - Event.srcElement.getBoundingClientRect().left,
                Y: Event.clientY  - Event.srcElement.getBoundingClientRect().top
            }
        }
        this.ChartHover.emit([ChartDimensions, ChartLocation]);
    }

}