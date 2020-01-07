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

  constructor( private firebaseService: FirebaseService) { }

  user: User = new User(1,'','','',new Date(),3);

  ngOnInit() {
  }

  Register(){
    this.firebaseService.register(this.user);
  }
}

