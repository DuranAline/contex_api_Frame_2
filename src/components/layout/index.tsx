import { Outlet } from "react-router-dom";
import { Header } from "../header";
import "./style.css";

export function Layout() {
    return(
        <>
             <Header />
            <main className="container">
                
                <Outlet />  {/* Onde o conteúdo das páginas específicas */}
            </main>
        </>
    )
}
