import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";

export default function HomeLayout(){
    return(
        <div>
            <NavBar/>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}
