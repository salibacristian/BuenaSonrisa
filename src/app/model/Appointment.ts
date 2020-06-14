import {User} from './User'

export class Appointment{
    specialist: User;
    client: User;
    status: AppointmentStatus;
    date: Date;

    constructor(specialist: User, client: User, status: AppointmentStatus, date: Date){
        this.specialist = specialist;
        this.client = client;
        this.status = status;
        this.date = date;
    }   

}

export enum AppointmentStatus {
    Pendiente = 1,
    Aceptado = 2,
    Finalizado = 3,
    Cancelado = 4,
    Perdido = 5
}