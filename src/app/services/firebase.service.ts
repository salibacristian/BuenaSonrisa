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
import { Specialty } from '../model/Specialty';
import { of } from 'rxjs';
import { AppointmentComponent } from '../components/appointment/appointment.component';

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
    if(!token)
      return false;
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
        sessionStorage.setItem('userName', user.email);
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

  async login(user, pass) {
    var router = this.router;
    var userDb = await this.getUserByEmail(user);
    if (userDb) {
      if (userDb.deleted) {
        alert("Tu cuenta se encuentra deshabilitada");
        return;
      }
      else if (userDb.disabled) {
        alert("Tu cuenta aun no ha sido verificada por un administrador");
        return;
      }
    }
    else {
      alert("No se encontro al usuario " + user);
      return;
    }


    firebase.auth().signInWithEmailAndPassword(user, pass)
      .then(async function (res) {
        console.log(res);
        var token = await res.user.getIdToken();
        localStorage.setItem('token', token);
        sessionStorage.setItem('userName', user);
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

  async getUsers() {
    // return await db.collection("usuarios").get();
    let usrsRef = await db.collection('users').get();
    var rv = [];
    for (let u of usrsRef.docs) {
      rv.push(u.data() as User);
    }
    return rv;
  }

  async getUsersByType(userType: UserType) {
    // return await db.collection("usuarios").get();
    let usrsRef = await db.collection('users')
      .where("deleted", "==", false)
      .where("disabled", "==", false)
      .where("type", "==", userType)
      .get();

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

  async getUserByEmail(email: string) {
    let usrsRef = await db.collection('users')
      .where("email", "==", email)
      .get();
    return usrsRef.docs.shift().data() as User;
  }


  // async getAppointmentsByDate(date: Date, specialistId: string) {

  //   let ref = await db.collection('appointments').get();
  //   let appointments: Array<Appointment> = [];
  //   for (let doc of ref.docs) {
  //     console.log(doc.data());
  //     var appointment: Appointment = doc.data() as Appointment;
  //     if (appointment.date == date && appointment.specialistId == specialistId && appointment.status == 1)
  //       appointments.push(appointment);
  //   }
  //   return appointments;
  // }

  async addAppointment(appointment: Appointment) {
    var user = firebase.auth().currentUser;
    var db = firebase.firestore();
    var specialistDb = await db.collection('users')
    .where("id", "==", appointment.specialist.id)
    .get();
      
    var clientDb = await db.collection('users')
    .where("id", "==", user.uid)
    .get();

    var specialistRef = specialistDb.docs.shift().ref;
    var clientRef = clientDb.docs.shift().ref;

    db.collection("appointments").add({
      specialist: specialistRef,
      client: clientRef,
      status: appointment.status,
      date: appointment.date
    });

  }

  async getAppointments(){
    let appointmentRef = await db.collection('appointments').get();
    var rv = [];
    for (let doc of appointmentRef.docs) {
      let clientRef = await doc.data().client.get();
      let client = clientRef.data() as User;
      let specialistRef = await doc.data().specialist.get();
      let specialist = specialistRef.data() as User;
      let appointment = doc.data() as Appointment;
      appointment.docId = doc.id;
      appointment.client = client;
      appointment.specialist = specialist;
      rv.push(appointment);
    }
    return rv;
  }

  async addSpecialty(name: string) {
    var user = firebase.auth().currentUser;
    var db = firebase.firestore();
    db.collection("specialties").add({
      name: name
    });

  }

  async addUserSpecialties(specialties: Array<string>) {
    var userAuth = firebase.auth().currentUser;
    var db = firebase.firestore();
    var activeRef = await db.collection('users')
      .where('id', '==', userAuth.uid)
      .get();

    activeRef.docs.forEach(function (doc) {
      db.collection("users").doc(doc.id)
        .update({ specialties: specialties });
    });

  }

  async getSpecialties() {
    let ref = await db.collection('specialties').get();
    var rv = [];
    for (let u of ref.docs) {
      rv.push(u.data() as Specialty);
    }
    return rv;
  }

  async updateUserStatus(user: User) {
    var db = firebase.firestore();
    var activeRef = await db.collection('users')
      .where('id', '==', user.id)
      .get();

    activeRef.docs.forEach(function (doc) {
      db.collection("users").doc(doc.id)
        .update({ deleted: user.deleted, disabled: user.disabled });
    });

  }

  async updateAppointmentStatus(appointment: Appointment) {
    var db = firebase.firestore();
    var activeRef = await db.collection('appointments').doc(appointment.docId);
     
    activeRef.update({ status: appointment.status });

  }

}
