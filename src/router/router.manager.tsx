import { BrowserRouter, Route, Routes } from "react-router-dom";
import FinancialRecordDetailPage from "../pages/financial.records.detail.page";
import FinancialRecordsPage from "../pages/financial.records.page";
import HomePage from "../pages/home.page";


export default function RouterManager (): JSX.Element {


    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <HomePage/> }/>
                <Route path="/home" element={ <HomePage/> }/>
                <Route path="/financial-records" element={<FinancialRecordsPage/>} />
                <Route path="/financial-records/:id" element={<FinancialRecordDetailPage/>} />
            </Routes>
        </BrowserRouter>
    );
}