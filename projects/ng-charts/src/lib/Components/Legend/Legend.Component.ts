import { Component, Input, AfterViewInit } from '@angular/core';
import { AreaSeries, LineSeries, ScatterSeries } from '../Series/Series.Classes';
import { LegendOptions } from './Legend.Classes';
import { Dimensions } from '../../AdditionalClasses/AdditionalClasses';

@Component({
    selector: 'g[ngc-legend]',
    templateUrl: './Legend.Component.html'
})
export class LegendComponent
{
    HideText: boolean = true;
    @Input() Dimensions: Dimensions
    @Input() Series: (AreaSeries | LineSeries | ScatterSeries)[];
    @Input() LegendOptions: LegendOptions;

    Transform: string;

    SeriesPosition: any[];

    ngOnInit()
    {
        this.SeriesPosition = new Array(this.Series.length);
        this.SeriesPosition.fill(0);
        this.update();
    }

    ngAfterViewInit()
    {
        setTimeout(() => {
            this.DetermineSeriesTransform();
            setTimeout(() => {
                this.DetermineLegendTransform();
            }, 10);        
        }, 10);
    }

    update()
    {
        //console.log(this.Series);
        //this.Transform = this.DetermineTransform();
    }

    DetermineLegendTransform(): void
    {
        let svg: any = document.getElementById('NGCLegend');
        if (svg != null)
        {
            let legendSizing = svg.getBoundingClientRect();
            
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
                relativeY = this.Dimensions.PlotWAxesALabels.Y - legendSizing.height;
            }
            else if (this.LegendOptions.Position == 'Bottom') {
                relativeY = 0;
            }
            else {
                relativeY = 0;
            }

            let relativeX;
            if (this.LegendOptions.Position == 'Top' || this.LegendOptions.Position == 'Bottom') {
                relativeX = (this.Dimensions.Plot.Width - legendSizing.width) / 2;
            }
            else {
                relativeX = 0;
            }

            this.Transform = 'translate(' + (actualX + relativeX) + ',' + (actualY + relativeY) + ')';

            this.HideText = false;
        }

    }

    DetermineSeriesTransform()
    {
        if (this.LegendOptions.Orientation == 'Horizontal') {
            let totalWidth = 0;
            let i = 0;
            for (; i < this.Series.length; i++) {
                let svg: any = document.getElementById('NGCLegendSeries' + i);
                if (svg != null) {
                    this.Series[i].LegendTransform = 'translate(' + totalWidth + ',0)';
                    totalWidth += svg.getBBox().width + this.LegendOptions.Style.FontSize / 4;
                }
                else {
                    break;
                }
            }
            if (i == this.Series.length) {
                this.HideText = false;
                console.log(this.Series);
            }
        }
        else {
            for (let i = 0; i < this.Series.length; i++) {
                this.Series[i].LegendTransform = 'translate(0,' + 1.5 * this.LegendOptions.Style.FontSize * i + ')';
            }
        }
    }
}