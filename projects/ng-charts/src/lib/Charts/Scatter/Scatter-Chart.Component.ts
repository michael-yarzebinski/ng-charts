import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { BaseChartClass, BaseChart } from '../../Components/Base/Base.Class';
import { Series } from '../../Components/Series/Series.Classes';
import { Axis } from '../../Components/Axes/Axes.Classes';
import { Dimensions } from '../../AdditionalClasses/AdditionalClasses';
import { LegendOptions } from '../../Components/Legend/Legend.Classes'

@Component({
    selector: 'ngc-scatter-chart',
    templateUrl: './Scatter-Chart.Component.html'
})
export class ScatterChart extends BaseChartClass implements BaseChart {
    @Input() LegendOptions: LegendOptions;
    @Input() ScatterSeries: Series[];
    @Input() XAxis: Axis;
    @Input() YAxis: Axis;
    @Input() Width: number;
    @Input() Height: number;
    Dimensions: Dimensions;
    Transform: string;
    XScale: any;
    YScale: any;
    ClipPath: string;

    ngOnInit() {
        this.update();
    }

    update() {
        this.ClipPath = "";
        this.Dimensions = this.CalculateDimensions(this.Width, this.Height, this.XAxis, [this.YAxis],this.LegendOptions);
        this.XScale = this.BuildXScale(this.ScatterSeries, this.Dimensions.Plot.Width, this.XAxis.Min, this.XAxis.Max);
        this.YScale = this.BuildYScale(this.ScatterSeries, this.Dimensions.Plot.Height, this.YAxis.Min, this.YAxis.Max);
        this.Transform = 'translate(' + this.Dimensions.PlotWAxesALabels.X + "," + this.Dimensions.PlotWAxesALabels.Y + ")";
        this.ClipPath = "url(#PlotClipPath)";
        console.log("Line-Chart-Component Transform : " + this.Transform);
    }
}