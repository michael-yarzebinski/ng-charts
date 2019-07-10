import { Component, Input, EventEmitter, KeyValueDiffers } from '@angular/core'
import { Dimensions } from '../../AdditionalClasses/AdditionalClasses';
import { Axis } from './Axis.Classes';
import { BaseChart } from '../Base/Base.Class';

@Component({
    selector: 'g[ngc-axis]',
    templateUrl: './Axis.Component.html'
})
export class AxisComponent implements BaseChart {
    @Input() Axis: Axis;
    @Input() Scale: any;
    @Input() Dimensions: Dimensions;
    @Input() TickLabelLocation: 'Center' | 'OnTick';

    // #region Differs
    AxisDiffer: any;
    ScaleDiffer: any;
    DimensionsDiffer: any;
    // #endregion

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
        this.Transform = 'translate(' + this.Dimensions.PlotWAxes.X + ',' + this.Dimensions.PlotWAxes.Y + ')';
        if (this.Axis.Position == 'Left' || this.Axis.Position == 'Right') {
            this.Rotate = 'rotate(' + (this.Axis.Position == 'Left' ? '270 ' : '90 ') + (this.Axis.Position == 'Left' ? this.Dimensions.PlotWAxesALabels.X + (this.Dimensions.PlotWAxes.X - this.Dimensions.PlotWAxesALabels.X) - this.Axis.Title.Style.FontSize / 2 : (this.Dimensions.PlotWAxes.X + this.Dimensions.PlotWAxes.Width) + ((this.Dimensions.PlotWAxesALabels.X + this.Dimensions.PlotWAxesALabels.Width) - (this.Dimensions.PlotWAxes.X + this.Dimensions.PlotWAxes.Width)) / 2) + ',' + (this.Dimensions.Plot.Height / 2) + ')';
        }
        else {
            this.Rotate = "";
        }
    }
}