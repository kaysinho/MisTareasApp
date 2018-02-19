import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../../models/task'
import { TaskService } from '../../../services/task.service'

@Component({
  selector: 'app-list-pending-tasks',
  templateUrl: './list-pending-tasks.component.html',
  styleUrls: ['./list-pending-tasks.component.css']
})
export class ListPendingTasksComponent implements OnInit {
  limit:number[] = [0,9];
  id: string = "";
  allTasks: Task[];
  task: Task = {
    id: '',
    name: '',
    description: '',
    deadline_completion: new Date(),
    state: true,
    responsibles: [],
    user_id: ''
  };
  constructor(private activadedRoute:ActivatedRoute, private router: Router,
    private taskService:TaskService, private zone:NgZone) { 
    this.ngOnInit()
    
  }

  ngOnInit() {
    this.id = sessionStorage.getItem("session");
    if (this.id==null){
      location.reload();
    }

    this.zone.run(() => {
      this.getTasks()
    });
    
  }

  seeMore(){
    this.limit[1] = this.limit[1] + 5
  }

  getTasks(){
    return new Promise((resolve, reject) => {
      this.taskService.getTasks().subscribe(tasks =>{
        this.allTasks = tasks;
      })
    }); 
  }

  editTask(idTask:string){
    window.location.href='/tasks-update/' + idTask;
  }

  updatePending(task:Task){
    task.state = false;
    this.taskService.updateTask(task);
  }
}
