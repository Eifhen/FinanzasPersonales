import { BrowserRouter, Route, Routes } from "react-router-dom";
import FinanceRecordPage from "../pages/finance.record.page";
import HomePage from "../pages/home.page";


export default function RouterManager (): JSX.Element {


    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <HomePage/> }/>
                <Route path="/home" element={ <HomePage/> }/>
                <Route path="/finance-record" element={<FinanceRecordPage/>} />
            </Routes>
        </BrowserRouter>
    );
}