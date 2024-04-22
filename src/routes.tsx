import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { Produto } from "./pages/produto";
import { Favoritos } from "./pages/favoritos";
import { Login } from "./pages/login";
import { Notfound } from "./pages/notfound";
import { Private } from "./routes/private";
import { CartPage } from "./pages/CartPage";
import { UserProfilePage } from "./pages/UserProfilePage";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/produto/:id',
                element: <Private> <Produto /> </Private>
            },
            {
                path: '/favoritos',
                element: <Favoritos />,
            },
            {
                path: '/login',
                element: <Login />,
            },

            {
                path: '/cart',  
                element: <CartPage />
            },
            {
                path: '/perfil', 
                element: <Private><UserProfilePage /></Private> 
            },
            
            
            {
                path: '*',
                element: <Notfound />
            },
            

        ]
    }
])

export { router}