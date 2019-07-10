import { Component, Input, KeyValueDiffers, EventEmitter, Output } from '@angular/core';
import { BlockSeries as Series, Point } from '../Series.Classes';

import { Dimensions } from '../../../AdditionalClasses/AdditionalClasses';

@Component({
    selector: 'g[ngc-block-series]',
    templateUrl: './Block-Series.Component.html'
})
export class BlockSeries
{
    @Input() Series: Series;
    @Input() XScale: any;
    @Input() YScale: any;
    @Input() Dimensions: Dimensions;
    @Input() Orientation: 'Horizontal' | 'Vertical';
    @Input() MouseOverChart: EventEmitter<Point>;

    @Output() MouseOverSeries: EventEmitter<any> = new EventEmitter<any>();

    Transform: string;


    ngOnInit() {
        this.update();
    }



    update()
    {
        console.log(this.YScale);
        this.Transform = 'translate(' + (this.Dimensions.PlotWAxes.X + this.Dimensions.Plot.X) + ',' + (this.Dimensions.PlotWAxes.Y + this.Dimensions.Plot.Y) + ')';
    }

    MouseMoveOverSeries(Event: any) {
        this.MouseOverSeries.emit(Event);
    }

}