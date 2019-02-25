import { Polygon } from '../../SVG/SVG.Classes';
import { TemplateRef, ElementRef } from '@angular/core';

export interface TooltipProperties {
    Template: TemplateRef<ElementRef>;
    Show: boolean;
    Style: Polygon;
    CustomClass: string;
    Position: 'Top' | 'Left' | 'Right' | 'Bottom'
}