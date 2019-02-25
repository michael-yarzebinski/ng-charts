import { Component, Input, EventEmitter, KeyValueDiffers } from '@angular/core';
import { Axis } from '../Axes.Classes';
import { BaseChart } from '../../Base/Base.Class';
import { Dimensions } from '../../../AdditionalClasses/AdditionalClasses';

@Component({
    selector: 'g[ngc-y-axis-ticks]',
    templateUrl: './YAxis-Ticks.Component.html'
})
export class YAxisTicksComponent implements BaseChart {
    @Input() Scale: any;
    @Input() Axis:Axis
    @Input() Dimensions: Dimensions;

    // #region Differs
    AxisDiffer: any;
    ScaleDiffer: any;
    DimensionsDiffer: any;
    // #endregion

    Ticks: any[];

    Transform: string;

    constructor(private _differs: KeyValueDiffers) { }

    ngOnInit() {
        this.AxisDiffer = this._differs.find(this.Axis).create();
        this.ScaleDiffer = this._differs.find(this.Scale).create();
        this.DimensionsDiffer = this._differs.find(this.Dimensions).create();

        this.update();
    }

    ngDoCheck() {
        if (this._differs) {
            const changes = this.AxisDiffer.diff(this.Axis) || this.ScaleDiffer.diff(this.Scale) || this.DimensionsDiffer.diff(this.Dimensions);
            if (changes) {
                this.update();
            }
        }
    }

    update() {
        this.Ticks = this.Scale.ticks(this.Axis.TickCount);
        this.Transform = 'translate(' + this.Dimensions.Plot.X + ',' + this.Dimensions.Plot.Y + ')';
    }

}