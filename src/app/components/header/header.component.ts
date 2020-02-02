import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import * as firebase from "firebase/app";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user = {name: '', imageUrl: ''};

  constructor(private firebaseService: FirebaseService) { 
  }

  logout() {
    this.firebaseService.logout();
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("prueba"));

      
  }

}
