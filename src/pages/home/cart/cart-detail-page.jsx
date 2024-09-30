import { Container, Row, Col, Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToCart } from "../../../reducers/cart-reducer";

const CartList = () => {
    const [loading, setLoading] = useState(false);
    const [detail, setDetail] = useState();
    const dispatch = useDispatch();
    
    let cart = useSelector((root) => {
        if(root.Cart.cart){
            return root.Cart.cart
        }
    })
    console.log(cart);

    let subTotal = useSelector((root) => {
        if(root.Cart.cart) {
            return root.Cart.cart.reduce((sum, value) => {
            sum += Number((value.price)*(value.qty))
            return sum
        }, 0)
        } else {
            return 0
        }
    })

    let Vat = 0.13 * subTotal;

    let total = subTotal + Vat;

    return(<>
        <Container className="bg-light my-3 p-2">
            <Row>
                <Col>
                    <h4 className="text-center">Cart Detail</h4>
                </Col>
            </Row>
            <hr />

            <Row>
                <Col sm={{offset: 2, span: 8}}>
                <Table responsive hover>
                    <thead className="table-dark">
                        <tr>
                            <th>S.N</th>
                            <th>Product ID</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                cart && cart.map((item, index) => (
                                    <tr key={index}>
                                        <td> {index+1} </td>
                                        <td> {item?.productId} </td>
                                        <td> {Number(item?.price)} </td>
                                        <td>
                                            <span className="btn btn-sm border-dark me-1" onClick={(e) => {
                                                dispatch(setToCart({
                                                    productId: item.productId,
                                                    qty: Number(item.qty) -1
                                                }))
                                            }}>-</span>
                                            {item?.qty} 
                                            <span className="btn btn-sm border-dark ms-1" onClick={(e) => {
                                                dispatch(setToCart({
                                                    productId: item.productId,
                                                    qty: Number(item.qty) +1
                                                }))
                                            }}>+</span> </td>
                                        {/* <td> {item.discount ? item.discount : 0} </td> */}
                                        <td> {((Number(item?.price)) * (Number(item?.qty)))} </td>
                                        
                                    </tr>
                                ))
                            }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan={4} style={{border: "none"}}>
                                <span className="float-end">Sub total: {subTotal} </span>
                            </th>
                        </tr>
                        {/* <tr>
                            <th colSpan={4} style={{border: "none"}}>
                                <span className="float-end">Discount: {} </span>
                            </th>
                        </tr> */}
                        <tr>
                            <th colSpan={4} style={{border: "none"}}>
                                <span className="float-end">Vat(13%): {Vat} </span>
                            </th>
                        </tr>
                        <tr>
                            <th colSpan={4} style={{border: "none"}}>
                                <span className="float-end">Total: {total} </span>
                            </th>
                        </tr>
                    </tfoot>
                </Table>
                </Col>
            </Row>

            <Row>
                <Col sm={{offset: 2, span: 8}}>
                    <NavLink to="/checkout" className="btn btn-sm btn-primary float-end" style={{width: "fit-content", backgroundColor: "#1AA659", border: "none"}}>
                        Checkout<IoIosArrowForward className="ms-2" />
                    </NavLink>
                </Col>
            </Row>
        </Container>
    </>)
}

export default CartList;