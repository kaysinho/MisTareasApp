import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../../models/task'
import { TaskService } from '../../../services/task.service'
import { Message } from '../../../models/message'
import { DatepickerOptions } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.css']
})
export class TaskUpdateComponent implements OnInit {
  options: DatepickerOptions = {
    minYear: 2018,
    maxYear: 2020,
    displayFormat: 'DD/MM/YYY',
    barTitleFormat: 'DD/MM/YYY',
    dayNamesFormat: 'dd',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    locale: frLocale,
    minDate: new Date(Date.now()), // Minimal selectable date
    maxDate: new Date(Date.now()),  // Maximal selectable date
    barTitleIfEmpty: 'Click to select a date'
  };
  id_task:string =''
  id: string = "";
  tasks: Task[];
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
  constructor(private activadedRoute: ActivatedRoute, private router:Router,
    private taskService: TaskService) { }

  ngOnInit() {
    this.task.user_id = sessionStorage.getItem("session");
    this.activadedRoute.params.subscribe(params =>{
      this.id_task = params["idtask"]
      this.getTask(this.id_task)
    })

    if (this.task.user_id==null){
      location.reload();
    }
  }

  getTask(idtask:string){
    this.taskService.getTasks().subscribe(tasks =>{
      this.tasks = tasks;
      this.tasks =   this.tasks.filter(item => item.id == idtask);
      this.task = this.tasks[0];
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
  updateRegister() {
    this.validation = this.validateRegister();
    if (this.validation.type == true) {
        this.taskService.updateTask(this.task);
        this.cleanForm();
        this.message_success ="Se ha actualizado la tarea";
        setTimeout(() => {
          window.location.href='/pending-tasks'
        }, 2000);
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
