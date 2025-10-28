import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

export default function HomeLayout(){
    return(
        <div className="flex flex-col min-h-screen">
            <NavBar/>
            <main className="flex-1 pt-20">
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}
