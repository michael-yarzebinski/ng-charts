import { Component, Input } from '@angular/core';
import { Axis } from '../Axes.Classes';
import { BaseChart } from '../../Base/Base.Class';
import { Dimensions } from '../../../AdditionalClasses/AdditionalClasses';

@Component({
    selector: 'g[ngc-y-axis-ticks]',
    templateUrl: './YAxis-Ticks.Component.html'
})
export class YAxisTicksComponent implements BaseChart {
    @Input() Scale: any;
    @Input() Axis:Axis
    @Input() Dimensions: Dimensions;

    MajorTicks: any[];
    MinorTicks: any[];

    Transform: string;

    ngOnInit() {
        this.update();
    }

    update() {
        let tickCount = (this.Axis.Count % 2 == 0 ? this.Axis.Count : this.Axis.Count + 1);
        let ticks: any[] = this.Scale.ticks(tickCount > 5 ? tickCount : 5);

        let majorTicks = [];
        let minorTicks = [];

        for (let i = 0; i < ticks.length; i++) {
            if (i % 2 == 0) {
                majorTicks.push(ticks[i]);
            }
            else if (i % 2 == 1) {
                minorTicks.push(ticks[i]);
            }
        }

        this.MajorTicks = ticks;
        this.MinorTicks = minorTicks;
        //this.Dimensions.Plot.Height + this.Dimensions.Plot.Y
        //this.Axis.MajorTicks.Format()
        this.Transform = 'translate(' + this.Dimensions.Plot.X + ',' + this.Dimensions.Plot.Y + ')';
    }

}