import { Component, Input } from '@angular/core';
import { SVGPath } from '../SVG.Classes';


@Component({
    selector: 'g[ngc-line]',
    templateUrl: './Line.Component.html'
})
export class LineComponent
{
    @Input() Path: string;
    @Input() Style: SVGPath;
}