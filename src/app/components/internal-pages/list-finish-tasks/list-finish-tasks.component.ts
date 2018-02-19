import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Task } from '../../../models/task'
import { TaskService } from '../../../services/task.service'
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'app-list-finish-tasks',
  templateUrl: './list-finish-tasks.component.html',
  styleUrls: ['./list-finish-tasks.component.css']
})
export class ListFinishTasksComponent implements OnInit, OnDestroy {
  id: string = "";
  allTasks: Task[];
  limit:number[] = [0,9];
  task: Task = {
    id: '',
    name: '',
    description: '',
    deadline_completion: new Date(),
    state: true,
    responsibles: [],
    user_id: ''
  };
  constructor(private activadedRoute: ActivatedRoute
    , private taskService: TaskService
    , private router: Router, private zone:NgZone) {
    this.ngOnInit()

  }

  ngOnInit() {

    this.id = sessionStorage.getItem("session");
    if (this.id == null) {
      location.reload();
    }

      this.zone.run(() => {
        this.getTasks()
      });
  }
  
  seeMore(){
    this.limit[1] = this.limit[1] + 5
  }

  ngOnDestroy(){
    this.allTasks = null;
  }

  public getTasks() {
    return new Promise((resolve, reject) => {
      this.taskService.getTasks().subscribe(tasks =>{
        this.allTasks = tasks;
      })
    });
  }

  finishTask(task: Task) {
    task.state = false;
    this.taskService.deleteTask(task);
  }

}
