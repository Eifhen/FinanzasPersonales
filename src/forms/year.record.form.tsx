import { useContext } from "react";
import { GlobalRecordContext } from "../context/global.record.context";
import IFinancialRecords from "../interfaces/financial.records.interface";

// Formulario para agregar/editar un record referente a un año

export function YearRecordForm(props:any){
    const context = useContext(GlobalRecordContext);

    return (
        <div>
            <fieldset>
                <label className="text-gray" htmlFor="title">Title</label>
                <input  maxLength={15} className="text-capitalize" placeholder="Enter a Title" id="title" type="text" onChange={context.HandleForm} value={context.form.title}  />
            </fieldset>
            <fieldset>
                <label className="text-gray" htmlFor="date">Creation Date</label>
                <input id="date" type="datetime-local" onChange={context.HandleForm} value={context.form.date}  />
            </fieldset>
        </div>
    );
}   