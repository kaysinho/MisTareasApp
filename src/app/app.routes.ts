import { RouterModule, Routes } from '@angular/router'

//Componentes
import { LoginComponent } from './components/internal-pages/login/login.component'
import { SingInComponent } from './components/internal-pages/sing-in/sing-in.component'
import { ListPendingTasksComponent } from './components/internal-pages/list-pending-tasks/list-pending-tasks.component'
import { ListFinishTasksComponent } from './components/internal-pages/list-finish-tasks/list-finish-tasks.component'
import { TasksComponent } from './components/internal-pages/tasks/tasks.component'

const app_routes:Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'singin', component: SingInComponent },
    { path:'panding-tasks', component: ListPendingTasksComponent },
    { path:'finish-tasks', component: ListFinishTasksComponent },
    { path:'tasks', component: TasksComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'login' }
]

export const app_routing = RouterModule.forRoot(app_routes);