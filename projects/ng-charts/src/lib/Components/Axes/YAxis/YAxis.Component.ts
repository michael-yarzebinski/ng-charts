import { Component, Input } from '@angular/core'
import { Axis } from '../Axes.Classes';
import { Dimensions } from '../../../AdditionalClasses/AdditionalClasses';

@Component({
    selector: 'g[ngc-y-axis]',
    templateUrl: './YAxis.Component.html'
})
export class YAxisComponent {
    @Input() Axis: Axis;
    @Input() Scale: any;
    @Input() Dimensions: Dimensions;
    Transform: string;
    Rotate: string

    ngOnInit()
    {
        this.Transform = 'translate(' + this.Dimensions.PlotWAxes.X + ',' + this.Dimensions.PlotWAxes.Y + ')';
        this.Rotate = 'rotate('+(this.Axis.Position == 'Left' ? '270 ' : '90 ') + (this.Axis.Position == 'Left' ? this.Dimensions.PlotWAxesALabels.X + (this.Dimensions.PlotWAxes.X - this.Dimensions.PlotWAxesALabels.X) : this.Dimensions.PlotWAxes.X + this.Dimensions.PlotWAxes.Width) + ',' + (this.Dimensions.Plot.Height / 2) + ')';
    }
}