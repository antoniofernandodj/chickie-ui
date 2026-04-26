import { Pipe, PipeTransform } from '@angular/core';
import { formatPhone } from '../../core/utils/phone-utils';

@Pipe({ name: 'phone', standalone: true })
export class PhonePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    return formatPhone(value);
  }
}
