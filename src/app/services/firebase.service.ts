import { Injectable } from '@angular/core';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
import { firebaseConfig } from "../../environments/environment";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { User, UserType } from "../model/User";
import { Appointment } from "../model/Appointment";

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

import { JwtHelper } from "angular2-jwt";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  user = null;

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private router: Router) { }

  isAuthenticated() {
    let token = localStorage.getItem("token");
    return token && !this.jwtHelper.isTokenExpired(token);

  }

  async getCurrentUser() {
    firebase.auth().onAuthStateChanged(async user => {
      this.user = user;
    });
  }

  async getAuthCurrentUser() {
    return firebase.auth().currentUser;
  }


  register(user: User) {
    var router = this.router;
    var addUser = this.addUser;
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(function (res) {
        user.id = res.user.uid;
        addUser(user);
        res.user.getIdToken()
          .then(function (token) {
            localStorage.setItem('token', token);
            router.navigate(['/']);
          });
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  }

  login(user, pass) {
    var router = this.router;
    firebase.auth().signInWithEmailAndPassword(user, pass)
      .then(function (res) {
        console.log(res);
        res.user.getIdToken()
          .then(function (token) {
            localStorage.setItem('token', token);
            router.navigate(['/']);
          });

      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  }

  logout() {
    localStorage.removeItem('token');
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
    }).catch(function (error) {
      // An error happened.
    });
  }

  addUser(user: User) {
    var db = firebase.firestore();
    db.collection("users").add({
      email: user.email,
      password: user.password,
      name: user.name,
      birthDate: user.birthDate,
      gender: user.gender,
      type: user.type,
      id: user.id
    })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }

  // async saveResult(juego, gano) {   
  //     await this.getCurrentUser();
  //     var db = firebase.firestore();
  //     let resultados = db.collection('resultados')
  //     let activeRef = await resultados
  //       .where('usuarioId', '==', this.user.uid)
  //       .where('juego', '==', juego)
  //       .get();

  //     if (activeRef.empty) {
  //       //add
  //       db.collection("resultados").add({
  //         usuarioId: this.user.uid,
  //         juego: juego,
  //         victorias: gano ? 1 : 0,
  //         derrotas: gano ? 0 : 1
  //       });
  //     }
  //     else {
  //       //update
  //       activeRef.docs.forEach(function (doc) {
  //         let victorias = doc.data().victorias + (gano ? 1 : 0);
  //         let derrotas = doc.data().derrotas + (gano ? 0 : 1);
  //         db.collection("resultados").doc(doc.id)
  //           .update({ victorias: victorias, derrotas: derrotas });
  //       });
  //     }
  // }

  async getUsers() {
    // return await db.collection("usuarios").get();
    let usrsRef = await db.collection('users').get();
    var rv = [];
    for (let u of usrsRef.docs) {
      rv.push(u.data() as User);
    }
    return rv;
  }

  async getUser(id: string) {
    let usrsRef = await db.collection('users')
     .where("id", "==", id)
    .get();    
    return usrsRef.docs.shift().data() as User;
  }

  async getAppointmentsByDate(date: Date, specialistId: string) {

    let ref = await db.collection('appointments').get();
    let appointments: Array<Appointment> = [];
    for (let doc of ref.docs) {
      console.log(doc.data());
      var appointment: Appointment = doc.data() as Appointment;
      if (appointment.date == date && appointment.specialistId == specialistId && appointment.status == 1)
        appointments.push(appointment);
    }
    return appointments;
  }

  async getAppointments() {
    var rv =null;
    var userAuth = await firebase.auth().currentUser;
    var user = await this.getUser(userAuth.uid);
    var field = null;

    switch (user.type as UserType) {
      case UserType.Cliente:
        field = "clientId";
        break;
        case UserType.Especialista:
          field = "specialistId";
          break;
    }
    if(field)
      rv = await db.collection('appointments').where(field, "==", user.id).get();
    else rv = await db.collection('appointments').get();

    // for (let index = 0; index < rv.docs.length; index++) {
    //   const doc = rv.docs[index];
    //   var appointment = doc.data() as Appointment;
    //   var specialist = await this.getUser(appointment.specialistId);
    //    appointment.specialistName = specialist.name;
    //    var client = await this.getUser(appointment.clientId);
    //    appointment.clientName = client.name;
    // }
   

     return rv;
  }

  async addAppointments(appointments: Array<Appointment>) {
    var user = firebase.auth().currentUser;
    var db = firebase.firestore();
    appointments.forEach(appointment => {
      db.collection("appointments").add({
        specialistId: appointment.specialistId,
        clientId: user.uid,
        status: appointment.status,
        date: appointment.date.toLocaleString()
      });
    });
  }

}
