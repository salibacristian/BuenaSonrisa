export class Survey{
    satisfactionPoints: number;
    specialistPoints: number;
    comment: string;
    returnSameProfessional: boolean;

    constructor(satisfactionPoints: number,specialistPoints:number, comment: string, returnSameProfessional: boolean){
        this.satisfactionPoints = satisfactionPoints;
        this.specialistPoints = specialistPoints;
        this.comment = comment;
        this.returnSameProfessional = returnSameProfessional;
    }   

}
