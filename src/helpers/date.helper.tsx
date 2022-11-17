import dateFormat, {masks} from 'dateformat';

class DateHandler{

    getCurrentDate(){
        // devuelve la fecha actual en formato dateTime-local
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        return  now.toISOString().slice(0,16);
    }

    toDateTimeLocal(date:string){
        // convierte la fecha ingresada en formato dateTime-local
        const format_date = new Date(date);
        format_date.setMinutes(format_date.getMinutes() - format_date.getTimezoneOffset());
        return  format_date.toISOString().slice(0,16)
    }

    formatDate(date:string){
        // retorna la fecha en formato dd/mm/yyyy hh:mm tt
        masks.datetime = "dd/mm/yyyy HH:MM TT";
        const format_date = dateFormat(date, "datetime");
        return format_date;
    }
}


const dateHandler = new DateHandler();
export default dateHandler;