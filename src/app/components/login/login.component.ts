import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FirebaseService} from "../../services/firebase.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = '';
  clave = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firebaseService: FirebaseService) {
    this.firebaseService.getCurrentUser();
  }

  ngOnInit() {
  }

  Entrar() {
    this.firebaseService.login(this.usuario, this.clave);
  }

  completar(email,pass){
    this.usuario=email;
    this.clave=pass;
  }

}


