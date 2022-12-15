interface IFinanceIncomeCard{
    enable:boolean;
    children:JSX.Element;
}

export default function IncomeCard(props:IFinanceIncomeCard){
    if(props.enable){
        return(
            <div className="finance-card p-1 bg-pure mt-2 mb-2 p-relative">
                <div className="mb-3">
                    <div className='card-indicator'>
                        <h3>Incomes</h3>
                    </div>
                </div>
                {props.children}
            </div>
        )
    }
    return <></>;
}