import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FirebaseService} from "../../services/firebase.service";
import { User } from "../../model/User";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor( private firebaseService: FirebaseService) {
    this.userTypes = [
      {name: 'Administrador', value: 1},
      {name: 'Cliente', value: 2},
      {name: 'Especialista', value: 3},
      {name: 'Receptionista', value: 4}
    ];
   }

   userTypes = [];
  
  user: User = new User(1,'','','',new Date(),3);

  ngOnInit() {
   
    
  }

  Register(){
    this.firebaseService.register(this.user);
  }
}

