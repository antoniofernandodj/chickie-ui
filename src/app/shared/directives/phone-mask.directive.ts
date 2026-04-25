import { Directive, HostListener, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

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
      const formatted = this.formatPhone(this.control.control.value);
      this.el.nativeElement.value = formatted;
    }

    // Listen to programmatic value changes
    this.subscription = this.control.control?.valueChanges.subscribe((value) => {
      if (value && typeof value === 'string') {
        const formatted = this.formatPhone(value);
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
    const formatted = this.formatPhone(digits);
    
    // Update view value
    this.el.nativeElement.value = formatted;
    
    // Update form control with numeric-only value (emitEvent: false to avoid valueChanges loop)
    this.control.control?.setValue(digits, { emitEvent: false });
  }

  @HostListener('blur')
  onBlur(): void {
    const input = this.el.nativeElement as HTMLInputElement;
    const digits = input.value.replace(/\D/g, '').slice(0, 11);
    const formatted = this.formatPhone(digits);
    input.value = formatted;
  }

  private formatPhone(digits: string): string {
    if (!digits) return '';

    // Format: (DD) D DDDD-DDDD
    if (digits.length <= 2) {
      return `(${digits}`;
    } else if (digits.length === 3) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else if (digits.length <= 7) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 3)} ${digits.slice(3)}`;
    } else {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 3)} ${digits.slice(3, 7)}-${digits.slice(7)}`;
    }
  }
}
