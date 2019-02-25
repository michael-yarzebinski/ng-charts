import { Component, Input, EventEmitter, KeyValueDiffers } from '@angular/core'
import { Axis } from '../Axes.Classes';
import { Dimensions } from '../../../AdditionalClasses/AdditionalClasses';

@Component({
    selector: 'g[ngc-x-axis]',
    templateUrl: './XAxis.Component.html'
})
export class XAxisComponent
{
    @Input() Axis: Axis = null;
    @Input() Scale: any = null;
    @Input() Dimensions: Dimensions;

    // #region Differs
    AxisDiffer: any;
    ScaleDiffer: any;
    DimensionsDiffer: any;
    // #endregion

    Transform: string;

    constructor(private _differs: KeyValueDiffers) { }

    ngOnInit()
    {
        this.AxisDiffer = this._differs.find(this.Axis).create();
        this.ScaleDiffer = this._differs.find(this.Scale).create();
        this.DimensionsDiffer = this._differs.find(this.Dimensions).create();

        this.update();
    }

    ngDoCheck()
    {
        if (this._differs)
        {
            const changes = this.AxisDiffer.diff(this.Axis) || this.ScaleDiffer.diff(this.Scale) || this.DimensionsDiffer.diff(this.Dimensions);
            if (changes)
            {
                this.update();
            }
        }
    }


    update()
    {
        this.Transform = 'translate(' + this.Dimensions.PlotWAxes.X + ',' + this.Dimensions.PlotWAxes.Y + ')';
    }
}