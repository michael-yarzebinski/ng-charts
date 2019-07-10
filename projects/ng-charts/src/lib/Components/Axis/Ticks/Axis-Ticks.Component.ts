import { Component, Input, EventEmitter, KeyValueDiffers } from '@angular/core';
import { BaseChart } from '../../Base/Base.Class';
import { Dimensions } from '../../../AdditionalClasses/AdditionalClasses';
import { Axis } from '../Axis.Classes';

@Component({
    selector: 'g[ngc-axis-ticks]',
    templateUrl:'./Axis-Ticks.Component.html'
})
export class AxisTicksComponent implements BaseChart
{
    @Input() Axis: Axis;
    @Input() Scale: any;
    @Input() Dimensions: Dimensions;
    @Input() TickLabelLocation: 'Center' | 'OnTick' = 'OnTick';

    // #region Differs
    AxisDiffer: any;
    ScaleDiffer: any;
    DimensionsDiffer: any;
    // #endregion

    Ticks: any[];
    Transform: string;
    Rotate: string;

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

        if (typeof this.Scale.ticks === 'function') {
            this.Ticks = this.Scale.ticks(this.Axis.TickCount);
        }
        else if (typeof this.Scale.domain === 'function')
        {
            this.Ticks = this.Scale.domain();
        }

        this.Transform = 'translate(' + this.Dimensions.Plot.X + ',' + this.Dimensions.Plot.Y + ')';
    }
}