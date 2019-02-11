import { Component, Input } from '@angular/core';
import { BaseChart } from '../../Base/Base.Class';
import { Dimensions } from '../../../AdditionalClasses/AdditionalClasses';
import {  Axis } from '../Axes.Classes';

@Component({
    selector: 'g[ngc-x-axis-ticks]',
    templateUrl: './XAxis-Ticks.Component.html'
})
export class XAxisTicksComponent implements BaseChart
{
    @Input() Axis: Axis;
    @Input() Scale: any;
    @Input() Dimensions: Dimensions;
    MajorTicks: any[];
    MinorTicks: any[];

    Transform: string;

    ngOnInit()
    {
        this.update();
    }

    update()
    {
        let tickCount = (this.Axis.Count % 2 == 0 ? this.Axis.Count : this.Axis.Count + 1);
        let ticks: any[] = this.Scale.ticks(tickCount > 5 ? tickCount : 5);

        let majorTicks = [];
        let minorTicks = [];

        for (let i = 0; i < ticks.length; i++)
        {
            if (i % 2 == 0) {
                majorTicks.push(ticks[i]);
            }
            else if (i % 2 == 1)
            {
                minorTicks.push(ticks[i]);
            }
        }

        this.MajorTicks = ticks;
        this.MinorTicks = minorTicks;

        //this.Dimensions.Plot.Height + this.Dimensions.Plot.Y
        //this.Axis.MajorTicks.Format()
        this.Transform = 'translate(' + this.Dimensions.Plot.X + ',' + this.Dimensions.Plot.Y + ')';
    }

    GenerateMajorTicks() 
    {
        this.Axis.MajorTicks.TickMarks.Show && !this.Axis.MajorTicks.GridLines.Show
        this.Axis.MajorTicks.TickMarks.Size
        this.Axis.MajorTicks.TickMarks.SVGStyle
    }

}