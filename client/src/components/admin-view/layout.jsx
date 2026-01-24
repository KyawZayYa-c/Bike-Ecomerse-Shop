import {Outlet} from "react-router-dom";
import AdminSidebar from "@/components/admin-view/sidebar.jsx";
import AdminHeader from "@/components/admin-view/header.jsx";
import {useState} from "react";

function AdminLayout(){
    const [openSidebar, setOpenSidebar] = useState(false);
    return (
        <div className="flex min-h-screen w-full" >
            {/* Admin sidebar*/}
            <AdminSidebar open={openSidebar} setOpen={setOpenSidebar}/>
            <div className="flex flex-col flex-1" >
                {/*admin header*/}
                <AdminHeader setOpen={setOpenSidebar} />
                <main className = "flex-1 flex-col bg-muted/40 p-4 md:p-6" >
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AdminLayout;