export class Field{

    id:number;
    type:string;
    name:string;
    errorMessage:string='';

    constructor(id:number,type:string,name:string){
        this.id=id;
        this.type=type;
        this.name=name;

    }
}