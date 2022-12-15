import Button from "../components/button.component";
import Footer from "../components/footer.component";
import Header from "../components/header.component";
import Navbar from "../components/navbar.component";
import { MonthRecordContext, MonthRecordProvider } from "../context/month.record.context";
import { useCallback, useContext, useMemo } from 'react';
import itemRecordHeaders from "../headers/item.record.headers.data";
import FinanceCardList from "../components/finance.cardlist.component";
import { IRecord } from "../interfaces/financial.records.interface";
import Modal from "../components/modal.component";
import GoBack from '../components/goback.component';
import { useLocation, useNavigate } from "react-router-dom";
import {ActionBar, IActiveBarItem} from "../components/activebar.component";


export default function MonthRecordPage(){
    return(
        <MonthRecordProvider>
            <MonthRecordPageContent/>
        </MonthRecordProvider>
    );
}

function MonthRecordPageContent(){
    const context = useContext(MonthRecordContext);
    const records = context.allRecords;
    const report = context.monthReport;
    const headers = itemRecordHeaders;
    const navigate = useNavigate();
    const path = `/year-record/${context.id_year_record}/month/${context.id_month_record}/record`;

    const GoToPreviousPage = () : void => {
        navigate(`/year-record/${context.id_year_record}`);
    }

    const ActionItems = useMemo(() : Array<IActiveBarItem> => [
        {
            title: "Add Expense",
            icon: "ri-add-line text-green",
            action:()=> context.openModal("add")
        },
        {
            title: "Add Income",
            icon: "ri-coin-fill text-orange",
            action:()=> context.openModal("add-income")
        },
        {
            title: "Go Back",
            icon: "ri-arrow-left-circle-line fs-1-4 text-blue-royal",
            action:()=> GoToPreviousPage()
        },
    ], []);

    return (
        <main className='f-roboto fade-in bg-white-light h-min-100vh align-column-between p-relative'>
            <Navbar background="bg-white-light" />
            
            <section className='container h-min-100vh align-self-center bg-inherit pt-0 mb-4 '>
                <Header className="mb-1" 
                    title="Monthly Record" 
                    icon="ri-file-paper-2-line" 
                    subtitle="All the financial record of the month"
                    elementTitle={report.month}
                />

                <FinanceCardList<IRecord>
                    path={path}
                    headers= { headers }
                    records={ records } 
                    globalReport={ report } 
                    action={context.openModal} 
                    enableIncomeCard={true}
                />

                <ActionBar items={ActionItems} />
            </section>

            <Modal data={context.modal}/>
            <Footer />
        </main>

    );
}

