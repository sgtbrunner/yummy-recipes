import { Directive, HostListener, HostBinding, ElementRef } from "@angular/core";

@Directive({
  selector: "[appDropdown]",
})
export class DropdownDirective {
  constructor(private element: ElementRef) {}
  @HostBinding('class.open') isOpen: boolean = false;

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.element.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
}
