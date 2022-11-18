import { IRecordHeaderObj } from "../components/finance.cardlist.component";


const yearRecordheaders:IRecordHeaderObj = {
    key:"id",
    data: [
        {
            header:"Title",  
            property:"title", 
            navigation:true, 
            colWidth:"w-25 ", 
            rowWidth:"w-20 ", 
            IsDate:false  
        },
        {
            header:"Creation Date",  
            property:"date", 
            navigation:false, 
            colWidth:"w-30 ", 
            rowWidth:"w-30 ", 
            IsDate:true
        },
        {
            header:"Incomes",  
            property:"total_incomes", 
            navigation:false, 
            colWidth:"w-25 ", 
            rowWidth:"w-25 ", 
            IsDate:false
        },
        {
            header:"Expendings",  
            property:"total_expendings", 
            navigation:false, 
            colWidth:"w-20 ", 
            rowWidth:"w-20 ", 
            IsDate:false
        },
        {
            header:"Savings",  
            property:"total_saved", 
            navigation:false, 
            colWidth:"w-20 ", 
            rowWidth:"w-20 ", 
            IsDate:false
        },        
    ]
}

export default yearRecordheaders;