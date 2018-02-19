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
    
  }


  logout(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
    this.id = null;
  }

}
