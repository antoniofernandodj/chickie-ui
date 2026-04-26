import { Directive, HostListener, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { formatPhone } from '../../core/utils/phone-utils';

@Directive({
  selector: '[appPhoneMask]',
  standalone: true,
})
export class PhoneMaskDirective implements OnInit, OnDestroy {
  private subscription?: Subscription;

  constructor(
    private el: ElementRef,
    private control: NgControl,
  ) {}

  ngOnInit(): void {
    // Format initial value if present
    if (this.control.control?.value) {
      const formatted = formatPhone(this.control.control.value);
      this.el.nativeElement.value = formatted;
    }

    // Listen to programmatic value changes
    this.subscription = this.control.control?.valueChanges.subscribe((value) => {
      if (value && typeof value === 'string') {
        const formatted = formatPhone(value);
        if (formatted !== this.el.nativeElement.value) {
          this.el.nativeElement.value = formatted;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const digits = input.value.replace(/\D/g, '').slice(0, 11);
    const formatted = formatPhone(digits);
    
    // Update view value
    input.value = formatted;
    
    // Update form control with numeric-only value
    this.control.control?.setValue(digits, { 
      emitEvent: false,
      emitModelToViewChange: false,
      emitViewToModelChange: true
    });
  }
}
