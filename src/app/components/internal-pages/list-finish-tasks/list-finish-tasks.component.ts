import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
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

    this.id = sessionStorage.getItem("session");
    if (this.id==null){
      this.router.navigate(['/login']);
    }
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { 
        console.log("Termina navegacion")
        this.getTasks()
      }
    });

    

  }


  public getTasks() {
    this.taskService.getTasks().subscribe(tasks => {
      this.allTasks = tasks;
    })
  }

  finishTask(task: Task) {
    task.state = false;
    this.taskService.deleteTask(task);
  }

}
