import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task';

@Pipe({
  name: 'pendings'
})
export class PendingsPipe implements PipeTransform {

  transform(value: Task[], filter: boolean): Task[] {
    if (!value) {
      return null
    } else {
      return value.filter(item => item.state == filter);
    }

  }

}
