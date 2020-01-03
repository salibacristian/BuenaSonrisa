import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FirebaseService} from "../../services/firebase.service";
// import { Concesionaria } from "../../model/Concesionaria";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor( private firebaseService: FirebaseService) { }

  // concesionaria: Concesionaria = new Concesionaria('','','','','');

  ngOnInit() {
  }

  Register(){
    // this.firebaseService.registrarConcesionaria(this.concesionaria);
  }
}

