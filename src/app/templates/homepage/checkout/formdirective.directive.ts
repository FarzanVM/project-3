import { Directive, ElementRef, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[appFormdirective]'
})
export class FormdirectiveDirective {

  constructor(private el:ElementRef) { }
  // when invalid form is submitted either empty or  invalid every invalid input turns reds
  @HostListener('submit')
      onFormSubmit(){
        const invalidControl = this.el.nativeElement.querySelectorAll('.ng-invalid')

        for(let control of invalidControl){
          if (control) {
            control.focus();
            control.blur();
          }
        }
      }
}
