import { RouterModule, Routes } from '@angular/router'

//Componentes
import { LoginComponent } from './components/internal-pages/login/login.component'
import { SingInComponent } from './components/internal-pages/sing-in/sing-in.component'

const app_routes:Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'singin', component: SingInComponent },
    { path: '', pathMatch: 'full', redirectTo: 'login' }
]

export const app_routing = RouterModule.forRoot(app_routes, {useHash:true});