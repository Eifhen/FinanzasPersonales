import {useEffect, useContext, useState} from 'react';
import Button from '../components/button.component';
import Footer from '../components/footer.component';
import Header from '../components/header.component';
import Navbar from '../components/navbar.component';
import { FinanceRecordContext, FinanceRecordProvider } from '../context/finance.record.context';
import financialRecordService from '../services/financial.record.service';




export default function FinanceRecordPage (){
    return(
        <FinanceRecordProvider>
            <FinanceRecordPageContent/>
        </FinanceRecordProvider>
    )
}


function FinanceRecordPageContent(){

    const context = useContext(FinanceRecordContext);
    const service = financialRecordService;
    
    const subtitle = "In this view you will be able to see all your financial records";

    return(
        <main className='f-roboto fade-in bg-pure h-min-100vh align-column-between'>
            <header>
                <Navbar />
            </header>
            
            <section className='container h-100vh align-self-center bg-pure'>
                <Header className="mb-3" title="Financial Records" subtitle={`${subtitle}`} icon="ri-list-check-2" />
                <Button className="btn-add" title="Add Records" icon="ri-add-line" hasIcon={true} />
                
                

            </section>

            <Footer />
        </main>
    );
}