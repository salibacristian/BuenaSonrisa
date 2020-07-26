import { Directive, OnInit, Input, ElementRef, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appDisabled]'
})
export class DisabledDirective implements OnInit {

  constructor(private el: ElementRef) { }

  @Input('appDisabled') disabled: Boolean;

  ngOnChanges(_changes: SimpleChanges): void {
    this.el.nativeElement.disabled = this.disabled;
  }

  ngOnInit(): void {
    this.el.nativeElement.disabled = this.disabled;
  }

}
