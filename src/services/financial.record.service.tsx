import { financialRecordsData } from "../data/financial.records.data";




class FinancialRecordService {

    getData(){
        const records = financialRecordsData;
        return records;
    }

}


const financialRecordService = new FinancialRecordService();
export default financialRecordService;