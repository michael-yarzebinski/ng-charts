import { Component, Input } from '@angular/core';
import { Series, Point } from '../Series.Classes';

import { line } from 'd3-shape';
import { Dimensions } from '../../../AdditionalClasses/AdditionalClasses';

import { GenerateLinePath, GenerateAreaPath } from '../Generators'

@Component({
    selector: 'g[ngc-area-series]',
    templateUrl: './Area-Series.Component.html'
})
export class AreaSeries {
    @Input() Series: Series;
    @Input() XScale: any;
    @Input() YScale: any;
    @Input() Dimensions: Dimensions;

    Path: string;
    Transform: string;

    ngOnInit() {
        this.update();
    }

    update() {

        this.Path = GenerateAreaPath(this.Series.Data, this.XScale, this.YScale);
        this.Transform = 'translate(' + (this.Dimensions.PlotWAxes.X + this.Dimensions.Plot.X) + ',' + (this.Dimensions.PlotWAxes.Y + this.Dimensions.Plot.Y) + ')';

    }
}