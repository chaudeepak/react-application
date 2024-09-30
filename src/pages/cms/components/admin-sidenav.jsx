import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
	// let loggedinUser = localStorage.getItem('token');
    const loggedInUser = useSelector((rootStore) => {
        return rootStore.User?.loggedInUser
    })
	
    return(<>
        <div id="layoutSidenav_nav">
        <nav
            className="sb-sidenav accordion sb-sidenav-dark"
            id="sidenavAccordion"
        >
        <div className="sb-sidenav-menu">
            <div className="nav">
            <div className="sb-sidenav-menu-heading">Core</div>
            
            <NavLink className="nav-link" to="/admin">
                <div className="sb-nav-link-icon">
                <i className="fas fa-tachometer-alt"></i>
                </div>
                Dashboard
            </NavLink>

            <div className="sb-sidenav-menu-heading">Features</div>
            <NavLink className="nav-link" to="/admin/crud">
                <div className="sb-nav-link-icon">
                <i className="fas fa-images"></i>
                </div>
                Basic Crud
            </NavLink>
            {/* <NavLink className="nav-link" to="/admin/brand">
                <div className="sb-nav-link-icon">
                <i className="fas fa-b"></i>
                </div>
                Brand Manage
            </NavLink>
            <NavLink className="nav-link" to="/admin/category">
                <div className="sb-nav-link-icon">
                <i className="fas fa-sitemap"></i>
                </div>
                Category Manage
            </NavLink> */}
            <NavLink className="nav-link" to="/admin/user">
                <div className="sb-nav-link-icon">
                <i className="fas fa-users"></i>
                </div>
                Users Manage
            </NavLink>
            <NavLink className="nav-link" to="/admin/products">
                <div className="sb-nav-link-icon">
                <i className="fas fa-shopping-basket"></i>
                </div>
                Product Manage
            </NavLink>
            <NavLink className="nav-link" to="/admin/orders">
                <div className="sb-nav-link-icon">
                <i className="fas fa-shopping-cart"></i>
                </div>
                Order Manage
            </NavLink>
            <NavLink className="nav-link" to="/admin/transactions">
                <div className="sb-nav-link-icon">
                <i className="fas fa-dollar-sign"></i>
                </div>
                Transactions Manage
            </NavLink>
            </div>
            
        </div>
        <div className="sb-sidenav-footer">
            <div className="small">Logged in as:</div>
            {loggedInUser ?? loggedInUser}
        </div>
        </nav>
    </div>
    </>)
}

export default AdminSidebar;