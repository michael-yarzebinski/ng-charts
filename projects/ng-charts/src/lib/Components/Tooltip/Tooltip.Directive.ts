import { Directive, OnDestroy, HostListener, Input, Inject, ViewContainerRef } from '@angular/core'
import { TooltipService } from './Tooltip.Service'
import { TooltipParameters } from './Tooltip.Class';
import { TooltipProperties } from './Tooltip.Classes';

@Directive({
    selector: '[ngc-tooltip]'
})
export class TooltipDirective implements OnDestroy
{
    @Input() TooltipProperties: TooltipProperties;
    @Input() Parameters: TooltipParameters;
    @Input() Data: any;

    private TooltipID: any;

    constructor(private tooltipService: TooltipService, private VCR: ViewContainerRef) { }

    @HostListener('mouseenter')
    onMouseEnter(): void {
        this.tooltipService.components.push({
            TooltipProperties: this.TooltipProperties,
            Parameters: this.Parameters,
            Data: this.Data
        });
        this.tooltipService.AddTooltipContainerToDOM();
    }

    @HostListener('mouseleave')
    onMouseLeave(): void {
        this.destroy();
    }

    ngOnDestroy(): void {
        this.destroy();
    }

    destroy(): void {
        this.tooltipService.components = [];
        this.tooltipService.RemoveTooltipContainerFromDOM();
    }



}
