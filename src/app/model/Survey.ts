export class Survey{
    id: string;
    appointmentId: string;
    clinicPoints: number;
    specialistPoints: number;
    comment: string;



    constructor(appointmentId: string, clinicPoints: number, specialistPoints: number, comment: string){
        this.appointmentId = appointmentId;
        this.clinicPoints = clinicPoints;
        this.specialistPoints = specialistPoints;
        this.comment = comment;
    }   

}
