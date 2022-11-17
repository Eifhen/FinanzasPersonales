import Button from "../components/button.component";
import Footer from "../components/footer.component";
import Header from "../components/header.component";
import Navbar from "../components/navbar.component";




export default function FinancialRecordDetailPage () {

    return (
        <>
            <FinancialRecordDetailPageContent/>
        </>
    );
}


function FinancialRecordDetailPageContent(){
    return(

        <main className='f-roboto fade-in bg-pure h-min-100vh align-column-between'>
            <header>
                <Navbar />
            </header>
            
            <section className='container h-min-100vh align-self-center bg-pure mb-4'>
                <Header className="mb-3" title="Financial Record" icon="ri-file-list-3-line" subtitle="In this view you will be able to see all your financial records by year." />
                <Button className="btn-add mb-1" title="Add Records" icon="ri-add-line" action={()=> {}} />
                

            </section>

            {/* <Modal data={context.modal}/> */}
            <Footer />
        </main>

    );
}