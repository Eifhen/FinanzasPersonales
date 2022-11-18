import { BrowserRouter, Route, Routes } from "react-router-dom";
import YearRecordPage from "../pages/year.record.page";
import GlobalRecordsPage from "../pages/global.records.page";
import HomePage from "../pages/home.page";
import MonthRecordPage from "../pages/month.record.page";


export default function RouterManager (): JSX.Element {


    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <HomePage/> }/>
                <Route path="/home" element={ <HomePage/> }/>
                <Route path="/global-records" element={<GlobalRecordsPage/>} />
                <Route path="/year-record/:id" element={<YearRecordPage/>} />
                <Route path="/year-record/:id_year_record/month/:id_month_record" element={<MonthRecordPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}