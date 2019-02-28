import { Component, Input, ElementRef, TemplateRef, EventEmitter } from '@angular/core';
import { Polygon } from '../../../SVG/SVG.Classes';
import { TooltipParameters } from '../Tooltip.Class';
import { LineSeries, AreaSeries, ScatterSeries, ScatterPoint, Point } from '../../Series/Series.Classes'
import { TooltipProperties } from '../Tooltip.Classes';

@Component({
    selector: 'g[ngc-tooltip-circle]',
    templateUrl: './Tooltip-Circle.Component.html'
})
export class TooltipCircle {
    @Input() GivenSeries: LineSeries | AreaSeries;
    @Input() XScale: any;
    @Input() YScale: any;
    @Input() MouseOverChart: EventEmitter<any[]>;

    @Input() TooltipProperties: TooltipProperties;

    MouseLocation: TooltipParameters;
    ScatterPoint: any;

    ngOnInit() {
        //this.update();
        this.MouseOverChart.subscribe((event) => {
            this.FindClosestPoint(event);
        });
        
    }

    FindClosestPoint(MouseEvent: any)
    {
        if (!this.TooltipProperties.Show)
        {
            return null;
        }
        let mouseLocation: TooltipParameters = null;
        let scatterPoint: ScatterPoint = null;
        
        if (MouseEvent != null) {
            // #region Determine Chart Point
            if (MouseEvent[1] != null) {
                let PositionDifference: number = Infinity;
                for (let point of this.GivenSeries.Data) {
                    //let test = this.XScale(point.X);

                    if (this.XScale(point.X) >= MouseEvent[1].X)    //First point further than the mouse location.
                    {
                        if (this.XScale(point.X) - MouseEvent[1].X < PositionDifference) //The current point is closer to the mouse than the last.
                        {
                            scatterPoint = {
                                X: point.X,
                                Y: point.Y,
                                Radius: this.GivenSeries.Style.Thickness * 2,
                            }
                        }
                        break;
                    }

                    PositionDifference = MouseEvent[1].X - this.XScale(point.X);

                    scatterPoint = {
                        X: point.X,
                        Y: point.Y,
                        Radius: this.GivenSeries.Style.Thickness * 2,
                    }
                }
            }

            // #endregion
            // #region Determine location on page
            if (MouseEvent[0] != null) {
                mouseLocation = {
                    AbsoluteX: this.XScale(scatterPoint.X) + MouseEvent[0].X,
                    AbsoluteY: this.YScale(scatterPoint.Y) + MouseEvent[0].Y
                };
            }
            // #endregion
        }
        this.MouseLocation = mouseLocation;
        this.ScatterPoint = scatterPoint;
    }
}