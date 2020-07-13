import {User} from './User'
import { Review } from './Review';
import { Survey } from './Survey';

export class Appointment{
    docId: string;
    specialist: User;
    client: User;
    status: AppointmentStatus;
    date: any;
    review: Review;
    survey: Survey;

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