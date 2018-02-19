import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../../models/task'
import { TaskService } from '../../../services/task.service'

@Component({
  selector: 'app-list-pending-tasks',
  templateUrl: './list-pending-tasks.component.html',
  styleUrls: ['./list-pending-tasks.component.css']
})
export class ListPendingTasksComponent implements OnInit {
  id: string = "";
  allTasks: Task[];
  constructor(private activadedRoute:ActivatedRoute, private taskService:TaskService) { 
    this.ngOnInit()
    this.getTasks()
  }

  ngOnInit() {
    this.activadedRoute.params.subscribe(params =>{
      this.id = params["id"]
    })

   
  }

  getTasks(){
    this.taskService.getTasks().subscribe(tasks =>{
      this.allTasks = tasks;
    })
  }

  updatePending(task:Task){
    task.state = false;
    this.taskService.updateTask(task);
  }
}
