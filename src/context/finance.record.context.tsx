
import {useEffect, useState, createContext} from 'react';


interface FinanceRecordProvider {

}

const FinanceRecordContext = createContext({} as FinanceRecordProvider);

function FinanceRecordProvider (props:any){

    const data:FinanceRecordProvider = {};

    return(
        <FinanceRecordContext.Provider value={data}>
            {props.children}
        </FinanceRecordContext.Provider>
    );
}


export { FinanceRecordProvider, FinanceRecordContext}

