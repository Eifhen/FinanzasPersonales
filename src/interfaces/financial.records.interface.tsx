




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
    id_year_record:number;
}

export interface IMonthRecordObj {
    data:IMonthRecord;
}

export interface IRecord {
    id:number;
    id_month_record:number;
    title:string;
    date:string;
    cost:number;
    descripcion:string;
}

export interface IRecordObj {
    data:IRecord;
}

export interface IMonthIncome {
    id:number;
    id_month_record:number;
    title:string;
    date:string;
    income:number;
    descripcion:string;
}

export interface IMonthIncomeObj {
    data:IMonthIncome;
}