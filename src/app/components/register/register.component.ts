import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { User, UserType, Gender } from "../../model/User";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private firebaseService: FirebaseService) {
  }
  returnToRoute = '/login';
  user: User = new User(1, '', '', new Date(), 3, '', '', [], []);
  password: string = '';

  userTypes = [];
  genders = [
    { value: "Masculino", key: 1 },
    { value: "Femenino", key: 2 },
    { value: "Indefinido", key: 3 }
  ];

  currentUser: User;

  captchaOkey = false;

  async ngOnInit() {
    this.currentUser = await this.firebaseService.getAuthCurrentUser();
    if (!this.currentUser || this.currentUser.type != UserType.Administrador) {
      this.userTypes = [
        { value: "Paciente", key: 2 },
        { value: "Profesional", key: 3 }
      ];
    }
    else {
      this.userTypes = [
        { value: "Administrador", key: 1 },
      ];
      this.returnToRoute = '/users'
    }
  }

  onImageUpload(url, principalImage) {
    if (principalImage)
      this.user.imageUrl = url;
    else this.user.imageUrl2 = url;
  }

  Register() {
    if(this.captchaOkey)
      this.firebaseService.register(this.user, this.password);
    else
      alert("Confirme el captcha");
  }


  resolved(captchaResponse: string) {
    if (captchaResponse && captchaResponse.length > 0) {
      this.captchaOkey = true;
      console.log(`Resolved captcha with response: ${ captchaResponse }`);
    }
    else if (captchaResponse === null) {//expiro
      this.captchaOkey = false;
    }
  }

  onScriptLoad() {
    console.log('Google reCAPTCHA loaded and is ready for use!');
  }

  onScriptError() {
    console.log('Something went long when loading the Google reCAPTCHA')
  }

}

