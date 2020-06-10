import { Injectable } from '@angular/core';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
import { firebaseConfig } from "../../environments/environment";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { User, UserType } from "../model/User";
import { Appointment } from "../model/Appointment";
import { AngularFireStorage } from '@angular/fire/storage';

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


  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private router: Router, private storage: AngularFireStorage) {
  }

  //Tarea para subir archivo
  public tareaCloudStorage(nombreArchivo: string, datos: any) {
    return this.storage.upload(nombreArchivo, datos);
  }

  //Referencia del archivo
  public referenciaCloudStorage(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo);
  }

  isAuthenticated() {
    let token = localStorage.getItem("token");
    let decodedToken = this.jwtHelper.decodeToken(token);
    let sessionUserName = sessionStorage.getItem('userName');
    return token && !this.jwtHelper.isTokenExpired(token) && decodedToken.email == sessionUserName;

  }

  async getAuthCurrentUser() {
    await this.delay(1000);//para que firebase tenga disponible el usuario actual
    var authCurrentUser = firebase.auth().currentUser;
    if (authCurrentUser)
      return await this.getUser(authCurrentUser.uid);
    else return null;
  }

  public delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  register(user: User, password: string) {
    var router = this.router;
    var addUser = this.addUser;
    firebase.auth().createUserWithEmailAndPassword(user.email, password)
      .then(function (res) {
        user.id = res.user.uid;
        addUser(user);
        sessionStorage.setItem('userName',user.email);
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
      .then(async function (res) {
        console.log(res);
        var token = await res.user.getIdToken();
        localStorage.setItem('token', token);
        sessionStorage.setItem('userName',user);
        router.navigate(['/']);
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
    sessionStorage.removeItem('userName');
    
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
      name: user.name,
      birthDate: user.birthDate,
      gender: user.gender,
      type: user.type,
      imageUrl: user.imageUrl,
      imageUrl2: user.imageUrl2,
      specialties: user.specialties,
      id: user.id
    })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }

  async setAvailability(availability) {
    var authCurrentUser = firebase.auth().currentUser;
    var db = firebase.firestore();
    let users = db.collection('users')
    let activeRef = await users
      .where('id', '==', authCurrentUser.uid)
      .get();

    activeRef.docs.forEach(function (doc) {
      let availabilityJson = JSON.stringify(availability);
      db.collection("users").doc(doc.id)
        .update({ availability: availabilityJson });
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

  async getAppointments(userId: string, userType: number) {
    var rv = null;
    var field = null;

    switch (userType as UserType) {
      case UserType.Paciente:
        field = "clientId";
        break;
      case UserType.Profesional:
        field = "specialistId";
        break;
    }
    if (field)
      rv = await db.collection('appointments').where(field, "==", userId).get();
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
