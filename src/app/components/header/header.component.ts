import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import * as firebase from "firebase/app";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  concesionaria = '';
  user = null;
  loading = true;

  constructor(private firebaseService: FirebaseService) { }


  logout() {
    this.firebaseService.logout();
  }

  async getUser(uid) {
  
    var db = firebase.firestore();
    let usrRef = db.collection('concesionarias')
    let activeRef = await usrRef.where('id', '==', uid).get();
    for (let doc of activeRef.docs) {
      this.user = doc.data();
      this.loading = false;
    }
  }

  async getCurrentUser(){
    firebase.auth().onAuthStateChanged(async user => {
      this.getUser(user.uid)
    });
    
  }

  ngOnInit() {
    this.getCurrentUser();
      
  }

}
