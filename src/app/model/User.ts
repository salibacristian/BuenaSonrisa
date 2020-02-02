export class User{
    id: string;
    type: UserType;
    email: string;
    password: string;
    name: string;
    birthDate: Date;
    gender: Gender;
    imageUrl: string;

    constructor(type: UserType, email: string, password: string, name: string, birthDate: Date, gender: Gender, imageUrl: string){
        this.email = email;
        this.password = password;
        this.name = name;
        this.birthDate = birthDate;
        this.gender = gender;
        this.type = type;
        this.imageUrl = imageUrl;
    }   

}

export enum UserType {
    Administrador = 1,
    Cliente = 2,
    Especialista = 3,
    Receptionista = 4
}

enum Gender {
    Masculino = 1,
    Femenino = 2,
    Indefinido = 3
}