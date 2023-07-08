import { Pipe, PipeTransform, ViewEncapsulation } from '@angular/core';

@Pipe({
  name: 'formato'
})
export class FormatoPipe implements PipeTransform {
  transform(value: string, formato: string): string {
    if (value && formato) {
      let formattedValue = '';
      let index = 0;

      for (let i = 0; i < formato.length; i++) {
        const char = formato[i];
        if (char === '9' && index < value.length) {
          formattedValue += value[index];
          index++;
        } else {
          formattedValue += char;
        }
      }

      return formattedValue;
    } else {
      return value;
    }
  }
}
