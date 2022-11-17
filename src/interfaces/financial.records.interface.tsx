


export default interface IFinancialRecords {
    id:number;
    title:string;
    date:string;
    total_incomes:number;
    total_expendings:number;
    total_saved:number;
}


export interface IFinancialRecordGlobalReport {
    total_incomes:number;
    total_expendings:number;
    total_saved:number;
}

export interface IFinancialRecordObj {
    data:IFinancialRecords;
}