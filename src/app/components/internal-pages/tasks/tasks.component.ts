import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../../models/task'
import { TaskService } from '../../../services/task.service'
import { Message } from '../../../models/message'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  id: string = "";
  task: Task = {
    id: '',
    name: '',
    description: '',
    deadline_completion: '',
    state: true,
    responsibles:[],
    user_id:''
  };
  password_two: string = "";
  validation: Message = {
    type: false,
    text: ''
  };
  
  message_success: string='';
  constructor(private activadedRoute:ActivatedRoute, private taskService:TaskService) { }

  ngOnInit() {
    this.activadedRoute.params.subscribe(params =>{
      this.id = params["id"]
      this.task.user_id = params["id"];
    })
  }

}
