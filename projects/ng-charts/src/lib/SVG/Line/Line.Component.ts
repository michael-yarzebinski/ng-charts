import { Component, Input } from '@angular/core';
import { Line } from '../SVG.Classes';


@Component({
    selector: 'g[ngc-line]',
    templateUrl: './Line.Component.html'
})
export class LineComponent
{
    @Input() Path: string;
    @Input() Style: Line;
}