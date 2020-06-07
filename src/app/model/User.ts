export class User{
    id: string;
    type: UserType;
    email: string;
    name: string;
    birthDate: Date;
    gender: Gender;
    imageUrl: string;
    imageUrl2: string;
    specialties: Array<string>;
    availability: string;

    constructor(type: UserType, email: string, name: string
        , birthDate: Date, gender: Gender, imageUrl: string
        , imageUrl2: string, specialties: Array<string>, availability: string){
        this.email = email;
        this.name = name;
        this.birthDate = birthDate;
        this.gender = gender;
        this.type = type;
        this.imageUrl = imageUrl;
        this.imageUrl2 = imageUrl2;
        this.specialties = specialties;
        this.availability = availability;
    }   

}

export enum UserType {
    Administrador = 1,
    Paciente = 2,
    Profesional = 3
}

export enum Gender {
    Masculino = 1,
    Femenino = 2,
    Indefinido = 3
}

export interface Availability {
    Hora: number;
    lunes: { hora: number, seleccionado: boolean};
    martes: { hora: number, seleccionado: boolean};
    miercoles: { hora: number, seleccionado: boolean};
    jueves: { hora: number, seleccionado: boolean};
    viernes: { hora: number, seleccionado: boolean};
    sabado: { hora: number, seleccionado: boolean};
  }