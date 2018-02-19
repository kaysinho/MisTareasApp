import { RouterModule, Routes } from '@angular/router'

//Componentes
import { LoginComponent } from './components/internal-pages/login/login.component'
import { SingInComponent } from './components/internal-pages/sing-in/sing-in.component'
import { ListPendingTasksComponent } from './components/internal-pages/list-pending-tasks/list-pending-tasks.component'
import { ListFinishTasksComponent } from './components/internal-pages/list-finish-tasks/list-finish-tasks.component'
import { TasksComponent } from './components/internal-pages/tasks/tasks.component'
import { TaskUpdateComponent } from './components/internal-pages/task-update/task-update.component'
import { PasswordUpdateComponent } from './components/internal-pages/password-update/password-update.component'

const app_routes:Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'singin', component: SingInComponent },
    { path:'pending-tasks', component: ListPendingTasksComponent },
    { path:'finish-tasks', component: ListFinishTasksComponent },
    { path:'tasks', component: TasksComponent },
    { path:'tasks-update/:idtask', component: TaskUpdateComponent },
    { path:'password-update', component: PasswordUpdateComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'pending-tasks' }
]

export const app_routing = RouterModule.forRoot(app_routes);