import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../../models/task'
import { TaskService } from '../../../services/task.service'



@Component({
  selector: 'app-list-finish-tasks',
  templateUrl: './list-finish-tasks.component.html',
  styleUrls: ['./list-finish-tasks.component.css']
})
export class ListFinishTasksComponent implements OnInit {
  id: string = "";
  allTasks: Task[];

  constructor(private activadedRoute: ActivatedRoute
    , private taskService: TaskService
    , private router: Router ) {
    this.ngOnInit()

  }

  ngOnInit() {

    this.activadedRoute.params.subscribe(params => {
      this.id = params["id"]
      console.log(this.id)
      this.getTasks()
    })

  }


  public getTasks() {
    this.taskService.getTasks().subscribe(tasks => {
      this.allTasks = tasks;
      console.log('Se cargan los datos');
    })
  }

  finishTask(task: Task) {
    task.state = false;
    this.taskService.deleteTask(task);
  }

}
