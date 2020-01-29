export class Appointment{
    id: string;
    specialistId: string;
    specialistName: string;
    clientId: string;
    clientName: string;
    createdUserId: string;
    status: AppointmentStatus;
    date: Date;
    roomCode: string;



    constructor(specialistId: string, clientId: string, createdUserId: string, status: AppointmentStatus, date: Date, roomCode: string){
        this.specialistId = specialistId;
        this.clientId = clientId;
        this.createdUserId = createdUserId;
        this.status = status;
        this.date = date;
        this.roomCode = roomCode;
    }   

}

enum AppointmentStatus {
    Asignado = 1,
    Cancelado = 2,
    Finalizado = 3,
    Perdido = 4
}