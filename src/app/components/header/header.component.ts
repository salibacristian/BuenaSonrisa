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
    await this.delay(5000);//para que firebase tenga disponible el usuario actual
    var authCurrentUser = await this.firebaseService.getAuthCurrentUser();
    this.currentUser = await this.firebaseService.getUser(authCurrentUser.uid);
    //  this.currentUser.email = sessionStorage.getItem('username');

  }

  public delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
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
