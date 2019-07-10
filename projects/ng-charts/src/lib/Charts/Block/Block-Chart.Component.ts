import { Component, Input, OnInit, AfterViewInit, KeyValueDiffers } from '@angular/core';
import { BaseChartClass, BaseChart } from '../../Components/Base/Base.Class';
import { BlockSeries } from '../../Components/Series/Series.Classes';
import { Axis } from '../../Components/Axis/Axis.Classes';
import { Dimensions } from '../../AdditionalClasses/AdditionalClasses';
import { LegendOptions } from '../../Components/Legend/Legend.Classes'


@Component({
    selector: 'ngc-block-chart',
    templateUrl: './Block-Chart.Component.html'
})
export class BlockChart extends BaseChartClass implements BaseChart
{
    @Input() LegendOptions: LegendOptions;
    @Input() Series: BlockSeries[];
    @Input() XAxis: Axis;
    @Input() YAxes: Axis[];
    @Input() Width: number;
    @Input() Height: number;
    @Input() ChartOrientation: 'Horizontal' | 'Vertical';

    Dimensions: Dimensions;
    Transform: string;
    XScale: any;
    YScale: any;    //Not sure about this yet...
    ClipPath: string;
    ClipPathID: number;

    constructor(private _differs: KeyValueDiffers) {
        super();
    }

    ngOnInit()
    {
        this.ClipPathID = Math.random() * 10000;    //Generate a random number for the clip path ID.  This causes problems when multiple plots are on the same screen.
        //Ill add differs later.
        this.update();
    }

    ngDoCheck() {
        //if (this._differs) {
        //    const changes = this.LegendOptionsDiffer.diff(this.LegendOptions) || this.SeriesDiffer.diff(this.Series) || this.XAxisDiffer.diff(this.XAxis) || this.YAxesDiffer.diff(this.YAxes);

        //    if (changes) {
        //        this.update();
        //    }
        //}
    }

    update()
    {
        this.ClipPath = "";
        this.Dimensions = this.CalculateDimensions(this.Width, this.Height, this.XAxis, this.YAxes, this.LegendOptions, this.ChartOrientation);
        if (this.ChartOrientation == 'Horizontal') {
            this.XScale = this.BuildXScale(this.Series, this.Dimensions.Plot.Width, this.XAxis.Min, this.XAxis.Max, this.XAxis.Reverse);
            this.YScale = this.BuildYScale(this.Series, this.Dimensions.Plot.Height, this.YAxes[0].Min, this.YAxes[0].Max, this.YAxes[0].Reverse);
        }
        else if (this.ChartOrientation == 'Vertical')
        {
            this.XScale = this.BuildXScale(this.Series, this.Dimensions.Plot.Height, this.XAxis.Min, this.XAxis.Max, this.XAxis.Reverse);
            this.YScale = this.BuildYScale(this.Series, this.Dimensions.Plot.Width, this.YAxes[0].Min, this.YAxes[0].Max, this.YAxes[0].Reverse);
        }
    }

}