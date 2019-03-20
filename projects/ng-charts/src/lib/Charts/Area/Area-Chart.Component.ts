import { Component, Input, OnInit, AfterViewInit, KeyValueDiffers } from '@angular/core';
import { BaseChartClass, BaseChart } from '../../Components/Base/Base.Class';
import { AreaSeries } from '../../Components/Series/Series.Classes';
import { Axis } from '../../Components/Axes/Axes.Classes';
import { Dimensions } from '../../AdditionalClasses/AdditionalClasses';
import { LegendOptions } from '../../Components/Legend/Legend.Classes';

@Component({
    selector: 'ngc-area-chart',
    templateUrl: './Area-Chart.Component.html'
})
export class AreaChart extends BaseChartClass implements BaseChart {
    @Input() LegendOptions: LegendOptions;
    @Input() Series: AreaSeries[];
    @Input() XAxis: Axis;
    @Input() YAxes: Axis[];
    @Input() Width: number;
    @Input() Height: number;

    // #region Differs
    private LegendOptionsDiffer: any;
    private SeriesDiffer: any;
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

    ngOnInit() {
        this.ClipPathID = Math.random() * 10000;    //Generate a random number for the clip path ID.  This causes problems when multiple plots are on the same screen.
        this.LegendOptionsDiffer = this._differs.find(this.LegendOptions).create();
        this.SeriesDiffer = this._differs.find(this.Series).create();
        this.XAxisDiffer = this._differs.find(this.XAxis).create();
        this.YAxesDiffer = this._differs.find(this.YAxes).create();

        this.update();
    }

    ngDoCheck() {
        if (this._differs) {
            const changes = this.LegendOptionsDiffer.diff(this.LegendOptions) || this.SeriesDiffer.diff(this.Series) || this.XAxisDiffer.diff(this.XAxis) || this.YAxesDiffer.diff(this.YAxes);

            if (changes) {
                this.update();
            }
        }
    }

    update() {
        this.ClipPath = "";
        this.Dimensions = this.CalculateDimensions(this.Width, this.Height, this.XAxis, this.YAxes, this.LegendOptions);
        this.XScale = this.BuildXScale(this.Series, this.Dimensions.Plot.Width, this.XAxis.Min, this.XAxis.Max);
        if (this.YAxes.find((axis) => axis.Position == 'Left')) {
            this.Y1Scale = this.BuildYScale(this.Series.filter(series => series.YAxis == 'Left'), this.Dimensions.Plot.Height, this.YAxes.find((axis) => axis.Position == 'Left').Min, this.YAxes.find((axis) => axis.Position == 'Left').Max, this.YAxes.find((axis) => axis.Position == 'Left').Reverse);
        }
        if (this.YAxes.find((axis) => axis.Position == 'Right')) {
            this.Y2Scale = this.BuildYScale(this.Series.filter(series => series.YAxis == 'Right'), this.Dimensions.Plot.Height, this.YAxes.find((axis) => axis.Position == 'Right').Min, this.YAxes.find((axis) => axis.Position == 'Right').Max, this.YAxes.find((axis) => axis.Position == 'Right').Reverse);
        }
        this.Transform = 'translate(' + this.Dimensions.PlotWAxesALabels.X + "," + this.Dimensions.PlotWAxesALabels.Y + ")";
        this.ClipPath = "url(#PlotClipPath" + this.ClipPathID + ")";
    }
}