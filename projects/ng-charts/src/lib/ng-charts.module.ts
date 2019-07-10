import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'

import { BaseChartComponent } from './Components/Base/Base.Component'
import { LineChart } from './Charts/Line/Line-Chart.Component';
//import { XAxisComponent } from './Components/Axes/XAxis/XAxis.Component'
//import { XAxisTicksComponent } from './Components/Axes/XAxis/XAxis-Ticks.Component';
//import { YAxisComponent } from './Components/Axes/YAxis/YAxis.Component';
//import { YAxisTicksComponent } from './Components/Axes/YAxis/YAxis-Ticks.Component';
import { LineSeries } from './Components/Series/LineSeries/Line-Series.Component'
import { LineComponent } from './SVG/Line/Line.Component'
import { CircleSeries } from './Components/Series/CircleSeries/Circle-Series.Component';
import { BlockSeries } from './Components/Series/BlockSeries/Block-Series.Component';
import { RectangleComponent } from './SVG/Rectangle/Rectangle.Component'

import { ScatterChart } from './Charts/Scatter/Scatter-Chart.Component';
import { ScatterSeries } from './Components/Series/ScatterSeries/Scatter-Series.Component'
import { CircleComponent } from './SVG/Circle/Circle.Component'

import { AreaChart } from './Charts/Area/Area-Chart.Component';
import { AreaSeries } from './Components/Series/AreaSeries/Area-Series.Component';
import { AreaComponent } from './SVG/Area/Area.Component'

import { LegendComponent } from './Components/Legend/Legend.Component';

import { AreaLineScatterChart } from './Charts/Area-Line-Scatter/Area-Line-Scatter.Component'


import { TooltipModule } from './Components/Tooltip/Tooltip.Module';

import { AxisComponent } from './Components/Axis/Axis.Component'
import { AxisTicksComponent } from './Components/Axis/Ticks/Axis-Ticks.Component'

import { BlockChart } from './Charts/Block/Block-Chart.Component'


@NgModule({
    declarations: [BaseChartComponent, LineChart, LineSeries, LineComponent, ScatterChart, ScatterSeries, CircleComponent, AreaChart, AreaSeries, AreaComponent, LegendComponent, AreaLineScatterChart, CircleSeries   //XAxisComponent, XAxisTicksComponent, YAxisComponent, YAxisTicksComponent,
        , AxisComponent,
        AxisTicksComponent,
        BlockSeries,
        RectangleComponent,
        BlockChart
    ],
    imports: [CommonModule, TooltipModule
    ],
    providers: [],
    exports: [BaseChartComponent, LineChart, LineSeries, LineComponent, ScatterChart, ScatterSeries, CircleComponent, AreaChart, AreaSeries, AreaComponent, LegendComponent, AreaLineScatterChart,
        BlockChart],
    entryComponents: []
})
export class NgChartsModule { }
