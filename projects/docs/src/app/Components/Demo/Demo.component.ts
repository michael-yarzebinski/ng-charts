import { Component, AfterViewInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { AreaSeries, LineSeries, ScatterSeries } from 'projects/ng-charts/src/lib/Components/Series/Series.Classes';
import { Line, Polygon } from 'projects/ng-charts/src/lib/SVG/SVG.Classes';
import { Axis } from '../../../../../ng-charts/src/lib/Components/Axis/Axis.Classes'
import { BuildDefaultAxis, BuildDefaultLegend, BuildDefaultSeries } from '../../../../../ng-charts/src/lib/BuildDefaults'
import { Point, ScatterPoint } from '../../../../../ng-charts/src/lib/Components/Series/Series.Classes';
import { LegendOptions } from 'projects/ng-charts/src/lib/Components/Legend/Legend.Classes';

@Component({
    selector: 'demo',
    templateUrl: './Demo.component.html',
})
export class DemoComponent {
    ShowPlot = false;

    LineSeriesDatesSeries: LineSeries[] = [];
    LineSeriesDatesX: Axis;
    LineSeriesDatesY: Axis[] = [];
    LegendOptions: LegendOptions;

    AreaSeries: AreaSeries[] = [];
    LineSeries: LineSeries[] = [];
    ScatterSeries: ScatterSeries[] = [];
    XAxis: Axis;
    YAxes: Axis[] = [];

    @ViewChild('ASTooltipTemplate') AreaSeriesTooltipTemplate: TemplateRef<ElementRef>;
    @ViewChild('LSTooltipTemplate') LineSeriesTooltipTemplate: TemplateRef<ElementRef>;
    @ViewChild('SSTooltipTemplate') ScatterSeriesTooltipTemplate: TemplateRef<ElementRef>;

    ngOnInit() {
        this.LegendOptions = {

            Orientation: 'Horizontal',
            Position: 'Top',
            Space: 25,
            Style: {
                FontSize: 12,
                Color: 'Black',
                Thickness: 0.01,
                Fill: 'black',
                Dash: 0
            }
        }

        // #region Line Series Data Plot
        //let LSD1 = new LineSeries();
        //LSD1.Name = "Really Really Long Series Title Name Series 1";
        //LSD1.Show = true;
        //LSD1.Style = {
        //    Color: 'darkgrey',
        //    Thickness: 3,
        //    Dash: 0
        //};
        //LSD1.YAxis = 'Right'; 
        //LSD1.Data = [
        //    {
        //        X: 1.5,
        //        Y:10
        //    },
        //    {
        //        X: 3,
        //        Y: 20
        //    },
        //    {
        //        X: 3.5,
        //        Y: 30
        //    },
        //    {
        //        X: 5,
        //        Y: 40
        //    },
        //    {
        //        X: 6,
        //        Y: 50
        //    },
        //    {
        //        X: 7,
        //        Y: 60
        //    },
        //    {
        //        X: 8,
        //        Y: 70
        //    }
        //]
        //LSD1.Tooltip = {
        //    Show: true,
        //    CustomClass: 'custom-class',
        //    Style: {
        //        Color: 'darkgrey',
        //        Thickness: 2,
        //        Dash: 0,
        //        Fill: 'darkgrey'
        //    },
        //    Template: null,
        //    Position: null
        //};
        //this.LineSeriesDatesSeries.push(LSD1);
        //let LSD2 = new LineSeries();
        //LSD2.Name = "Line Series 2";
        //LSD2.Show = true;
        //LSD2.Style = {
        //    Color: 'darkblue',
        //    Thickness: 3,
        //    Dash: 0
        //};
        //LSD2.YAxis = 'Left';
        //LSD2.Data = [
        //    {
        //        X: 1,
        //        Y: 7000
        //    },
        //    {
        //        X: 2,
        //        Y: 6000
        //    },
        //    {
        //        X: 2.5,
        //        Y: 5000
        //    },
        //    {
        //        X: 3,
        //        Y: 4000
        //    },
        //    {
        //        X: 4,
        //        Y: 500
        //    },
        //    {
        //        X: 5,
        //        Y: 3000
        //    },
        //    {
        //        X: 6,
        //        Y: 2000
        //    }
        //]
        //LSD2.Tooltip = {
        //    Show: true,
        //    CustomClass: 'custom-class',
        //    Style: {
        //        Color: 'darkblue',
        //        Thickness: 2,
        //        Dash: 0,
        //        Fill: 'darkblue'
        //    },
        //    Template: null,
        //    Position: null
        //};
        //this.LineSeriesDatesSeries.push(LSD2);
        //this.XAxis = BuildDefaultAxis("X Axis", "Black", "Bottom", 'Primary');
        //let LSDY1 = BuildDefaultAxis("Y Axis Left", "Black", "Left", 'Primary');
        //LSDY1.Labels.Space = 40;
        //let LSDY2 = BuildDefaultAxis("Y Axis Right", "Black", "Right", 'Secondary');
        //LSDY2.GridLines.Show = false;
        //this.LineSeriesDatesY.push(LSDY1);
        //this.LineSeriesDatesY.push(LSDY2);
        // #endregion
        // #region Area Series Data
        let AS1D: Point[] = [
            //{
            //    X: 1,
            //    Y: 1
            //},
            {
                X: 2,
                Y: 2
            },
            {
                X: 3,
                Y: 2
            },
            {
                X: 4,
                Y: 2
            },
            {
                X: 5,
                Y: 4
            },
            {
                X: 6,
                Y: 7
            },
            {
                X: 7,
                Y: 7
            },
            {
                X: 8,
                Y: 7
            },
            {
                X: 9,
                Y: 8
            },
            {
                X: 10,
                Y: 9
            },
        ]
        let AS1: any = BuildDefaultSeries("Expected Production", AS1D, "Left", "Area", "Red");
        this.AreaSeries.push(AS1);
        let LS1D: Point[] = [
            {
                X: 1,
                Y: 1
            },
            {
                X: 2,
                Y: 3
            },
            {
                X: 3,
                Y: 3
            },
            {
                X: 4,
                Y: 3
            },
            {
                X: 5,
                Y: 3
            },
            {
                X: 6,
                Y: 5
            },
            {
                X: 7,
                Y: 5
            },
            {
                X: 8,
                Y: 5
            },
            {
                X: 9,
                Y: 7.5
            },
            {
                X: 10,
                Y: 10
            },

        ]
        let LS1: any = BuildDefaultSeries("Actual Production", LS1D, "Left", "Line", "Green");
        this.LineSeries.push(LS1);
        let SS1D: ExtendedPoint[] = [
            {
                X: 2,
                Y: 48,
                Radius: 3,
                Info: "Scheduled Maintenance"
            },
            {
                X: 4,
                Y: 24,
                Radius: 3,
                Info: "Did not start up on time after scheduled maintenance."
            },
            {
                X: 6,
                Y: 24,
                Radius: 3,
                Info: "Open turns"
            }
        ]
        let SS1: any = BuildDefaultSeries("Delays", SS1D, "Right", "Scatter", "Blue");
        SS1.Style.Thickness = 3;
        this.ScatterSeries.push(SS1);

        let YAxis1 = BuildDefaultAxis("Tons", "Black", "Left", "Primary");
        this.YAxes.push(YAxis1);
        let Y2Axis = BuildDefaultAxis("Hours", "Blue", "Right", "Secondary");
        Y2Axis.Min = 20;
        Y2Axis.Max = 50;
        this.YAxes.push(Y2Axis);

        this.XAxis = BuildDefaultAxis("Day of Month", "Black", "Bottom", "Primary");

        // #endregion

        this.ShowPlot = true;
    }

    ngAfterViewInit() {
        this.AreaSeries[0].Tooltip.Template = this.AreaSeriesTooltipTemplate;
        this.LineSeries[0].Tooltip.Template = this.LineSeriesTooltipTemplate;
        this.ScatterSeries[0].Tooltip.Template = this.ScatterSeriesTooltipTemplate;
    }
}

interface ExtendedPoint extends ScatterPoint {
    X: any;
    Y: any;
    Radius: any;
    Info: string;
}