import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task';
@Pipe({
  name: 'tasksByUser'
})
export class TasksByUserPipe implements PipeTransform {
  transform(value: Task[], filter: string): Task[] {
    if (!value) {
      return null
    } else {
      return value.filter(item => item.user_id == filter);
    }

  }

}
