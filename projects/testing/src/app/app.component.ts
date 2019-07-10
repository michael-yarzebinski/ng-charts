import { Component, AfterViewInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { AreaSeries, LineSeries, ScatterSeries, BlockSeries } from '../../../ng-charts/src/lib/Components/Series/Series.Classes';
import { Line, Polygon } from 'projects/ng-charts/src/lib/SVG/SVG.Classes';
import { Axis } from '../../../ng-charts/src/lib/Components/Axis/Axis.Classes'
import { BuildDefaultAxis, BuildDefaultLegend, BuildDefaultSeries } from '../../../ng-charts/src/lib/BuildDefaults'
import { Point, ScatterPoint } from '../../../ng-charts/src/lib/Components/Series/Series.Classes';
import { LegendOptions } from 'projects/ng-charts/src/lib/Components/Legend/Legend.Classes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    
    LegendOptions: LegendOptions;
    BlockSeries: BlockSeries[];


    XAxis: Axis;
    YAxis: Axis;
    YAxes: Axis[] = [];


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
                Dash: 0
            }
        }

        this.XAxis = BuildDefaultAxis("X Axis", "Green", "Bottom", "Primary");
        this.XAxis.Position = "Left";
        this.XAxis.Labels.Rotate = true;
        this.YAxis = BuildDefaultAxis("Y Axis", "Blue", "Left", "Primary");
        this.YAxis.Position = "Top";
        this.YAxis.Labels.Format = function (Value: number) {
            let date = new Date(Value);
            return date.getMonth() + "/" + date.getDate() + "/ "+date.getFullYear()+" " + date.getHours() + ":" + date.getMinutes();
        }
        this.YAxis.Reverse = false;
        this.YAxes.push(this.YAxis);

        this.BlockSeries = [
            {
            Name: 'CDCM',
                Data: [
                    {
                        Start: new Date('June 17, 2019 13:33'),
                        End: new Date('June 17, 2019 16:00'),
                        Text: 'Full ASRS',
                        TextStyle: {
                            Color: 'black',
                            Fill: 'black',
                            FontSize: 14,
                            Dash: 0,
                            Thickness: 0.1
                        },
                        SeriesStyle: {
                            Name: 'Expected Delay',
                            Style: {
                                Color: 'Black',
                                Thickness: 2,
                                Fill: 'Red',
                                Dash: 0
                            }
                        }
                    },
                    {
                    Start: new Date('June 17, 2019 16:00'),
                    End: new Date('June 18, 2019 10:24'),
                    Text: '25-34',
                    TextStyle: {
                        Color: 'black',
                        Fill: 'black',
                        FontSize: 14,
                        Dash: 0,
                        Thickness:0.1
                    },
                    SeriesStyle: {
                        Name: '25-34',
                        Style: {
                            Color: 'Black',
                            Thickness: 2,
                            Fill: 'Orange',
                            Dash: 0
                        }
                    }
                },
                    {
                    Start: new Date('June 18, 2019 10:24'),
                    End: new Date('June 18, 2019 22:20'),
                    Text: '25-39',
                    TextStyle: {
                        Color: 'black',
                        Fill: 'black',
                        FontSize: 14,
                        Dash: 0,
                        Thickness:0.1
                    },
                    SeriesStyle: {
                        Name: '25-39',
                        Style: {
                            Color: 'Black',
                            Thickness: 2,
                            Fill: 'Turquoise',
                            Dash: 0
                        }
                    }
                },
                    {
                    Start: new Date('June 18, 2019 22:20'),
                    End: new Date('June 19, 2019 05:40'),
                    Text: '25-39',
                    TextStyle: {
                        Color: 'black',
                        Fill: 'black',
                        FontSize: 14,
                        Dash: 0,
                        Thickness: 0.1
                    },
                    SeriesStyle: {
                        Name: '25-39',
                        Style: {
                            Color: 'Black',
                            Thickness: 2,
                            Fill: 'green',
                            Dash: 0
                        }
                    }
                },
            ],
            YAxis: 'Top',
            Style: {
                Color: 'Black',
                Thickness: 0.1,
                Dash: 1,
                Fill : 'Black',
                FontSize : 15
            },
            Show: true,
            Tooltip: null,
            Type:'Block'


            },
            {
                Name: 'CAPL',
                Data: [
                    {
                        Start: new Date('June 17, 2019 13:51'),
                        End: new Date('June 17, 2019 18:25'),
                        Text: '24-36',
                        TextStyle: {
                            Color: 'black',
                            Fill: 'black',
                            FontSize: 14,
                            Dash: 0,
                            Thickness: 0.1
                        },
                        SeriesStyle: {
                            Name: '25-34',
                            Style: {
                                Color: 'Black',
                                Thickness: 2,
                                Fill: 'Yellow',
                                Dash: 0
                            }
                        }
                    },
                    {
                        Start: new Date('June 17, 2019 18:25'),
                        End: new Date('June 18, 2019 2:00'),
                        Text: '25-34',
                        TextStyle: {
                            Color: 'black',
                            Fill: 'black',
                            FontSize: 14,
                            Dash: 0,
                            Thickness: 0.1
                        },
                        SeriesStyle: {
                            Name: '25-34',
                            Style: {
                                Color: 'Black',
                                Thickness: 2,
                                Fill: 'Orange',
                                Dash: 0
                            }
                        }
                    },
                    {
                        Start: new Date('June 18, 2019 2:00'),
                        End: new Date('June 18, 2019 4:00'),
                        Text: 'No Steel',
                        TextStyle: {
                            Color: 'black',
                            Fill: 'black',
                            FontSize: 14,
                            Dash: 0,
                            Thickness: 0.1
                        },
                        SeriesStyle: {
                            Name: 'Expected Delay',
                            Style: {
                                Color: 'Black',
                                Thickness: 2,
                                Fill: 'Red',
                                Dash: 0
                            }
                        }
                    },
                    {
                        Start: new Date('June 18, 2019 4:00'),
                        End: new Date('June 18, 2019 12:00'),
                        Text: '25-34',
                        TextStyle: {
                            Color: 'black',
                            Fill: 'black',
                            FontSize: 14,
                            Dash: 0,
                            Thickness: 0.1
                        },
                        SeriesStyle: {
                            Name: '25-34',
                            Style: {
                                Color: 'Black',
                                Thickness: 2,
                                Fill: 'Orange',
                                Dash: 0
                            }
                        }
                    },
                    {
                        Start: new Date('June 18, 2019 12:00'),
                        End: new Date('June 19, 2019 05:20'),
                        Text: '25-39',
                        TextStyle: {
                            Color: 'black',
                            Fill: 'black',
                            FontSize: 14,
                            Dash: 0,
                            Thickness: 0.1
                        },
                        SeriesStyle: {
                            Name: '25-39',
                            Style: {
                                Color: 'Black',
                                Thickness: 2,
                                Fill: 'Turquoise',
                                Dash: 0
                            }
                        }
                    },
                    {
                        Start: new Date('June 19, 2019 05:20'),
                        End: new Date('June 19, 2019 8:40'),
                        Text: '25-39',
                        TextStyle: {
                            Color: 'black',
                            Fill: 'black',
                            FontSize: 14,
                            Dash: 0,
                            Thickness: 0.1
                        },
                        SeriesStyle: {
                            Name: '25-39',
                            Style: {
                                Color: 'Black',
                                Thickness: 2,
                                Fill: 'green',
                                Dash: 0
                            }
                        }
                    },
                ],
                YAxis: 'Top',
                Style: {
                    Color: 'Black',
                    Thickness: 0.1,
                    Dash: 1,
                    Fill: 'Black',
                    FontSize: 15
                },
                Show: true,
                Tooltip: null,
                Type: 'Block'


            }

        ]


    }


}
