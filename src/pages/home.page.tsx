import BrandLogo from "../components/brand.component";


export default function HomePage(){


    return (
        <main className="f-roboto fade-in">
            <section className="h-100vh align-column-center">
                <BrandLogo type="big" title="Continuar" path="/global-records" />
            </section>
        </main>
    );
}