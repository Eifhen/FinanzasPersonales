import {useEffect, useContext, useState} from 'react';
import Button from '../components/button.component';
import Footer from '../components/footer.component';
import Header from '../components/header.component';
import Modal from '../components/modal.component';
import Navbar from '../components/navbar.component';
import { FinanceRecordContext, FinanceRecordProvider } from '../context/finance.record.context';


export default function FinancialRecordsPage (){
    return(
        <FinanceRecordProvider>
            <FinancialRecordsPageContent/>
        </FinanceRecordProvider>
    )
}

function FinancialRecordsPageContent(){

    const context = useContext(FinanceRecordContext);
   
    console.log(context.modal);

    const subtitle = "In this view you will be able to see all your financial records";

    return(
        <main className='f-roboto fade-in bg-pure h-min-100vh align-column-between'>
            <header>
                <Navbar />
            </header>
            
            <section className='container h-min-100vh align-self-center bg-pure mb-4'>
                <Header className="mb-3" title="Financial Records" subtitle={`${subtitle}`} icon="ri-list-check-2" />
                <Button className="btn-add mb-1" title="Add Records" icon="ri-add-line" action={()=> context.openModal("add")} />
                
                <div className="col-10 mx-auto h-min-70vh shadow rounded-35 bg-white">

                </div>

            </section>

            <Modal data={context.modal}/>
            <Footer />
        </main>
    );
}