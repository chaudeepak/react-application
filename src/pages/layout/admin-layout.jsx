import { Outlet } from "react-router-dom";
import AdminNavbar from "../cms/components/admin-navbar";
import AdminSidebar from "../cms/components/admin-sidenav";
import AdminFooter from "../cms/components/admin-footer";
import "./admin-layout.css";

const AdminLayout = () => {

    return(<>
        <AdminNavbar />
        
        <div id="layoutSidenav">
            <AdminSidebar />
            <div id="layoutSidenav_content">
                <main>
                    <Outlet />
                </main>
                
                <AdminFooter />
            </div>
        </div>

    </>)
}

export default AdminLayout;