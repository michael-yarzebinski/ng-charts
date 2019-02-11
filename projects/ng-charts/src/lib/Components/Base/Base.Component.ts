import { Component, Input } from '@angular/core';
import { Dimensions } from '../../AdditionalClasses/AdditionalClasses';
import { LegendOptions } from '../Legend/Legend.Classes';
import { Series } from '../Series/Series.Classes';


@Component({
  selector: 'ngc-base-chart',
  templateUrl: './Base.Component.html'
})
export class BaseChartComponent
{
    @Input() Width: number;
    @Input() Height: number;
    @Input() Dimensions: Dimensions;
    @Input() LegendOptions: LegendOptions;
    @Input() Series: Series[];

    Transform: string;

    ngOnInit()
    {
        this.update();
    }

    update()
    {
        this.Transform = 'translate(' + (this.Dimensions.PlotWAxesALabels.X + this.Dimensions.PlotWAxes.X + this.Dimensions.Plot.X) + ',' + (this.Dimensions.PlotWAxesALabels.Y + this.Dimensions.PlotWAxes.Y + this.Dimensions.Plot.Y) + ')';
    }

}