import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shuffle',
  standalone: true
})
export class ShufflePipe implements PipeTransform {
  transform(value: any[]): any[] {
    if (!value || value.length === 0) {
      return value; // Return the array as is if it's empty or undefined
    }

    // Shuffle the array using Fisher-Yates (Knuth) algorithm
    for (let i = value.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [value[i], value[j]] = [value[j], value[i]];
    }

    return value;
  }
}
