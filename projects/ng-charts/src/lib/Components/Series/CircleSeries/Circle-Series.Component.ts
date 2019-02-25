import { Component, Input, EventEmitter, KeyValueDiffers } from '@angular/core';

import { LineSeries, AreaSeries, ScatterSeries, ScatterPoint, Point } from '../Series.Classes'

@Component({
    selector: 'g[ngc-circle-series]',
    templateUrl: './Circle-Series.Component.html'
})
export class CircleSeries
{
    @Input() GivenSeries: LineSeries | AreaSeries;
    @Input() XScale: any;
    @Input() YScale: any;
    @Input() MouseOverChart: EventEmitter<Point>;

    // #region Differs
    SeriesDiffer: any;
    XScaleDiffer: any;
    YScaleDiffer: any;
    // #endregion

    Series: ScatterSeries;

    constructor(private _differs: KeyValueDiffers) { }

    ngOnInit()
    {
        this.SeriesDiffer = this._differs.find(this.Series).create();
        this.XScaleDiffer = this._differs.find(this.XScale).create();
        this.YScaleDiffer = this._differs.find(this.YScale).create();

        this.update();
        this.MouseOverChart.subscribe((event) => {
            let scatterSeries = new ScatterSeries();
            scatterSeries.Data = [];
            if (event != null) {
                let PositionDifference: number = Infinity;
                for (let point of this.GivenSeries.Data) {
                    let test = this.XScale(point.X);
                    if (this.XScale(point.X) <= event.X)    //When less than the mouse location, replace the first index with the lastest point.
                    {
                        PositionDifference = event.X - this.XScale(point.X);
                        let newScatterPoint: ScatterPoint = {
                            X: point.X,
                            Y: point.Y,
                            Radius: this.GivenSeries.Style.Thickness * 2
                        }
                        scatterSeries.Data[0] = newScatterPoint;
                    }
                    else {
                        if (this.XScale(point.X) - event.X < PositionDifference) //The next point is closer to the mouse than the last.
                        {
                            let newScatterPoint: ScatterPoint = {
                                X: point.X,
                                Y: point.Y,
                                Radius: this.GivenSeries.Style.Thickness * 2
                            }
                            scatterSeries.Data[0] = newScatterPoint;
                        }
                        break;  //Once we hit a point that is greater than the mouse location, we no longer need to continue.
                    }
                }
                scatterSeries.Style = {
                    Color: this.GivenSeries.Style.Color,
                    Thickness: this.GivenSeries.Style.Thickness,
                    Fill: this.GivenSeries.Style.Color,
                    Dash: 0
                };
            }
            this.Series = scatterSeries;
        });
    }

    ngDoCheck() {
        if (this._differs) {
            const changes = this.SeriesDiffer.diff(this.Series) || this.XScaleDiffer.diff(this.XScale) || this.YScaleDiffer.diff(this.YScale);
            if (changes) {
                this.update();
            }
        }
    }

    update() { }
}