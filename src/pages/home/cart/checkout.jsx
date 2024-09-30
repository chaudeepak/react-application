import { Card, Col, Container, Row, Image } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css'
import Swal from 'sweetalert2';
import { BsCashCoin } from "react-icons/bs";
import { RiQrScan2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { resetCart } from "../../../reducers/cart-reducer";

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let cart = useSelector((root) =>{
        if(root.Cart.cart){
            return root.Cart.cart
        }
    })
    console.log(cart)
    const handleClick = (e) => {
        e.preventDefault();
        handlePay()
    }

    const handlePay = () => {
        Swal.fire({
            title: "Payment Detail",
            text: "Scan for payment",
            imageUrl: "https://img.lazcdn.com/us/domino/76edef397406b0396f0edf6fe1efe1ff.png_2200x2200q80.png_.webp",
            imageWidth: 150,
            imageHeight: 150,
        })
        dispatch(resetCart())
        toast.success("order placed successfully")
        navigate("/home")
    }

    return(<>
        <Container className="bg-light my-3 p-2">
            <Row className="mb-10">
                <Col sm={{span: 8, offset: 2}}>
                    <h4 className="text-center">Pay to proceed</h4>
                </Col>
            </Row>
            <hr />

            <Row style={{justifyContent: "space-around"}} className="mt-10">
                <Col sm={2} className="text-center center-block">
                    <NavLink id="anchor-element" style={{textDecoration: "none"}}>
                        <Card style={{width: "fit-content"}}>
                            <Card.Header>Cash on delivery</Card.Header>
                            <Card.Text>Pay on delivery <BsCashCoin className="ms-2" /> </Card.Text>
                        </Card>
                    </NavLink>
                    <Tooltip anchorSelect="#anchor-element" content="Pay to delivery partner"></Tooltip>
                </Col>

                <Col sm={2} className="col-offset">
                    <NavLink style={{textDecoration: "none"}} onClick={handleClick}>
                        <Card style={{width: "fit-content"}}>
                            <Card.Header>QR pay</Card.Header>
                            <Card.Text>Scan QR code to pay <RiQrScan2Line className="ms-2"/> </Card.Text>
                        </Card>
                    </NavLink>
                </Col>
            </Row>
            <hr/>

            <Row className="mt-10">
                <Col sm={{span: 8, offset: 2}}>
                    <h6 className="text-center">Thank YOu Visit Again</h6>
                </Col>
            </Row>
        </Container>
    </>)
}

export default Checkout;