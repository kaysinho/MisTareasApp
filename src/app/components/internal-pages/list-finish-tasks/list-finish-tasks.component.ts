import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
      console.log(this.id);
    })
  }

}
