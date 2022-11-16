import { financialRecordsData } from "../data/financial.records.data";


const records = financialRecordsData;

class FinancialRecordService {

    GetAll(){
        return records;
    }

    Get(id:number){
        return records.find(item => item.id == id);
    }

}


const financialRecordService = new FinancialRecordService();
export default financialRecordService;