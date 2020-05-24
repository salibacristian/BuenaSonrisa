import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import * as firebase from "firebase/app";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser = {email: '', name: '', imageUrl: ''};

  constructor(private firebaseService: FirebaseService) { 
  }

  logout() {
    this.firebaseService.logout();
  }

  async ngOnInit() {

    this.testUserSession();
    // this.user = JSON.parse(localStorage.getItem("prueba"));
    await this.delay(5000);
     this.currentUser.email = sessionStorage.getItem('username');
      
  }

  public delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

  public testUserSession(){
    firebase.auth().onAuthStateChanged(function(user) {
      console.log(user);
      if (user) {
        // User is signed in.
        sessionStorage.setItem('username', user.email);
      } else {
        // No user is signed in.
      }
    });
  }

}
