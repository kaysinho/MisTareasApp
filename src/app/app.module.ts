
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment'
import { HttpModule } from '@angular/http';
import { NgDatepickerModule } from 'ng2-datepicker';


//Routes
import { app_routing } from './app.routes'

//Services
import { UserService } from './services/user.service'
import { TaskService } from './services/task.service';
import { RouterModule, Routes } from '@angular/router';

//Pipes
import { PendingsPipe } from './pipes/pendings.pipe';
 
//Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { LoginComponent } from './components/internal-pages/login/login.component';
import { SingInComponent } from './components/internal-pages/sing-in/sing-in.component';
import { ListPendingTasksComponent } from './components/internal-pages/list-pending-tasks/list-pending-tasks.component';
import { ListFinishTasksComponent } from './components/internal-pages/list-finish-tasks/list-finish-tasks.component';
import { TasksComponent } from './components/internal-pages/tasks/tasks.component';
import { TasksByUserPipe } from './pipes/tasks-by-user.pipe';
import { FilterTasksPipe } from './pipes/filter-tasks.pipe';
import { TaskUpdateComponent } from './components/internal-pages/task-update/task-update.component';
import { PasswordUpdateComponent } from './components/internal-pages/password-update/password-update.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SingInComponent,
    ListPendingTasksComponent,
    ListFinishTasksComponent,
    TasksComponent,
    PendingsPipe,
    TasksByUserPipe,
    FilterTasksPipe,
    TaskUpdateComponent,
    PasswordUpdateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    app_routing,
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase, 'mistareas'),
    CommonModule,
    NgDatepickerModule
  ],
  providers: [
    UserService,
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
