import { useContext } from "react";
import { MonthRecordContext } from "../context/month.record.context";

// Formulario para agregar/editar un ingreso referente 
// a un mes

export function IncomeForm(props:any){
    const context = useContext(MonthRecordContext);

    return (
        <div className="row">
            <div className="col-5">
                <fieldset>
                    <label className="text-gray" htmlFor="title">Title</label>
                    <input  id="title" type="text" 
                        maxLength={50} 
                        className="text-capitalize" 
                        placeholder="Enter a Title"  
                        onChange={(event:any)=> context.HandleForm(event, "income")} 
                        value={context.incomeForm.title}  
                    />
                </fieldset>

                <fieldset>
                    <label className="text-gray" htmlFor="date">Creation Date</label>
                    <input id="date" type="datetime-local" 
                        onChange={(event:any)=> context.HandleForm(event, "income")} 
                        value={context.incomeForm.date}  
                    />
                </fieldset>

                <fieldset>
                    <label className="text-gray" htmlFor="income">Income</label>
                    <input id="income"  type="number" 
                        step="any" 
                        className="text-capitalize" 
                        placeholder="income"   
                        onChange={(event:any)=> context.HandleForm(event, "income")} 
                        value={context.incomeForm.income}  
                    />
                </fieldset>
            </div>
            <div className="col-5">
                <fieldset>
                    <label className="text-gray" htmlFor="descripcion">Description</label>
                    <textarea name="descripcion" id="descripcion" placeholder="Type something..."
                        cols={30} 
                        rows={12}
                        onChange={(event:any)=> context.HandleForm(event, "income")} 
                        value={context.incomeForm.descripcion} 
                    />
                </fieldset>
            </div>

        </div>
    );
}   
