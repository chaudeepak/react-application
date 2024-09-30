import { Container, Row, ListGroup } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Title } from "../../../components/heading-component";

const HomeFooter = () => {
    return(<>
    <Container as="footer" className="page-footer font-small blue pt-2 mt-2" style={{backgroundColor: "#1aa659", color: "white" }} fluid>
                <Container className="text-center text-md-left" fluid>
                    <Row>
                        <Col sm={12} md={6} me={2}><Title>About Us</Title>
                        <p style={{textAlign: "left"}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim quaerat placeat nostrum, nisi eius maxime quae unde atque possimus, ex modi deleniti soluta, similique assumenda. Laboriosam impedit cum repellat harum.</p>
                        </Col>
                        <hr className="clearfix w-100 d-md-none pb-0"/>
                        <Col sm={6} md={3}><Title>Read Us</Title>
                            <ul style={{listStyleType: "none"}}>
                                <li>Home Delivery</li>
                                <li>ePaper</li>
                            </ul>
                        </Col>
                        <Col sm={6} md={3}><Title>Contact Us</Title>
                            <ul style={{listStyleType: "none"}}>
                                <li>Write for the post</li>
                                <li>Letter to editor</li>
                                <li>Advertise in post</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>

                <Container as="div" className="footer-copyright text-center py-3">
                © 2024 Copyright: news.com
                </Container>
    </Container>
    </>)
}

export default HomeFooter;