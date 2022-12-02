import axios from "axios";
import { monthRecordsData } from "../data/months.record.data";
import expendingsRecords from "../data/records.data";
import IYearRecord, { IMonthRecord, IRecord } from "../interfaces/financial.records.interface";
import yearRecordService from "./year.record.service";

const records = expendingsRecords;
const API_KEY = import.meta.env.VITE_APP_API_KEY
const PATH = import.meta.env.VITE_APP_BASE_URL;

class MonthFinanceRecordService {


    GetAll(id_month_record:number): Promise<any>{
        const url = `${PATH}/item-records/getAll.php?id=${id_month_record}`;
        const options = { headers:{ 'Authorization':API_KEY }}
        return new Promise((resolve, reject) => {
            axios.get(url, options)
                .then(res => {
                    resolve(res.data.response);
                })
                .catch(err => {
                    reject(err.response.data);
                })
        });
    }

    Get(id_record:number){
        const url = `${PATH}/item-records/get.php?id=${id_record}`;
        const options = { headers:{ 'Authorization':API_KEY }}
        return new Promise((resolve, reject) => {
            axios.get(url, options)
                .then(res => {
                    resolve(res.data.response);
                })
                .catch(err => {
                    reject(err.response.data);
                })
        });
    }

    Insert(data:IRecord) : Promise<any> {
        const url = `${PATH}/item-records/post.php`;
        const options = { headers:{ 'Authorization':API_KEY }};
        return new Promise((resolve, reject) => {
            axios.post(url, data, options)
                .then(res => {
                    resolve(res.data.response);
                })
                .catch(err => {
                    reject(err.response.data);
                });
        });
    }

    Update(data:IRecord) : Promise<any> {
        const url = `${PATH}/item-records/put.php`;
        const options = { headers:{ 'Authorization':API_KEY }};
        return new Promise((resolve, reject) => {
            axios.put(url, data, options)
                .then(res => {
                    resolve(res.data.response);
                })
                .catch(err => {
                    reject(err.response.data);
                });
        });

    }


    Delete(data:IRecord) : Promise<any> {
        const url = `${PATH}/item-records/delete.php?id=${data.id}`;
        const options = { headers:{ 'Authorization':API_KEY }};
        return new Promise((resolve, reject) => {
            axios.delete(url, options)
                .then(res => {
                    resolve(res.data.response);
                })
                .catch(err => {
                    reject(err.response.data);
                });
        });
    }


    MonthReport(id_month_record:number) : Promise<any> {
        const url = `${PATH}/month-records/get.php?id=${id_month_record}`;
        const options = { headers:{ 'Authorization':API_KEY }}
        return new Promise((resolve, reject) => {
            axios.get(url, options)
                .then(res => {
                    resolve(res.data.response);
                })
                .catch(err => {
                    reject(err.response.data);
                })
        });

    }
}

const monthRecordService = new MonthFinanceRecordService();
export default monthRecordService;