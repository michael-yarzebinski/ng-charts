import { Component, Input, KeyValueDiffers, EventEmitter, Output } from '@angular/core';
import { AreaSeries as Series, Point } from '../Series.Classes';

import { Dimensions } from '../../../AdditionalClasses/AdditionalClasses';

import { GenerateAreaPath } from '../Generators';

@Component({
    selector: 'g[ngc-area-series]',
    templateUrl: './Area-Series.Component.html'
})
export class AreaSeries {
    @Input() Series: Series;
    @Input() XScale: any;
    @Input() YScale: any;
    @Input() Dimensions: Dimensions;
    @Input() MouseOverChart: EventEmitter<Point>;

    @Output() MouseOverSeries: EventEmitter<any> = new EventEmitter<any>();

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

        this.Path = GenerateAreaPath(this.Series.Data, this.XScale, this.YScale);
        this.Transform = 'translate(' + (this.Dimensions.PlotWAxes.X + this.Dimensions.Plot.X) + ',' + (this.Dimensions.PlotWAxes.Y + this.Dimensions.Plot.Y) + ')';

    }

    MouseMoveOverSeries(Event: any) {
        this.MouseOverSeries.emit(Event);
    }
}