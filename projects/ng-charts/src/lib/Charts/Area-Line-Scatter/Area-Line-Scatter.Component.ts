import { Component, Input } from '@angular/core';
import { BaseChartClass, BaseChart } from '../../Components/Base/Base.Class';
import { Series } from '../../Components/Series/Series.Classes';
import { Axis } from '../../Components/Axes/Axes.Classes';
import { Dimensions } from '../../AdditionalClasses/AdditionalClasses';
import { LegendOptions } from '../../Components/Legend/Legend.Classes';

@Component({
    selector: 'ngc-area-line-scatter-chart',
    templateUrl: './Area-Line-Scatter.Component.html'
})
export class AreaLineScatterChart extends BaseChartClass implements BaseChart
{
    @Input() LegendOptions: LegendOptions;
    @Input() AreaSeries: Series[];
    @Input() LineSeries: Series[];
    @Input() ScatterSeries: Series[];
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


    ngOnInit()
    {
        this.update();
    }

    update()
    {
        this.ClipPath = "";
        this.Dimensions = this.CalculateDimensions(this.Width, this.Height, this.XAxis, this.YAxes, this.LegendOptions);
        this.XScale = this.BuildXScale(this.CombineChartSeries([this.AreaSeries, this.LineSeries, this.ScatterSeries]), this.Dimensions.Plot.Width, this.XAxis.Min, this.XAxis.Max);
        console.log(this.XScale);
        if (this.YAxes.find((axis) => axis.Position == 'Left')) {
            this.Y1Scale = this.BuildYScale([...this.AreaSeries.filter(series => series.YAxis == 'Left'), ...this.LineSeries.filter(series => series.YAxis == 'Left'), ...this.ScatterSeries.filter(series => series.YAxis == 'Left')], this.Dimensions.Plot.Height, this.YAxes.find((axis) => axis.Position == 'Left').Min, this.YAxes.find((axis) => axis.Position == 'Left').Max);
        }
        if (this.YAxes.find((axis) => axis.Position == 'Right')) {
            this.Y2Scale = this.BuildYScale([...this.AreaSeries.filter(series => series.YAxis == 'Right'), ...this.LineSeries.filter(series => series.YAxis == 'Right'), ...this.ScatterSeries.filter(series => series.YAxis == 'Right')], this.Dimensions.Plot.Height, this.YAxes.find((axis) => axis.Position == 'Right').Min, this.YAxes.find((axis) => axis.Position == 'Right').Max);
        }
        this.Transform = 'translate(' + this.Dimensions.PlotWAxesALabels.X + "," + this.Dimensions.PlotWAxesALabels.Y + ")";
        this.ClipPath = "url(#PlotClipPath)";
    }
}