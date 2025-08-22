import { Pipe, PipeTransform } from '@angular/core';

let insidTransform = 0;
@Pipe({
  name: 'getLabelPipe',
  standalone: true,
})
export class GetLabelPipe implements PipeTransform {
  transform<ARGS, T>(fn: (...args: ARGS[]) => T, ...args: ARGS[]): T {
    insidTransform = insidTransform + 1;
    console.log(insidTransform);
    return fn(...args);
  }
}
