import { Component, Input } from '@angular/core'
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
    Transform: string;
    
    ngOnInit()
    {
        this.Transform = 'translate(' + this.Dimensions.PlotWAxes.X + ',' + this.Dimensions.PlotWAxes.Y + ')';
    }
}