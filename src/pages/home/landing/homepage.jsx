import { Col, Container, Image, Row, Card } from "react-bootstrap"
import { Title } from "../../../components/heading-component";
// import { useEffect, useState } from "react";
// import TrendingNewsService from "../../../services/trending-news-services";
import ScrollBanner from "../components/scroll-banner";
import { NavLink } from "react-router-dom";
import SportNews from "../news/sports-news-page";
import Business from "../news/business-news-page";
import LatestNews from "../news/latest-news-page";
import CultureNews from "../news/culture-news-page";

const Homepage = () => {
    // const [loading, setLoading] = useState(false);
    // const [trendingData, setTrendingData] = useState()


    // let loadTrending = async () => {
    //     try {
    //         setLoading(true)
    //         let response = await TrendingNewsService.getTrending();      
    //         setTrendingData(response.data.articles);
    //         // console.log(response)
    //     } catch (exception) {
    //         throw exception;
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    // useEffect(() => {
    //     loadTrending()
    // }, []);

    return(<>
        <ScrollBanner />

        <Container className="my-2" fluid>
            

            
            {/* <Row>
                <Row>
                    <NavLink style={{textDecoration: "none"}}>
                        <Title $primary className="">Latest</Title>
                    </NavLink>
                </Row>
                {
                    loading ?
                    <>
                    <Row className="text-center p-1"> 
                        <Col> <Code /> </Col>
                    </Row>
                    </> :
                    // <>
                    trendingData && trendingData.map((trend, i) => (
                        <Col sm={12} md={3} key={i}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="holder.js/100px180" alt="image" />
                                <Card.Body key={i}>
                                    <Card.Title> {trend.articlesName} </Card.Title >
                                    <Card.Text> {trend.articlesShortDescription}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>                    
                    ))
                }
            </Row> */}

            <Row>
                <Row>
                    <NavLink to="latest" style={{textDecoration: "none"}}>
                        <Title $primary>Latest</Title>
                    </NavLink>
                </Row>
                <Row style={{justifyContent: "space-around"}}>
                    <LatestNews /> 
                </Row>
            </Row>

            <Row>
                <Row>
                    <NavLink to="business" style={{textDecoration: "none"}}>
                        <Title $primary>Business</Title>
                    </NavLink>
                </Row>
                <Row>
                    {/* <AllNews /> */}
                    <Business />
                </Row>
            
            </Row>

            {/* <Row>
                <NavLink to="categories" className="sc-gEvDqW kQFaen" style={{textDecoration: "none"}}>
                    <Title $primary>Categories</Title>
                </NavLink>
                <Col md={8}>
                    <Card>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row> */}

            <Row style={{textAlign: 'center'}} className="my-4">  
                <Col>
                    <Image src="https://assets-cdn.kathmandupost.com/uploads/source/ads/bergerflexobanner970120-1715686430.gif" fluid></Image>
                </Col>
            </Row>

                            {/* secction break international bbcnews */}
            <Row>
                <Row>
                    <NavLink to="culture" style={{textDecoration: "none"}}>
                        <Title $primary>Culture</Title>
                    </NavLink>
                </Row>
                <Row style={{justifyContent: "space-around"}}>
                    <CultureNews /> 
                </Row>
            </Row>

            <Row style={{textAlign: 'center'}} className="my-2">  
                <Col>
                    <Image src="https://npcdn.ratopati.com/media/promo/1140x90-(4)_8KcTdzl3o0.gif" fluid></Image>
                </Col>
            </Row>
            
            {/* break Sports */}
            <Row>
                <Row>
                    <NavLink to="sports" style={{textDecoration: "none"}}>
                        <Title $primary>Sports</Title>
                    </NavLink>
                </Row>
                <Row style={{justifyContent: "space-around"}}>
                <Col sm={{span: 9}}>
                    <SportNews />
                </Col>

                <Col sm={12} md={{span: 3}} className="d-none d-md-block float-end">
                    {/* <Card>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                        </Card.Body>
                    </Card> */}
                    <Image src="https://npcdn.ratopati.com/media/promo/arju-rice-ad-(263-x-200-px)_kM4xEbEDKi.gif" fluid className="mb-2"/>
                    <Image src="https://npcdn.ratopati.com/media/promo/300px-x-150px_0iReM1uY1L.gif" fluid />
                </Col>
                </Row>
            </Row>
        </Container>
    </>)
}

export default Homepage;