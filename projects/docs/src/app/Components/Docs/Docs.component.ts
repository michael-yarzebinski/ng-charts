import { Component, HostListener } from '@angular/core';


@Component({
    selector: 'ngc-docs',
    templateUrl: './Docs.component.html'
})
export class Docs
{
    GoSticky: boolean;

    @HostListener("window:scroll", [])
    onWindowScroll()
    {
        console.log(window.scrollY);
        if (window.scrollY > 240) {
            this.GoSticky = true;
        }
        else
        {
            this.GoSticky = false;
        }
    }

    scrollTo(section) {
        document.querySelector('#' + section)
            .scrollIntoView();
    }


}