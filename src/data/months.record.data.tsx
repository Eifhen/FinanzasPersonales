import dateHandler from "../helpers/date.helper";
import { IMonthRecord } from "../interfaces/financial.records.interface";

export const monthRecordsData:Array<IMonthRecord> = [
    { 
        id:123, 
        title:"gastos junio", 
        date: dateHandler.getCurrentDate(), 
        month:"Junio",
        total_incomes:28000, 
        total_expendings:14000, 
        total_saved:14000,
        id_year_financial_record:123,
    },
    { 
        id:123, 
        title:"gastos agosto", 
        date: dateHandler.getCurrentDate(), 
        month:"Agosto",
        total_incomes:28000, 
        total_expendings:18000, 
        total_saved:10000,
        id_year_financial_record:123,
    },
    { 
        id:123, 
        title:"gastos septiembre", 
        date: dateHandler.getCurrentDate(), 
        month:"Septiembre",
        total_incomes:28000, 
        total_expendings:10000, 
        total_saved:180000,
        id_year_financial_record:123,
    },
] ;

// ids_year_financial_records = 123, 321, 444, 555, 122, 322, 323, 333, 133, 124, 654