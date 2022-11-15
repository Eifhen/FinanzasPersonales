import {useEffect, useContext, useState} from 'react';
import Navbar from '../components/navbar.component';
import { FinanceRecordContext, FinanceRecordProvider } from '../context/finance.record.context';



export default function FinanceRecordPage (){
    return(
        <FinanceRecordProvider>
            <FinanceRecordPageContent/>
        </FinanceRecordProvider>
    )
}


function FinanceRecordPageContent(){
    const context = useContext(FinanceRecordContext);
    return(
        <main className='f-roboto fade-in bg-pure h-min-100vh'>
            <header>
                <Navbar />
            </header>
        </main>
    );
}