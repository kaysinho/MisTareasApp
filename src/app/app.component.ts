import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    setTimeout(() => labelsInteractive(), 2000);
    
   }
  
}

function labelsInteractive(){
  let inputs = document.getElementsByClassName("field-form");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('keyup', function () {
      if (this.value.length >= 1) {
        this.nextElementSibling.setAttribute("style", "margin-top: -135px;");
      } else {
        this.nextElementSibling.setAttribute("style", "margin-top: -85;");
      }
    });
    inputs[i].addEventListener('focus', function () {
        this.nextElementSibling.setAttribute("style", "margin-top: -135px;");
    });
  }
}

