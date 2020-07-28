export class Review{

    comment: string;
    specialty: string;
    height: number;
    temperature: number;
    otherFields: Array<any>;

    constructor(comment: string, specialty: string, height: number, temperature: number){
        this.comment = comment;
        this.specialty = specialty;
        this.height = height;
        this.temperature = temperature;       
    }   

    
}
