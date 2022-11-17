import { financialRecordsData } from "../data/financial.records.data";
import IFinancialRecords, { IFinancialRecordGlobalReport } from '../interfaces/financial.records.interface';


const records = financialRecordsData;

class FinancialRecordService {

    GetAll():Array<IFinancialRecords>{
        return records;
    }

    Get(id:number){
        return records.find(item => item.id == id);
    }

    Insert(data:IFinancialRecords) : boolean {
        data.id = Math.floor(Math.random() * 999);
        records.push(data);
        console.log("record inserted =>", records);
        return true;
    }

    Update(data:IFinancialRecords) : boolean {
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


    Delete(data:IFinancialRecords) : boolean {
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


    GlobalReport() : IFinancialRecordGlobalReport {
        
        const report:IFinancialRecordGlobalReport = {
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


const financialRecordService = new FinancialRecordService();
export default financialRecordService;