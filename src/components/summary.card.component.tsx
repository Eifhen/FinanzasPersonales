import { IGlobalRecord } from "../interfaces/financial.records.interface";


export interface ISumaryObj {
    data:IGlobalRecord;
}

export default function SummaryCard (props:ISumaryObj){



    return(
        <div className="summary-card bg-pure">
            <div className='summary-card-title '>
                <i className="ri-list-unordered"></i>
                Summary:
            </div>
            <div className='summary-card-group '>
                <div>
                    <p> 
                        Total Incomes : 
                        <i className="ri-money-dollar-circle-line text-green"></i> 
                        <span className='text-green'>{props.data.total_incomes}</span>  
                    </p>  
                </div>
                <div>
                    <p>
                        Total Expendings: 
                        <i className="ri-money-dollar-circle-line text-wine"></i> 
                        <span className="text-wine">{props.data.total_expendings}</span>
                    </p> 
                </div>
                <div>
                    <p>
                        Total Saved:
                        <i className="ri-money-dollar-circle-line text-orange"></i>  
                        <span className='text-orange'> {props.data.total_saved}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}