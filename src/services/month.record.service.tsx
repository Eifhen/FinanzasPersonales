import { monthRecordsData } from "../data/months.record.data";
import expendingsRecords from "../data/records.data";
import IYearRecord, { IMonthRecord, IRecord } from "../interfaces/financial.records.interface";
import yearRecordService from "./year.record.service";

const records = expendingsRecords;

class MonthFinanceRecordService {


    GetAll(id_month_record:number):Array<IRecord>{
        const find = records.filter(record => record.id_month_record === id_month_record);
        return find;
    }

    Get(id:number){
        return records.find(item => item.id == id);
    }

    Insert(data:IRecord, id_month_record:number) : boolean {
        data.id = Math.floor(Math.random() * 999);
        data.id_month_record = id_month_record;
        records.push(data);
        console.log("record inserted =>", records);
        return true;
    }

    Update(data:IRecord) : boolean {
        const item = records.find( element => element.id === data.id);
        if(item){
            item.date = data.date;
            item.title = data.title;
            item.cost = data.cost;
            console.log("item actualizado => ", item);
            return true;
        }

        console.log("error al actualizar", item);
        return false;

    }


    Delete(data:IRecord) : boolean {
        console.log("delete =>", data);
        const find = records.find(item => item.id === data.id);
        if(find){
           for(var index =0; index < records.length; index++){
                if(records[index].id === data.id){
                    records.splice(index, 1);
                    console.log("Deleted");
                    break;
                }
           }
           return true;
        }
        console.log("ha ocurrido un error al eliminar el objeto", data);
        return false;
    }


    monthReport(id_month_record:number) : IMonthRecord {
        // Revisar todas las versiones de este método

        const report = yearRecordService.Get(id_month_record);
        const expenses = records.filter(expense => expense.id_month_record == id_month_record);
        console.log("report =>", report);
        console.log("expenses =>", expenses);
        if(report){
            expenses.forEach(item => {
                report.total_expendings = report.total_expendings + item.cost;
                report.total_saved = report.total_incomes - item.cost;
            })
            return report;
        }

        const record:IMonthRecord = {
            id: 0,
            title: "",
            date: "",
            month: "",
            total_saved: 0,
            total_incomes: 0,
            total_expendings: 0,
            id_year_financial_record: 0
        }

        return record;

    }
}

const monthRecordService = new MonthFinanceRecordService();
export default monthRecordService;