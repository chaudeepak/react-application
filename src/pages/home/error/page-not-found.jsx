import { Container, Row, Col } from "react-bootstrap";
import { Title } from "../../../components/heading-component";
import { MdErrorOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const PageNotFound = () => {
    return(<>
        <Container className="my-5" style={{backgroundColor: "#E5E8E8", color: "red"}} fluid>
            <Row className="py-3 text-center">
                <Title><MdErrorOutline className="me-1"/>Error</Title>
                <Col md={{span: 4, offset: 4}}>
                    <h5>Page does not exists</h5>
                    <span style={{color: "#000"}}>go to: <Link to="/"><em>Home page</em></Link></span>
                </Col>
            </Row>
        </Container>
    </>)
}

export default PageNotFound;