import { Container, Navbar, NavDropdown, Nav, Form, Button, Row, Col } from "react-bootstrap";
import "./header-component.css";
import { CustomButton } from "../../../components/button-component";
import Brand from "./brand-component";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../reducers/user-reducer";
// import categoryService from "../../../services/category-service";
import { useEffect, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import newsServices from "../../../services/news-services";
import Swal from "sweetalert2";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [category, setCategory] = useState([]);
    const [query, setQuery] = useState(); 

    // let loggedInuser = useSelector((rootStore) => {
    //     return rootStore.User?.loggedInUser
    // })
    let loggedInuser = localStorage.getItem("token")
    console.log(loggedInuser)

    let totalQty = useSelector((root) => {
        if(root.Cart.cart) {
            return root.Cart.cart.reduce((sum, value) => {
            sum += Number(value.qty)
            return sum
        }, 0)
        } else {
            return 0
        }
    })

    const handleLogout = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Do you want to logout",
            position: "top-end",
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: "OK",
            // denyButtonText: `Don't save`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                try{
                    dispatch(logoutUser());
                    // localStorage.removeItem('token')
                    navigate("/");
                } catch(exception){
                    throw exception
                }
            }
        });

        // try{
        //     dispatch(logoutUser());
        //     // localStorage.removeItem('token')
        //     navigate("/");
        // } catch(exception){
        //     throw exception
        // }
    }

    const loadCategory = async() => {
        try{
            let response = await newsServices.getNews();
            setCategory(Object.keys(response.data))
            console.log(Object.keys(response.data))
            console.log(response.data)
            
            // let catarray = [];
            // catarray = category
        } catch(exception) {
            throw exception;
        }
    }
    console.log(category)

    //search
    const handleSubmit = (e) => {
        e.preventDefault()
        let params = "search="+query
        navigate("/search?"+params)
    }
    // console.log(query)

    useEffect(() => {
        loadCategory();
    }, [])

    return(<>
        <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
            <Container> 
                <Link to="/"><Brand className="me-5"/></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="ms-5">
                <Nav className="me-auto">
                    <NavLink to="/" className="nav nav-link">Home</NavLink>
                    <NavLink to="/subscribe" className="nav nav-link">Subscribe</NavLink>
                    <NavLink to="/about-us" className="nav nav-link">About Us</NavLink>
                        {
                            category ? <> <NavDropdown title="Category" id="basic-nav-dropdown">
                                {
                                    category && category.slice(1, 5).map((cat, i) => (
                                        <Link key={i} className={"dropdown-item"} to={"/category/"+cat}> {cat} </Link>
                                    ))
                                }
                            </NavDropdown> </> : <></>
                        }
                </Nav>
                </Navbar.Collapse>

                <Form inline="true" onSubmit={handleSubmit}>
                    <Row>
                    <Col xs="auto">
                        <Form.Control type="text" placeholder="Search..." name="search" onChange={(e) => {setQuery(e.target.value)}} className=" mr-sm-2"/>
                    </Col>
                    <Col xs="auto">
                        <CustomButton type="submit" $primary>Search</CustomButton>
                    </Col>
                    </Row>
                </Form>

                <NavLink to={"/cart"} className={"btn border-0 position-relative"}>
                    <CiShoppingCart size={26} style={{color: "fff", marginLeft: "8px"}} />
                    <span className="position-absolute top-0 start-100 translate-middle bg-secondary badge rounded-pill">
                        {totalQty}
                    </span>
                </NavLink>

                {
                    loggedInuser ? <>
                    <NavLink to={"/"} onClick={handleLogout} className="nav-link nav"><RiLogoutBoxRLine className="my-1"/> {loggedInuser} </NavLink>
                    </> : 
                    <>
                    <NavLink to="/login" className="nav-link nav">
                        <FaUser className="me-1"/>Login
                    </NavLink>
                    <NavLink to="/register" className="nav-link nav">Register</NavLink>
                    </>
                }
            </Container>
        </Navbar>
    </>)
}

export default Header;