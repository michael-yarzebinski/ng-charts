import { Component, Input, KeyValueDiffers } from '@angular/core';
import { BaseChartClass, BaseChart } from '../../Components/Base/Base.Class';
import { AreaSeries, LineSeries, ScatterSeries } from '../../Components/Series/Series.Classes';
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
    @Input() AreaSeries: AreaSeries[];
    @Input() LineSeries: LineSeries[];
    @Input() ScatterSeries: ScatterSeries[];
    @Input() XAxis: Axis;
    @Input() YAxes: Axis[];
    @Input() Width: number;
    @Input() Height: number;

    // #region Differs
    private LegendOptionsDiffer: any;
    private AreaSeriesDiffer: any;
    private LineSeriesDiffer: any;
    private ScatterSeriesDiffer: any;
    private XAxisDiffer: any;
    private YAxesDiffer: any;
    // #endregion

    Dimensions: Dimensions;
    Transform: string;
    XScale: any;
    Y1Scale: any;
    Y2Scale: any;
    ClipPath: string;
    ClipPathID: number;

    constructor(private _differs: KeyValueDiffers) {
        super();
    }

    ngOnInit()
    {
        this.ClipPathID = Math.random() * 10000;    //Generate a random number for the clip path ID.  This causes problems when multiple plots are on the same screen.
        this.LegendOptionsDiffer = this._differs.find(this.LegendOptions).create();
        this.AreaSeriesDiffer = this._differs.find(this.AreaSeries).create();
        this.LineSeriesDiffer = this._differs.find(this.LineSeries).create();
        this.ScatterSeriesDiffer = this._differs.find(this.ScatterSeries).create();
        this.XAxisDiffer = this._differs.find(this.XAxis).create();
        this.YAxesDiffer = this._differs.find(this.YAxes).create();

        this.update();
    }

    ngDoCheck() {
        if (this._differs) {
            const changes = this.LegendOptionsDiffer.diff(this.LegendOptions) || this.AreaSeriesDiffer.diff(this.AreaSeries) || this.LineSeriesDiffer.diff(this.LineSeries) || this.ScatterSeriesDiffer.diff(this.ScatterSeries) || this.XAxisDiffer.diff(this.XAxis) || this.YAxesDiffer.diff(this.YAxes);

            if (changes) {
                this.update();
            }
        }
    }

    update()
    {
        this.ClipPath = "";
        this.Dimensions = this.CalculateDimensions(this.Width, this.Height, this.XAxis, this.YAxes, this.LegendOptions);
        this.XScale = this.BuildXScale(this.CombineChartSeries([this.AreaSeries, this.LineSeries, this.ScatterSeries]), this.Dimensions.Plot.Width, this.XAxis.Min, this.XAxis.Max, this.XAxis.Reverse);
        //console.log(this.XScale);
        if (this.YAxes.find((axis) => axis.Position == 'Left')) {
            this.Y1Scale = this.BuildYScale([...this.AreaSeries.filter(series => series.YAxis == 'Left'), ...this.LineSeries.filter(series => series.YAxis == 'Left'), ...this.ScatterSeries.filter(series => series.YAxis == 'Left')], this.Dimensions.Plot.Height, this.YAxes.find((axis) => axis.Position == 'Left').Min, this.YAxes.find((axis) => axis.Position == 'Left').Max, this.YAxes.find((axis) => axis.Position == 'Left').Reverse);
        }
        if (this.YAxes.find((axis) => axis.Position == 'Right')) {
            this.Y2Scale = this.BuildYScale([...this.AreaSeries.filter(series => series.YAxis == 'Right'), ...this.LineSeries.filter(series => series.YAxis == 'Right'), ...this.ScatterSeries.filter(series => series.YAxis == 'Right')], this.Dimensions.Plot.Height, this.YAxes.find((axis) => axis.Position == 'Right').Min, this.YAxes.find((axis) => axis.Position == 'Right').Max, this.YAxes.find((axis) => axis.Position == 'Right').Reverse);
        }
        this.Transform = 'translate(' + this.Dimensions.PlotWAxesALabels.X + "," + this.Dimensions.PlotWAxesALabels.Y + ")";
        this.ClipPath = "url(#PlotClipPath"+this.ClipPathID+")";
    }
}