export class User{
    id: string;
    type: UserType;
    email: string;
    password: string;
    firstname: string;
    surname: string;
    birthDate: Date;
    gender: Gender;

    constructor(type: UserType, email: string, password: string, firstname: string, surname: string, birthDate: Date, gender: Gender){
        this.email = email;
        this.password = password;
        this.firstname = firstname;
        this.surname = surname;
        this.birthDate = birthDate;
        this.gender = gender;
        this.type = type;
    }   

}

enum UserType {
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