import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private activadedRoute:ActivatedRoute, private router: Router,
    private taskService:TaskService) { 
    this.ngOnInit()
    
  }

  ngOnInit() {
    console.log("sessionid: " + this.id)
    this.id = sessionStorage.getItem("session");
    if (this.id==null){
      this.router.navigate(['/login']);
    }
    this.getTasks()
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
