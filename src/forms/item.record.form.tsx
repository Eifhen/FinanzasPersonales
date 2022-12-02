
import { useContext } from "react";
import { MonthRecordContext } from "../context/month.record.context";

// Formulario para agregar/editar un record referente 
// a un gasto de un mes

export function ItemRecordForm(props:any){
    const context = useContext(MonthRecordContext);

    return (
        <div>
            <fieldset>
                <label className="text-gray" htmlFor="title">Title</label>
                <input  id="title" type="text" 
                    maxLength={50} 
                    className="text-capitalize" 
                    placeholder="Enter a Title"  
                    onChange={context.HandleForm} 
                    value={context.form.title}  
                />
            </fieldset>
            <fieldset>
                <label className="text-gray" htmlFor="date">Creation Date</label>
                <input id="date" type="datetime-local" 
                    onChange={context.HandleForm} 
                    value={context.form.date}  
                />
            </fieldset>
            <fieldset>
                <label className="text-gray" htmlFor="income">Cost</label>
                <input id="cost"  type="number" 
                    step="any" 
                    className="text-capitalize" 
                    placeholder="cost"   
                    onChange={context.HandleForm} 
                    value={context.form.cost}  
                />
            </fieldset>
        </div>
    );
}   
