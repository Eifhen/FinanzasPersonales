import { monthRecordsData } from "../data/months.record.data";
import IYearRecord, { IMonthRecord } from "../interfaces/financial.records.interface";
import globalRecordsService from "./global.records.service";


const records = monthRecordsData;

class YearFinanceRecordService {


    GetAll(id_year_record:number):Array<IMonthRecord>{
        const find = records.filter(record => record.id_year_financial_record === id_year_record);
        return find;
    }

    Get(id:number){
        return records.find(item => item.id == id);
    }

    Insert(data:IMonthRecord, id_year_record:number) : boolean {
        data.id = Math.floor(Math.random() * 999);
        data.id_year_financial_record = id_year_record;
        records.push(data);
        console.log("record inserted =>", records);
        return true;
    }

    Update(data:IMonthRecord) : boolean {
        const item = records.find( element => element.id === data.id);
        if(item){
            item.date = data.date;
            item.title = data.title;
            item.month = data.month;
            item.total_expendings = data.total_expendings;
            item.total_incomes = data.total_incomes;
            item.total_saved = data.total_saved;
            console.log("item actualizado => ", item);
            return true;
        }

        console.log("error al actualizar", item);
        return false;

    }


    Delete(data:IMonthRecord) : boolean {
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


    yearReport(id_year_record:number) : IYearRecord {
        
        const report = globalRecordsService.Get(id_year_record);
        if(report){
            records.forEach(item => {
                report.total_incomes = report.total_incomes + item.total_incomes;
                report.total_expendings = report.total_expendings + item.total_expendings;
                report.total_saved = report.total_saved + item.total_saved;
            })
            return report;
        }

        const record:IYearRecord = {
            id: 0,
            title: "",
            date: "",
            total_incomes: 0,
            total_expendings: 0,
            total_saved: 0
        }

        return record;

    }
}

const yearRecordService = new YearFinanceRecordService();
export default yearRecordService;