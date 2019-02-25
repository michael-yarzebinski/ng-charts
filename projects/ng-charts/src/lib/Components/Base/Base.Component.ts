import { Component, Input, SimpleChanges, EventEmitter, KeyValueDiffer, KeyValueDiffers } from '@angular/core';
import { Dimensions } from '../../AdditionalClasses/AdditionalClasses';
import { LegendOptions } from '../Legend/Legend.Classes';
import { AreaSeries, LineSeries, ScatterSeries } from '../Series/Series.Classes';


@Component({
  selector: 'ngc-base-chart',
  templateUrl: './Base.Component.html'
})
export class BaseChartComponent
{
    @Input() Width: number;
    @Input() Height: number;
    @Input() Dimensions: Dimensions;
    @Input() LegendOptions: LegendOptions;
    @Input() Series: (AreaSeries | LineSeries | ScatterSeries)[];

    // #region Differs
    DimensionsDiffer: any;
    LegendOptionsDiffer: any;
    SeriesDiffer: any;
    // #endregion

    Transform: string;

    constructor(private _differs: KeyValueDiffers) { }

    ngOnInit()
    {
        this.DimensionsDiffer = this._differs.find(this.Dimensions).create();
        this.LegendOptionsDiffer = this._differs.find(this.LegendOptions).create();
        this.SeriesDiffer = this._differs.find(this.Series).create();

        this.update();
    }

    ngDoCheck()
    {
        if (this._differs)
        {
            const changes = this.DimensionsDiffer.diff(this.Dimensions) || this.LegendOptionsDiffer.diff(this.LegendOptions) || this.SeriesDiffer.diff(this.Series);
            if (changes)
            {
                this.update();
            }
        }
    }

    update()
    {
        this.Transform = 'translate(' + (this.Dimensions.PlotWAxesALabels.X + this.Dimensions.PlotWAxes.X + this.Dimensions.Plot.X) + ',' + (this.Dimensions.PlotWAxesALabels.Y + this.Dimensions.PlotWAxes.Y + this.Dimensions.Plot.Y) + ')';
    }

}