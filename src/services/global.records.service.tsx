import { yearsRecordData } from "../data/years.record.data";
import IYearRecord, { IGlobalRecord } from '../interfaces/financial.records.interface';


const records = yearsRecordData;

class GlobalRecordsService {

    GetAll():Array<IYearRecord>{
        return records;
    }

    Get(id:number) : IYearRecord | undefined {

        const find = records.find(item => item.id == id);
        return find;
    }

    Insert(data:IYearRecord) : boolean {
        data.id = Math.floor(Math.random() * 999);
        records.push(data);
        console.log("record inserted =>", records);
        return true;
    }

    Update(data:IYearRecord) : boolean {
        const item = records.find( element => element.id === data.id);
        if(item){
            item.date = data.date;
            item.title = data.title;
            item.total_expendings = data.total_expendings;
            item.total_incomes = data.total_incomes;
            item.total_saved = data.total_saved;
            console.log("item actualizado => ", item);
            return true;
        }

        console.log("error al actualizar", item);
        return false;

    }


    Delete(data:IYearRecord) : boolean {
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


    GlobalReport() : IGlobalRecord {
        
        const report:IGlobalRecord = {
            total_incomes: 0,
            total_expendings: 0,
            total_saved: 0
        } 

        records.forEach(item => {
            report.total_incomes = report.total_incomes + item.total_incomes;
            report.total_expendings = report.total_expendings + item.total_expendings;
            report.total_saved = report.total_saved + item.total_saved;
        })

        return report;
    }

}


const financialRecordService = new GlobalRecordsService();
export default financialRecordService;