import axios from "axios";
import { IMonthRecord } from "../interfaces/financial.records.interface";


// Retorna la data de los meses del año
const API_KEY = import.meta.env.VITE_APP_API_KEY
const PATH = import.meta.env.VITE_APP_BASE_URL;

class YearFinanceRecordService {


    GetAll(id_year_record:number):Promise<any>{
        const url = `${PATH}/month-records/getAll.php?id=${id_year_record}`;
        const options = { headers:{ 'Authorization':API_KEY }}
        return new Promise((resolve, reject) => {
            axios.get(url, options)
                .then(res => {
                    resolve(res.data.response);
                })
                .catch(err => {
                    reject(err);
                })
        });
    }

    Get(id_month_record:number) : Promise<any>{
        const url = `${PATH}/month-records/get.php?id=${id_month_record}`;
        const options = { headers:{ 'Authorization':API_KEY }}
        return new Promise((resolve, reject) => {
            axios.get(url, options)
                .then(res => {
                    resolve(res.data.response);
                })
                .catch(err => {
                    reject(err);
                })
        });
    }

    Insert(data:IMonthRecord) : Promise<any> {
        const url = `${PATH}/month-records/post.php`;
        const options = { headers:{ 'Authorization':API_KEY }};
        return new Promise((resolve, reject) => {
            axios.post(url, data, options)
                .then(res => {
                    resolve(res.data.response);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    Update(data:IMonthRecord) : Promise<any> {
        const url = `${PATH}/month-records/put.php`;
        const options = { headers:{ 'Authorization':API_KEY }};
        return new Promise((resolve, reject) => {
            axios.put(url, data, options)
                .then(res => {
                    resolve(res.data.response);
                })
                .catch(err => {
                    reject(err);
                });
        });

    }


    Delete(data:IMonthRecord) : Promise<any> {
        const url = `${PATH}/month-records/delete.php?id=${data.id}`;
        const options = { headers:{ 'Authorization':API_KEY }};
        return new Promise((resolve, reject) => {
            axios.delete(url, options)
                .then(res => {
                    resolve(res.data.response);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }


    yearReport(id_year_record:number) : Promise<any> {
        
        const url = `${PATH}/year-records/get.php?id=${id_year_record}`;
        const options = { headers:{ 'Authorization':API_KEY }}

        return new Promise((resolve, reject) => {
            axios.get(url, options)
                .then(res => {
                    resolve(res.data.response);
                })
                .catch(err => {
                    reject(err);
                })
        });

    }
}

const yearRecordService = new YearFinanceRecordService();
export default yearRecordService;