import { Component, Input } from '@angular/core';
import { Polygon } from '../SVG.Classes';


@Component({
    selector: 'g[ngc-area]',
    templateUrl: './Area.Component.html'
})
export class AreaComponent {
    @Input() Path: string;
    @Input() Style: Polygon;
}