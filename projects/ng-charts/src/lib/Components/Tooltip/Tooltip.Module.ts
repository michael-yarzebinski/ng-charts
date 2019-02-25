import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';

import { TooltipContainerComponent } from './Container/Tooltip-Container.Component';
import { TooltipComponent } from './Component/Tooltip.Component';
import { TooltipDirective } from './Tooltip.Directive'
import { TooltipService } from './Tooltip.Service'
import { TooltipCircle } from './Circles/Tooltip-Circle.Component'

@NgModule({
    declarations: [TooltipComponent, TooltipContainerComponent, TooltipDirective, TooltipCircle],
    imports: [CommonModule],
    providers: [TooltipService],
    exports: [TooltipComponent, TooltipContainerComponent, TooltipDirective, TooltipCircle],
    entryComponents: [TooltipContainerComponent]
})
export class TooltipModule { }