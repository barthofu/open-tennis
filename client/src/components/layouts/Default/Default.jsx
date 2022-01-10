import NavBar from "@modules/NavBar/NavBar";
import SideBar from "@modules/SideBar/SideBar";

export default function Default({ children }) {
    return (
    <>
    <SideBar/>
    <NavBar/>
    { children }
    </>
    )
}