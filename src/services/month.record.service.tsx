import axios from "axios";

import { IRecord, IMonthIncome } from '../interfaces/financial.records.interface';

const API_KEY = import.meta.env.VITE_APP_API_KEY
const PATH = import.meta.env.VITE_APP_BASE_URL;

class MonthFinanceRecordService {

    // Records 

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

    Get(id_record:number) : Promise<any>{
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
   
    // Incomes
    GetAllIncomes(id_month_record:number): Promise<any>{
        const url = `${PATH}/income-records/getAll.php?id=${id_month_record}`;
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

    GetIncome(id_record:number) : Promise<any>{
        const url = `${PATH}/income-records/get.php?id=${id_record}`;
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

    InsertIncome(data:IMonthIncome) : Promise<any> {
        const url = `${PATH}/income-records/post.php`;
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

    UpdateIncome(data:IMonthIncome) : Promise<any> {
        const url = `${PATH}/income-records/put.php`;
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

    DeleteIncome(data:IMonthIncome) : Promise<any> {
        const url = `${PATH}/income-records/delete.php?id=${data.id}`;
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