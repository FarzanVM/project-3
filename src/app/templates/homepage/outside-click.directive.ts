import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appOutsideClick]'
})
export class OutsideClickDirective {
  @Output()
  OutsideClick = new EventEmitter();

  constructor(private elementRef: ElementRef) { }
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    
    if (!clickedInside) {
      this.OutsideClick.emit(true);
    } 
    else {
      this.OutsideClick.emit(false);
    }
  }

}
