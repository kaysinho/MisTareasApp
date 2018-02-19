import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public id: string = "";
  constructor(private activadedRoute:ActivatedRoute, private router:Router) {

    this.id = sessionStorage.getItem("session");
    if (this.id==null){
      this.router.navigate(['/login']);
    }

   }

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.id = sessionStorage.getItem("session");
  });
  }
  getActive(value:string) {
    if (String(window.location.href).indexOf(value) >= 0){
      return "active";
    }

  }

  logout(){
    sessionStorage.clear();    
    this.id = null;
    location.reload();

  }


}
