import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";



export default function Layout({login}) {
    // TODO: Needs to be changed if we have more than one group for user
    const viewerGroup = (login?.usergroups instanceof Array) ? login?.usergroups[0] : null;

    return (
        <div className="App">
            <main>
                <div className="flex">
                    { viewerGroup == "host"
                        ? <Sidebar /> : null }
                    <div style={{ flex: 1}}>
                        <Header login={login}/>
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    )
}
