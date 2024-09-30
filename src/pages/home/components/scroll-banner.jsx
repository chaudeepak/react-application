import { Col, Container, Row } from "react-bootstrap";
import Marquee from "react-fast-marquee";
import NepaliDate from "nepali-datetime";
import { useEffect, useState } from "react";
import newsServices from "../../../services/news-services";

const ScrollBanner = () => {
    const [loading, setLoading] = useState(false)
    const [trendingTitle, setTrendingTitle] = useState();

    const enDate = new Date();
    const nepdate = new NepaliDate(enDate);

    const getTrendingTitle = async() => {
        try{
            setLoading(true);
            let response = await newsServices.getNews()
            setTrendingTitle(response.data.Latest)
            console.log(response.data.Latest)
        } catch(exception){
            throw exception;
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        getTrendingTitle();
    }, [])

    return(<>
        <Container className="nav-bar" fluid>
            <Row style={{alignSelf: 'center'}}>
                <Col sm={{span: 2}} className="bg-secondary">
                    <i> {nepdate.format('MMMM-DD-YYYY')} </i>
                </Col>
                <Col sm={{span: 10}} className="bg-light">
                <Marquee>
                    {
                        trendingTitle && trendingTitle.map((data, i) => (
                            <span key={i} className="me-3">  {data.title} ..... </span>
                        ))
                    }
                </Marquee>
                </Col>
            </Row>
        </Container>
    </>)
}

export default ScrollBanner;