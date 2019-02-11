import { Component, Input } from '@angular/core';
import { Series } from '../Series/Series.Classes';
import { LegendOptions } from './Legend.Classes';
import { Dimensions } from '../../AdditionalClasses/AdditionalClasses';

@Component({
    selector: 'g[ngc-legend]',
    templateUrl: './Legend.Component.html'
})
export class LegendComponent
{
    @Input() Dimensions: Dimensions
    @Input() Series: Series[];
    @Input() LegendOptions: LegendOptions;
    Transform: string;

    ngOnInit()
    {
        this.update();
    }

    update()
    {
        console.log(this.Series);
        this.Transform = this.DetermineTransform();
    }

    DetermineTransform() : string
    {
        
        let legendWidth = (this.LegendOptions.Orientation == 'Horizontal' && this.Series.length > 0 ? this.Series.length * this.LegendOptions.ItemWidth : this.LegendOptions.ItemWidth);
        let legendHeight = (this.LegendOptions.Orientation == 'Vertical' && this.Series.length > 0 ? this.Series.length * this.LegendOptions.ItemHeight : this.LegendOptions.ItemHeight);

        let actualX;

        if (this.LegendOptions.Position == 'Top' || this.LegendOptions.Position == 'Bottom') {
            actualX = this.Dimensions.PlotWAxesALabels.X + this.Dimensions.PlotWAxes.X + this.Dimensions.Plot.X;
        }
        else if (this.LegendOptions.Position == 'Left') {
            actualX = 0;
        }
        else if (this.LegendOptions.Position == 'Right') {
            actualX = this.Dimensions.PlotWAxesALabels.X + this.Dimensions.PlotWAxesALabels.Width;
        }

        let actualY;

        if (this.LegendOptions.Position == 'Top') {
            actualY = 0;
        }
        else if (this.LegendOptions.Position == 'Left' || this.LegendOptions.Position == 'Right') {
            actualY = this.Dimensions.PlotWAxesALabels.Y + this.Dimensions.PlotWAxes.Y + this.Dimensions.Plot.Y;
        }
        else if (this.LegendOptions.Position == 'Bottom') {
            actualY = this.Dimensions.PlotWAxesALabels.Y + this.Dimensions.PlotWAxesALabels.Height;
        }

        let relativeY;

        if (this.LegendOptions.Position == 'Top') {
            relativeY = this.Dimensions.PlotWAxesALabels.Y - legendHeight - this.LegendOptions.Padding * 3;
        }
        else if (this.LegendOptions.Position == 'Bottom')
        {
            relativeY = this.LegendOptions.Padding * 3;
        }
        else {
            relativeY = 0;
        }

        let relativeX;
        if (this.LegendOptions.Position == 'Top' || this.LegendOptions.Position == 'Bottom') {
            relativeX = (this.Dimensions.Plot.Width - legendWidth) / 2;
        }
        else {
            relativeX = 0;
        }

        return 'translate(' + (actualX + relativeX) + ',' + (actualY + relativeY) + ')';
    } 
}