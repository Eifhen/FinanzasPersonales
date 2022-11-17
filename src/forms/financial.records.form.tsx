import { useContext } from "react";
import { FinanceRecordContext } from "../context/finance.record.context";
import IFinancialRecords from "../interfaces/financial.records.interface";



export function FinancialRecordsForm(props:any){
    const context = useContext(FinanceRecordContext);

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
        </div>
    );
}   