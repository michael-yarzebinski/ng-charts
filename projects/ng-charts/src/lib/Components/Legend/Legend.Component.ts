import { Component, Input, AfterViewInit, KeyValueDiffers, ViewChild, ViewChildren, TemplateRef, ElementRef, QueryList } from '@angular/core';
import { Line, Polygon } from '../../SVG/SVG.Classes';
import { AreaSeries, LineSeries, ScatterSeries, BarSeries, BlockSeries } from '../Series/Series.Classes';
import { LegendOptions } from './Legend.Classes';
import { Dimensions } from '../../AdditionalClasses/AdditionalClasses';
import { Template } from '@angular/compiler/src/render3/r3_ast';

@Component({
    selector: 'g[ngc-legend]',
    templateUrl: './Legend.Component.html'
})
export class LegendComponent
{
    HideText: boolean = true;
    @Input() Dimensions: Dimensions
    @Input() InputSeries: (AreaSeries | LineSeries | ScatterSeries | BarSeries | BlockSeries)[];
    @Input() LegendOptions: LegendOptions;

    Series: LegendSeries[] = [];
    Transform: string;

    SeriesPosition: any[];

    @ViewChild('NGCLegend') NGCLegend : any;
    @ViewChildren('NGCLegendSeries') SVGElements: QueryList<ElementRef>;


    // #region Differs
    DimensionsDiffer: any;
    SeriesDiffer: any;
    LegendOptionsDiffer: any;
    // #endregion



    constructor(private _differs: KeyValueDiffers) { }

    ngOnInit()
    {
        this.DimensionsDiffer = this._differs.find(this.Dimensions).create();
        this.SeriesDiffer = this._differs.find(this.Series).create();
        this.LegendOptionsDiffer = this._differs.find(this.LegendOptions).create();

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

    ngDoCheck()
    {
        if (this._differs)
        {
            const changes = this.DimensionsDiffer.diff(this.Dimensions) || this.SeriesDiffer.diff(this.Series) || this.LegendOptionsDiffer.diff(this.LegendOptions);
            if (changes) {
                this.update();
            }
        }
    }


    update()
    {
        this.DetermineLegendSeries();
        this.DetermineLegendTransform();
        this.DetermineSeriesTransform();
    }

    DetermineLegendSeries(): void
    {
        this.Series = [];
        for (let series of this.InputSeries)
        {
            if (series.Type == 'Line') {
                let newSeries: LegendSeries =
                {
                    Name: series.Name,
                    Type: 'Line',
                    LegendTransform: '',
                    Style: series.Style
                };
                this.Series.push(newSeries);
            }
            else if (series.Type == 'Area') {
                let newSeries: LegendSeries =
                {
                    Name: series.Name,
                    Type: 'Square',
                    LegendTransform: '',
                    Style: series.Style
                };
                this.Series.push(newSeries);
            }
            else if (series.Type == 'Scatter') {
                let newSeries: LegendSeries =
                {
                    Name: series.Name,
                    Type: 'Circle',
                    LegendTransform: '',
                    Style: series.Style
                };
                this.Series.push(newSeries);
            }
            else if (series.Type == 'Bar')
            {
                for (let bar of series.Data)
                {
                    if (this.Series.findIndex((val) => val.Name == bar.SeriesStyle.Name) == -1)
                    {
                        let newSeries: LegendSeries =
                        {
                            Name: bar.SeriesStyle.Name,
                            Type: 'Square',
                            LegendTransform: '',
                            Style: bar.SeriesStyle.Style
                        };
                        this.Series.push(newSeries);
                    }
                }
            }
            else if (series.Type == 'Block') {
                for (let block of series.Data) {
                    if (this.Series.findIndex((val) => val.Name == block.SeriesStyle.Name) == -1) {
                        let newSeries: LegendSeries =
                        {
                            Name: block.SeriesStyle.Name,
                            Type: 'Square',
                            LegendTransform: '',
                            Style: block.SeriesStyle.Style
                        };
                        this.Series.push(newSeries);
                    }
                }
            }
        }
    }

    DetermineLegendTransform(): void
    {
        if (this.NGCLegend && this.NGCLegend.nativeElement)
        {
            let svg = this.NGCLegend.nativeElement;
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
        if (this.SVGElements && this.SVGElements.length > 0) {
            if (this.LegendOptions.Orientation == 'Horizontal') {
                let totalWidth = 0;
                let i = 0;
                for (; i < this.Series.length; i++) {
                    let svg: any = this.SVGElements.find((element) => {
                        if (element.nativeElement.id.indexOf(i) > -1) {
                            return true;
                        }
                        return false;
                    }).nativeElement;
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
                }
            }
            else {
                for (let i = 0; i < this.Series.length; i++) {
                    this.Series[i].LegendTransform = 'translate(0,' + 1.5 * this.LegendOptions.Style.FontSize * i + ')';
                }
            }
        }
    }
}

interface LegendSeries
{
    Name: string;
    Type: 'Line' | 'Square' | 'Circle';
    LegendTransform: string;
    Style: Line | Polygon; 
}