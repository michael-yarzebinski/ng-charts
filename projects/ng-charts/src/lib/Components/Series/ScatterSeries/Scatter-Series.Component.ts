import { Component, Input, KeyValueDiffers, EventEmitter } from '@angular/core';
import { ScatterSeries as Series, Point } from '../Series.Classes';

import { line } from 'd3-shape';
import { Dimensions } from '../../../AdditionalClasses/AdditionalClasses';

import { GenerateLinePath, GenerateAreaPath } from '../Generators'

@Component({
    selector: 'g[ngc-scatter-series]',
    templateUrl: './Scatter-Series.Component.html'
})
export class ScatterSeries {
    @Input() Series: Series;
    @Input() XScale: any;
    @Input() YScale: any;
    @Input() Dimensions: Dimensions;
    @Input() MouseOverChart: EventEmitter<Point>;

    // #region Differs
    SeriesDiffer: any;
    XScaleDiffer: any;
    YScaleDiffer: any;
    DimensionsDiffer: any;
    // #endregion

    Path: string;
    Transform: string;

    constructor(private _differs: KeyValueDiffers) { }

    ngOnInit() {
        this.SeriesDiffer = this._differs.find(this.Series).create();
        this.XScaleDiffer = this._differs.find(this.XScale).create();
        this.YScaleDiffer = this._differs.find(this.YScale).create();
        this.DimensionsDiffer = this._differs.find(this.Dimensions).create();

        this.update();
    }

    ngDoCheck() {
        if (this._differs) {
            const changes = this.SeriesDiffer.diff(this.Series) || this.XScaleDiffer.diff(this.XScale) || this.YScaleDiffer.diff(this.YScale) || this.DimensionsDiffer.diff(this.Dimensions);
            if (changes) {
                this.update();
            }
        }
    }


    update() {
        this.Transform = 'translate(' + (this.Dimensions.PlotWAxes.X + this.Dimensions.Plot.X) + ',' + (this.Dimensions.PlotWAxes.Y + this.Dimensions.Plot.Y) + ')';

    }
}