import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment'


//Routes
import { app_routing } from './app.routes'

//Services
import { UserService } from './services/user.service'
 
//Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { LoginComponent } from './components/internal-pages/login/login.component';
import { SingInComponent } from './components/internal-pages/sing-in/sing-in.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SingInComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    app_routing,
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase, 'mistareas')
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
