import { NavDropdown } from "react-bootstrap"
import { NavLink, Link, useNavigate } from "react-router-dom"
import Brand from "../../home/components/brand-component";
import { RiMenu3Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../reducers/user-reducer";

const AdminNavbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleSidebar = (e) => {
        e.preventDefault();
        document.body.classList.toggle('sb-sidenav-toggled')
    }

    const handleLogout = () => {
        try{
            dispatch(logoutUser());
            // localStorage.removeItem('token');
            navigate("/admin");
        } catch(exception) {
            throw exception;
        }
    }

    return(<>
        <nav className="sb-topnav navbar navbar-expand  navbar-dark bg-dark" style={{backgroundColor: "#1aa659 !important"}}>
            
            <NavLink className="navbar-brand ps-3" to="/">
                Admin Panel
            </NavLink>

            <button onClick={toggleSidebar} className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!">
                <RiMenu3Fill />
            </button>

            <div className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
            </div>

            {/* <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="true">
                        <FaUser />
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item" href="/">Profile Update</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="/login">Logout</a></li>
                    </ul>
                </li>
            </ul> */}

            <NavDropdown title={<FaUser />} id="avbarDropdown" className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4 nav-link">               
                {/* <NavDropdown.Item>Profile Update</NavDropdown.Item> */}
                <Link to="" className={"dropdown-item"}>Update Profile</Link>
                <Link to="/" className={"dropdown-item"} onClick={handleLogout}>Logout</Link>
            </NavDropdown>
        </nav>

        {/* <Navbar className="sb-topnav navbar-expand" style={{backgroundColor: "#1aa659 !important"}}>
            <Link to={'/'} className="navbar-brand ps-3"><Brand /></Link>
            <Button onClick={toggleSidebar} className="btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle">
                <MdMenuOpen />
            </Button>
            <Form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                <InputGroup>
                    <FormControl placeholder="search for..." type="text"></FormControl>
                    <Button className="btn-primary"><CiSearch /></Button>
                </InputGroup>
            </Form>
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <CiUser />
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item" href="#!">Settings</a></li>
                        <li><a className="dropdown-item" href="#!">Activity Log</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="#!">Logout</a></li>
                    </ul>
                </li>
            </ul>
        </Navbar> */}
    </>)
}

export default AdminNavbar;