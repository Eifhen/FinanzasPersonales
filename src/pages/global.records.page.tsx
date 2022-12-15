import { useContext, useEffect, useMemo } from 'react';
import Button from '../components/button.component';
import FinanceCardList from '../components/finance.cardlist.component';
import Footer from '../components/footer.component';
import Header from '../components/header.component';
import Modal from '../components/modal.component';
import Navbar from '../components/navbar.component';
import { GlobalRecordContext, GlobalRecordProvider } from '../context/global.record.context';
import IYearRecord from '../interfaces/financial.records.interface';
import yearRecordheaders from '../headers/year.record.headers.data';
import { ActionBar, IActiveBarItem } from '../components/activebar.component';


export default function GlobalRecordsPage (){
    return(
        <GlobalRecordProvider>
            <GlobalRecordPageContent/>
        </GlobalRecordProvider>
    )
}

function GlobalRecordPageContent(){

    const context = useContext(GlobalRecordContext);
    const report = context.globalReport;
    const records = context.yearRecords;
    const path = "/year-record";
    const headers = yearRecordheaders;

    const ActionItems = useMemo(() : Array<IActiveBarItem> => [
        {
            title: "Add Record",
            icon: "ri-add-line text-green",
            action:()=> context.openModal("add")
        },
    ], []);

    return(
        <main className='f-roboto fade-in bg-white-light h-min-100vh align-column-between'>
            <Navbar background='bg-white-light' />
            
            <section className='container h-min-100vh align-self-center bg-inherit mb-4 pt-0'>
                <Header className="" 
                    title="Global Financial Record" 
                    icon="ri-earth-fill " 
                    subtitle="In this view you will be able to see all your financial records by year." 
                />              
                
                <FinanceCardList<IYearRecord>
                    path={path} 
                    headers= { headers }
                    records={ records } 
                    globalReport={ report } 
                    action={context.openModal} 
                />
            
                <ActionBar items={ActionItems} />
            </section>

            <Modal data={context.modal}/>
            <Footer />
        </main>
    );
}