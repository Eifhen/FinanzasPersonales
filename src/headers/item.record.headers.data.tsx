import { IRecordHeader, IRecordHeaderObj } from '../components/finance.cardlist.component';




const itemRecordHeaders:IRecordHeaderObj = {
    key:"id",
    data: [
        {
            header:"Title",  
            property:"title", 
            navigation:false, 
            colWidth:"w-25 ", 
            rowWidth:"w-25 ", 
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
            header:"Cost",  
            property:"cost", 
            navigation:false, 
            colWidth:"w-30 ", 
            rowWidth:"w-30 ", 
            IsDate:false  
        },
    ]
   

}


export default itemRecordHeaders;