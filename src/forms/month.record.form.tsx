
import { useContext } from "react";
import { YearRecordContext } from "../context/year.record.context";
import IFinancialRecords from "../interfaces/financial.records.interface";

// Formulario para agregar/editar un record referente a un mes

export function MonthRecordForm(props:any){
    const context = useContext(YearRecordContext);

    return (
        <div>
            <fieldset>
                <label className="text-gray" htmlFor="title">Title</label>
                <input  maxLength={20} className="text-capitalize" placeholder="Enter a Title" id="title" type="text" onChange={context.HandleForm} value={context.form.title}  />
            </fieldset>
            <fieldset>
                <label className="text-gray" htmlFor="date">Creation Date</label>
                <input id="date" type="datetime-local" onChange={context.HandleForm} value={context.form.date}  />
            </fieldset>
            <fieldset>
                <label className="text-gray" htmlFor="month">Month</label>
                <input maxLength={20} className="text-capitalize" placeholder="month" id="month"  type="text"  onChange={context.HandleForm} value={context.form.month}  />
            </fieldset>
        </div>
    );
}   