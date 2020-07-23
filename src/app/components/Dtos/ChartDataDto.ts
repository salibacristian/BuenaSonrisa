export class ChartDataDto{
    type: string;
    name: string;
    dataY: Array<number>;
    dataX: Array<string>;
    titleY: string;
    titleX: string;

    constructor(type: string, name: string, dataY: Array<number>, dataX: Array<string>, titleY: string, titleX: string){
        this.type = type;
        this.name = name;
        this.dataY = dataY;
        this.dataX = dataX;
        this.titleY = titleY;
        this.titleX = titleX;
        
    }   

}
