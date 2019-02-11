import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { BaseChartClass, BaseChart } from '../../Components/Base/Base.Class';
import { Series } from '../../Components/Series/Series.Classes';
import { Axis } from '../../Components/Axes/Axes.Classes';
import { Dimensions } from '../../AdditionalClasses/AdditionalClasses';
import { LegendOptions } from '../../Components/Legend/Legend.Classes';

@Component({
    selector: 'ngc-area-chart',
    templateUrl: './Area-Chart.Component.html'
})
export class AreaChart extends BaseChartClass implements BaseChart {
    @Input() LegendOptions: LegendOptions;
    @Input() Series: Series[];
    @Input() XAxis: Axis;
    @Input() YAxes: Axis[];
    @Input() Width: number;
    @Input() Height: number;
    Dimensions: Dimensions;
    Transform: string;
    XScale: any;
    Y1Scale: any;
    Y2Scale: any;
    ClipPath: string;

    ngOnInit() {
        this.update();
    }

    update() {
        this.ClipPath = "";
        this.Dimensions = this.CalculateDimensions(this.Width, this.Height, this.XAxis, this.YAxes, this.LegendOptions);
        this.XScale = this.BuildXScale(this.Series, this.Dimensions.Plot.Width, this.XAxis.Min, this.XAxis.Max);
        if (this.YAxes.find((axis) => axis.Position == 'Left')) {
            this.Y1Scale = this.BuildYScale(this.Series.filter(series => series.YAxis == 'Left'), this.Dimensions.Plot.Height, this.YAxes.find((axis) => axis.Position == 'Left').Min, this.YAxes.find((axis) => axis.Position == 'Left').Max);
        }
        if (this.YAxes.find((axis) => axis.Position == 'Right')) {
            this.Y2Scale = this.BuildYScale(this.Series.filter(series => series.YAxis == 'Right'), this.Dimensions.Plot.Height, this.YAxes.find((axis) => axis.Position == 'Right').Min, this.YAxes.find((axis) => axis.Position == 'Right').Max);
        }
        this.Transform = 'translate(' + this.Dimensions.PlotWAxesALabels.X + "," + this.Dimensions.PlotWAxesALabels.Y + ")";
        this.ClipPath = "url(#PlotClipPath)";
    }
}