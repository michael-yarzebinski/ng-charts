import { Component, Input } from '@angular/core';
import { SVGCircle } from '../SVG.Classes';

@Component({
    selector: 'g[ngc-circle]',
    templateUrl: './Circle.Component.html'
})
export class CircleComponent
{
    @Input() Style: SVGCircle;
    @Input() Radius: number;
    @Input() X: number;
    @Input() Y: number;

}