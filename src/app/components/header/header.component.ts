import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { User } from '../../model/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: User;

  constructor(private firebaseService: FirebaseService) { 
  }

  logout() {
    this.firebaseService.logout();
  }

  async ngOnInit() {

    // this.testUserSession();
    // this.user = JSON.parse(localStorage.getItem("prueba"));
    this.currentUser = await this.firebaseService.getAuthCurrentUser();
    //  this.currentUser.email = sessionStorage.getItem('username');

  }


  // public testUserSession(){
  //   firebase.auth().onAuthStateChanged(function(user) {
  //     console.log(user);
  //     if (user) {
  //       // User is signed in.
  //       sessionStorage.setItem('username', user.email);
  //     } else {
  //       // No user is signed in.
  //     }
  //   });
  // }

}
