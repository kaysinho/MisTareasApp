import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../../models/task'
import { TaskService } from '../../../services/task.service'
import { Message } from '../../../models/message'
import * as moment from 'moment';


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
    deadline_completion: new Date(),
    state: true,
    responsibles: [],
    user_id: ''
  };
  password_two: string = "";
  validation: Message = {
    type: false,
    text: ''
  };

  message_success: string = '';
  constructor(private activadedRoute: ActivatedRoute,
    private taskService: TaskService) { }

  ngOnInit() {
    this.activadedRoute.params.subscribe(params => {
      this.id = params["id"]
      this.task.user_id = params["id"];
    })
  }

  validateRegister(): Message {
    let validate: Message = {
      text: '',
      type: false
    }

    //Validacion para el campo nombre
    if (this.task.name.length == 0) {
      validate.text = 'Debe digitar un nombre para esta tarea!'
      return validate;
    }


    //Validacion para el campo nombre
    if (this.task.responsibles.length == 0) {
      validate.text = 'Debe seleccionar al menos un responsable!'
      return validate;
    }

    validate.type = true;
    return validate;
  }
  sendRegister() {
    this.validation = this.validateRegister();
    if (this.validation.type == true) {
        this.taskService.addTask(this.task);
        this.cleanForm();
        this.message_success ="Se ha creado la tarea con estado pendiente";
    }

    
  }

  cleanForm(){
    this.task.id= '';
    this.task.name= '';
    this.task.description= '';
    this.task.responsibles= [];
    this.task.deadline_completion= new Date();
    this.task.state = true;
  }

}
