export interface Creancier {
    code:string,
    name: string;
    category: string;
    image:string,
    creances: Creance[];
  }

export interface Creance {
    id:number;
    name:string;
    formId:number;
  }