export class TooltipParameters
{
    constructor(TooltipParameters?: TooltipParameters)
    {
        if (TooltipParameters)
        {
            this.AbsoluteX = TooltipParameters.AbsoluteX;
            this.AbsoluteY = TooltipParameters.AbsoluteY;
        }
    }
    AbsoluteX: number;
    AbsoluteY: number;
}