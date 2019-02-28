import { Component, Input, TemplateRef, ElementRef, ViewChild, AfterViewInit, QueryList } from '@angular/core';
import { TooltipParameters } from '../Tooltip.Class';
import { TooltipProperties } from '../Tooltip.Classes';

@Component({
    selector: 'ngc-tooltip',
    templateUrl: './Tooltip.Component.html',
    styleUrls : ['./Tooltip.Component.css']
}) export class TooltipComponent
{
    HideElement: boolean = true;
    @Input() TooltipProperties: TooltipProperties;
    @Input() InputParameters: TooltipParameters
    @Input() Data: any;
    Position: 'Top' | 'Bottom' | 'Left' | 'Right'

    Parameters: TooltipParameters = new TooltipParameters();

    @ViewChild('ngcTooltip') tooltip: ElementRef

    ngAfterViewInit()
    {
        setTimeout(() => {
            this.SetTooltipPosition();
        }, 10);
    }

    SetTooltipPosition()
    {
        this.Parameters = new TooltipParameters(this.InputParameters);

        let itemWidth = this.tooltip.nativeElement.offsetWidth;
        let itemHeight = this.tooltip.nativeElement.offsetHeight;
        //debugger;
        this.Position =  (this.TooltipProperties.Position != null ? this.TooltipProperties.Position : this.DeterminePosition(itemWidth, itemHeight));   //Allows the user to set position.
        if (this.Position == 'Top' || this.Position == 'Bottom') {
            this.Parameters.AbsoluteX -= itemWidth / 2;
            if (this.Position == 'Top') {
                this.Parameters.AbsoluteY -= itemHeight + 20;
            }
            else {
                this.Parameters.AbsoluteY += 20;
            }
        }
        else if (this.Position == 'Left' || this.Position == 'Right') {
            this.Parameters.AbsoluteY -= itemHeight / 2;
            if (this.Position == 'Left') {
                this.Parameters.AbsoluteX -= itemWidth + 20;
            }
            else {
                this.Parameters.AbsoluteX +=  20;
            }
        }
        this.HideElement = false;
    }



    DeterminePosition(Width: number, Height: number): 'Top' | 'Bottom' | 'Left' | 'Right'
    {
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;

        if (this.Parameters.AbsoluteY - Height > windowHeight * 0.05) //If the element is not within 5% of the top of the screen.
        {
            return 'Top';
        }
        else if (this.Parameters.AbsoluteX + Width < windowWidth * 0.95) {
            return 'Right';
        }
        else if (this.Parameters.AbsoluteX - Width > windowWidth * 0.05) {
            return 'Left';
        }
        else if (this.Parameters.AbsoluteY + Height < windowHeight * 0.95) {
            return 'Bottom';
        }
        
        return 'Top';
    }

}