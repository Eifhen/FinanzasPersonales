
import IYearRecord from '../interfaces/financial.records.interface';
import axios from 'axios';

// retorna la data de todos los años registrados

const API_KEY = import.meta.env.VITE_APP_API_KEY
const PATH = import.meta.env.VITE_APP_BASE_URL;

class GlobalRecordsService {

    GetAll():Promise<any>{
        const url = `${PATH}/year-records/getAll.php`;
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

    Get(id:number) : Promise<any> {
        const url = `${PATH}/year-records/get.php?id=${id}`;
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

    Insert(data:IYearRecord) : Promise<any> {
        const url = `${PATH}/year-records/post.php`;
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

    Update(data:IYearRecord) : Promise<any> {
        const url = `${PATH}/year-records/put.php`;
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


    Delete(data:IYearRecord) : Promise<any> {
        const url = `${PATH}/year-records/delete.php?id=${data.id}`;
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


    GlobalReport() : Promise<any> {
        
        const url = `${PATH}/global-records/get.php`;
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


const financialRecordService = new GlobalRecordsService();
export default financialRecordService;