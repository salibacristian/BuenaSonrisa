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

    constructor(type: UserType, email: string, name: string
        , birthDate: Date, gender: Gender, imageUrl: string
        , imageUrl2: string, specialties: Array<string>){
        this.email = email;
        this.name = name;
        this.birthDate = birthDate;
        this.gender = gender;
        this.type = type;
        this.imageUrl = imageUrl;
        this.imageUrl2 = imageUrl2;
        this.specialties = specialties;
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