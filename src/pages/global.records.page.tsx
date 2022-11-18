import { useContext } from 'react';
import Button from '../components/button.component';
import FinanceCardList from '../components/finance.cardlist.component';
import Footer from '../components/footer.component';
import Header from '../components/header.component';
import Modal from '../components/modal.component';
import Navbar from '../components/navbar.component';
import { GlobalRecordContext, GlobalRecordProvider } from '../context/global.record.context';
import IYearRecord from '../interfaces/financial.records.interface';
import yearRecordheaders from '../headers/year.record.headers.data';


export default function GlobalRecordsPage (){
    return(
        <GlobalRecordProvider>
            <GlobalRecordPageContent/>
        </GlobalRecordProvider>
    )
}

function GlobalRecordPageContent(){

    const context = useContext(GlobalRecordContext);
    const report = context.globalReport();
    const records = context.getAllData();
    const path = "/year-record";
    const headers = yearRecordheaders;

    return(
        <main className='f-roboto fade-in bg-pure h-min-100vh align-column-between'>
            <header>
                <Navbar />
            </header>
            
            <section className='container h-min-100vh align-self-center bg-pure mb-4'>
                <Header className="mb-3" 
                    title="Global Financial Record" 
                    icon="ri-earth-fill " 
                    subtitle="In this view you will be able to see all your financial records by year." 
                />
                <Button className="btn-add mb-1" title="Add Record" icon="ri-add-line" action={()=> context.openModal("add")} />                
                <FinanceCardList<IYearRecord>
                    path={path} 
                    headers= { headers }
                    records={ records } 
                    globalReport={ report } 
                    action={context.openModal} 
                />
            </section>

            <Modal data={context.modal}/>
            <Footer />
        </main>
    );
}