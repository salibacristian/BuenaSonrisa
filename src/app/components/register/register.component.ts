import { Component, OnInit} from '@angular/core';
import {FirebaseService} from "../../services/firebase.service";
import { User, UserType, Gender } from "../../model/User";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  constructor( private firebaseService: FirebaseService) {
   }
  
  user: User = new User(1,'','',new Date(),3, '','',[],'');
  password: string = '';

  userTypes = [];
  genders = [
    {value: "Masculino", key: 1},
    {value: "Femenino", key: 2},
    {value: "Indefinido", key: 3}
  ];

  currentUser: User;

  async ngOnInit() { 
    this.currentUser = await this.firebaseService.getAuthCurrentUser();
    if(!this.currentUser || this.currentUser.type != UserType.Administrador)
    {
      this.userTypes = [
        {value: "Paciente", key: 2},
        {value: "Profesional", key: 3}
      ];
    }
    else{
      this.userTypes = [
        {value: "Administrador", key: 1},
      ];
    }
  }

  onImageUpload(url, principalImage){
    if(principalImage)
      this.user.imageUrl = url;
    else this.user.imageUrl2 = url;
  }

  Register(){
    this.firebaseService.register(this.user, this.password);
  }

}

