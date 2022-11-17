




export interface IGlobalRecord {
    total_incomes:number;
    total_expendings:number;
    total_saved:number;
}

export default interface IYearRecord {
    id:number;
    title:string;
    date:string;
    total_incomes:number;
    total_expendings:number;
    total_saved:number;
}

export interface IYearRecordObj {
    data:IYearRecord;
}


export interface IMonthRecord{
    id:number;
    title:string;
    date:string;
    month:string;
    total_saved:number;
    total_incomes:number;
    total_expendings:number;
    id_year_financial_record:number;
}

export interface IMonthRecordObj {
    data:IMonthRecord;
}