import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task';
@Pipe({
  name: 'filterTasks'
})
export class FilterTasksPipe implements PipeTransform {

  transform(value: Task[], task: Task): Task[] {
    if (!value) {
      return null
    } else {
      //return value.filter(item => item.user_id == filter);
      return value.filter((item: Task) => this.applyFilter(item, task));
    }

  }
  /**
   * Perform the filtering.
   * 
   * @param {Book} book The book to compare to the filter.
   * @param {Book} filter The filter to apply.
   * @return {boolean} True if book satisfies filters, false if not.
   */
  applyFilter(book: Task, filter: Task): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (book[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (book[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }

}
