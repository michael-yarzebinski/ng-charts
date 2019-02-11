import { Component, Input } from '@angular/core';
import { Series, Point } from '../Series.Classes';

import { line } from 'd3-shape';
import { Dimensions } from '../../../AdditionalClasses/AdditionalClasses';

import { GenerateLinePath } from '../Generators'

@Component({
    selector: 'g[ngc-line-series]',
    templateUrl: './Line-Series.Component.html'
})
export class LineSeries
{
    @Input() Series: Series;
    @Input() XScale: any;
    @Input() YScale: any;
    @Input() Dimensions: Dimensions;

    Path: string;
    Transform: string;

    ngOnInit()
    {
        this.update();
    }

    update()
    {

        //const lineGenerator = GenerateLinePath(this.Series.Data, this.XScale, this.YScale);

        this.Path = GenerateLinePath(this.Series.Data, this.XScale, this.YScale);
        this.Transform = 'translate(' + (this.Dimensions.PlotWAxes.X + this.Dimensions.Plot.X) + ',' + (this.Dimensions.PlotWAxes.Y + this.Dimensions.Plot.Y)+ ')';
        
    }


    LineGenerator(): any
    {
        return line<Point>()
            .x(d => {
                const X = d.X;
                let value = this.XScale(X);
                return value;
            })
            .y(d => this.YScale(d.Y));
    }
}