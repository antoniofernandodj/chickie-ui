import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appSlugMask]',
  standalone: true,
})
export class SlugMaskDirective {
  constructor(
    private el: ElementRef,
    private control: NgControl,
  ) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const slug = this.slugify(input.value);
    this.el.nativeElement.value = slug;
    this.control.control?.setValue(slug);
  }

  @HostListener('blur')
  onBlur(): void {
    const input = this.el.nativeElement as HTMLInputElement;
    input.value = this.slugify(input.value);
  }

  private slugify(value: string): string {
    return value
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^a-z0-9-]/g, '');
  }
}
