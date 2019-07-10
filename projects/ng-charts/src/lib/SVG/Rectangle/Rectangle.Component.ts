import { Component, Input } from '@angular/core';
import { Polygon } from '../SVG.Classes';


@Component({
    selector: 'g[ngc-rectangle]',
    templateUrl: './Rectangle.Component.html'
})
export class RectangleComponent {
    @Input() Width: number;
    @Input() Height: number;
    @Input() X: number;
    @Input() Y: number;
    @Input() Style: Polygon;
}