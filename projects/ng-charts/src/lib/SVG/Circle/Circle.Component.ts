import { Component, Input, ElementRef, TemplateRef } from '@angular/core';
import { Polygon } from '../SVG.Classes';

@Component({
    selector: 'g[ngc-circle]',
    templateUrl: './Circle.Component.html'
})
export class CircleComponent
{
    @Input() Style: Polygon;
    @Input() Radius: number;
    @Input() X: number;
    @Input() Y: number;

    ngOnInit()
    {
        this.update();
    }

    update()
    {
    }

}