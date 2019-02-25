import {Injectable, Injector, ComponentFactoryResolver, EmbeddedViewRef, ApplicationRef } from '@angular/core';
import { TooltipContainerComponent } from './Container/Tooltip-Container.Component';


@Injectable()
export class TooltipService {
    TooltipContainer: any;


    components: any[] = [];

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private appRef: ApplicationRef, private injector: Injector) {   }

    AddTooltipContainerToDOM() {
        // 1. Create a component reference from the component 
        this.TooltipContainer = this.componentFactoryResolver
            .resolveComponentFactory(TooltipContainerComponent)
            .create(this.injector);

        // 2. Attach component to the appRef so that it's inside the ng component tree
        this.appRef.attachView(this.TooltipContainer.hostView);

        // 3. Get DOM element from component
        const domElem = (this.TooltipContainer.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;

        // 4. Append DOM element to the body
        document.body.appendChild(domElem);

        // 5. Wait some time and remove it from the component tree and from the DOM
        //setTimeout(() => {
        //    this.appRef.detachView(this.TooltipContainer.hostView);
        //    this.TooltipContainer.destroy();
        //}, 3000);
    }

    RemoveTooltipContainerFromDOM()
    {
        if (this.TooltipContainer) {
            this.appRef.detachView(this.TooltipContainer.hostView);
            this.TooltipContainer.destroy();
        }
    }

}