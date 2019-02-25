import { Component, AfterViewInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { AreaSeries, LineSeries, ScatterSeries } from 'projects/ng-charts/src/lib/Components/Series/Series.Classes';
import { Line, Polygon } from 'projects/ng-charts/src/lib/SVG/SVG.Classes';
import { Axis } from '../../../ng-charts/src/lib/Components/Axes/Axes.Classes'
import { BuildDefaultAxis, BuildDefaultLegend, BuildDefaultSeries } from '../../../ng-charts/src/lib/BuildDefaults'
import { LegendOptions } from 'projects/ng-charts/src/lib/Components/Legend/Legend.Classes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    ShowPlot = false;

    LineSeriesDatesSeries: LineSeries[] = [];
    LineSeriesDatesX: Axis;
    LineSeriesDatesY: Axis[] = [];
    LegendOptions: LegendOptions;

    XAxis: Axis;

    @ViewChild('TooltipTemplate') TTTemplate: TemplateRef<ElementRef>;

    ngOnInit()
    {
        this.LegendOptions = {

            Orientation: 'Horizontal',
            Position: 'Top',
            Space: 25,
            Style: {
                FontSize: 12,
                Color: 'Black',
                Thickness: 0.01,
                Fill: 'black',
                Dash : 0
            }
        }

        // #region Line Series Data Plot
        let LSD1 = new LineSeries();
        LSD1.Name = "Line Series 1";
        LSD1.Show = true;
        LSD1.Style = {
            Color: 'darkgrey',
            Thickness: 3,
            Dash: 0
        };
        LSD1.YAxis = 'Left'; 
        LSD1.Data = [
            {
                X: 1.5,
                Y:10
            },
            {
                X: 3,
                Y: 20
            },
            {
                X: 3.5,
                Y: 30
            },
            {
                X: 5,
                Y: 40
            },
            {
                X: 6,
                Y: 50
            },
            {
                X: 7,
                Y: 60
            },
            {
                X: 8,
                Y: 70
            }
        ]
        LSD1.Tooltip = {
            Show: true,
            CustomClass: 'custom-class',
            Style: {
                Color: 'darkgrey',
                Thickness: 2,
                Dash: 0,
                Fill: 'darkgrey'
            },
            Template: null,
            Position: null
        };
        this.LineSeriesDatesSeries.push(LSD1);
        let LSD2 = new LineSeries();
        LSD2.Name = "Line Series 2";
        LSD2.Show = true;
        LSD2.Style = {
            Color: 'darkblue',
            Thickness: 3,
            Dash: 0
        };
        LSD2.YAxis = 'Right';
        LSD2.Data = [
            {
                X: 1,
                Y: 700
            },
            {
                X: 2,
                Y: 600
            },
            {
                X: 2.5,
                Y: 500
            },
            {
                X: 3,
                Y: 400
            },
            {
                X: 4,
                Y: 50
            },
            {
                X: 5,
                Y: 300
            },
            {
                X: 6,
                Y: 200
            }
        ]
        LSD2.Tooltip = {
            Show: true,
            CustomClass: 'custom-class',
            Style: {
                Color: 'darkblue',
                Thickness: 2,
                Dash: 0,
                Fill: 'darkblue'
            },
            Template: null,
            Position: null
        };
        this.LineSeriesDatesSeries.push(LSD2);
        this.XAxis = BuildDefaultAxis("X Axis", "Black", "Bottom", 'Primary');
        let LSDY1 = BuildDefaultAxis("Y Axis Left", "Black", "Left", 'Primary');
        let LSDY2 = BuildDefaultAxis("Y Axis Right", "Black", "Right", 'Secondary');
        LSDY2.GridLines.Show = false;
        this.LineSeriesDatesY.push(LSDY1);
        this.LineSeriesDatesY.push(LSDY2);
        // #endregion
        this.ShowPlot = true;
    }

    ngAfterViewInit()
    {
        this.LineSeriesDatesSeries[0].Tooltip.Template = this.TTTemplate;
        this.LineSeriesDatesSeries[1].Tooltip.Template = this.TTTemplate;
    }
}
