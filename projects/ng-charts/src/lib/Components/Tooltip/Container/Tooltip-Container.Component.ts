import { Component } from '@angular/core';
import { TooltipService } from '../Tooltip.Service'

@Component({
    selector: 'ngc-tooltip-container',
    templateUrl: './Tooltip-Container.Component.html'
})
export class TooltipContainerComponent
{
    constructor(public tooltipService: TooltipService) {
    }

}