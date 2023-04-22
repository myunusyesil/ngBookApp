import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textlimit',
})
export class TextlimitPipe implements PipeTransform {
  truncatedValue: string = 'null';
  transform(value: string, ...args: unknown[]): unknown {
    if (!!value) {
      this.truncatedValue = value.substring(0, 100) + '...';
      return this.truncatedValue;
    }
    return;
  }
}
