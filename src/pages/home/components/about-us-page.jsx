import { Col, Container, Row } from "react-bootstrap";

const AboutUs = () => {
    return(<>
        <Container className="bg-light my-3 p-2">
            <Row className="text-center">
                <Col>
                    <h4>About Us</h4>
                </Col>
            </Row>
            <hr />

            <Row>
                <Col>
                    <p style={{textAlign: "justify", textJustify: "inter-word"}}>
                        Welcome to <b>News.com</b> Portal, your trusted source for up-to-the-minute news and insights from around the world.
                        We are committed to delivering accurate, balanced, and engaging content to keep you informed, empowered, and connected.
                        <br />
                        At Dommy News Portal, we cover a wide range of topics, including breaking news, politics, business, technology, entertainment, and culture. Whether it’s local or global, we strive to provide in-depth analysis and thoughtful reporting that matters to you.
                        <br />
                        Our team of dedicated journalists and content creators works tirelessly to ensure that you have access to reliable news stories, expert opinions, and insightful commentary. We believe in the power of journalism to create awareness and foster informed discussions that can lead to positive change in society.
                        <br />
                        Stay informed, stay ahead with Dommy News Portal — because the truth matters.
                    </p>
                </Col>
            </Row>
        </Container>
    </>)
}

export default AboutUs;