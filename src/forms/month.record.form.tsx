
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
                <input  id="title" type="text" maxLength={20} className="text-capitalize" placeholder="Enter a Title"  onChange={context.HandleForm} value={context.form.title}  />
            </fieldset>
            <fieldset>
                <label className="text-gray" htmlFor="date">Creation Date</label>
                <input id="date" type="datetime-local" onChange={context.HandleForm} value={context.form.date}  />
            </fieldset>
            <fieldset>
                <label className="text-gray" htmlFor="month">Month</label>
                <input id="month"  type="text" maxLength={11} className="text-capitalize" placeholder="month"   onChange={context.HandleForm} value={context.form.month}  />
            </fieldset>
            <fieldset>
                <label className="text-gray" htmlFor="total_incomes">Income</label>
                <input id="total_incomes"  type="number" step="any" className="text-capitalize" placeholder="Income" onChange={context.HandleForm} value={context.form.total_incomes}  />
            </fieldset>
        </div>
    );
}   