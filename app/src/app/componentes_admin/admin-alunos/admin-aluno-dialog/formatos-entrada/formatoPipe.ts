import { Pipe, PipeTransform, ViewEncapsulation } from '@angular/core';

@Pipe({
  name: 'formato'
})
export class FormatoPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return value;
  }
}
