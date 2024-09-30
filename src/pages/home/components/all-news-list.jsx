import axios from "axios";
import { useCallback, useEffect, useState } from "react"
import { Container, Row, Col, Card, Badge } from "react-bootstrap"
import { Code } from "react-content-loader"
import { Title } from "../../../components/heading-component";
import { NavLink } from "react-router-dom";
import "./all-news-style.css"

const AllNews = () => {
    const [loading, setLoading] = useState(false);
    const [newsData, setNewsData] = useState();

    const getAllNews = useCallback(async() => {
        try{
            setLoading(true);
            let response = await axios.get(
                // 'https://Business-News-Daily.proxy-production.allthingsdev.co/api/news',
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'x-apihub-key': 'ObSckrZXZDqS2Kf4GXeng78RY8TgD7misFvX2VpHNB1gPT93GO', 
                        'x-apihub-host': 'Business-News-Daily.allthingsdev.co', 
                        'x-apihub-endpoint': '2a95520f-14a3-47ec-a91d-3449d76b9016'
                    }
                }
            )
            console.log(response)
            setNewsData(response.data)
        } catch(exception) {
            throw exception;
        } finally {
            setLoading(false)
        }
    })

    useEffect(() => {
        getAllNews();
    }, [])
    return(<>
        <Container className="my-2" fluid>
            <Row>
            <NavLink to={"/news"} className="text-black" > <Title className="title" $primary>Home</Title> </NavLink>
                {
                    loading ?
                    <>
                    <Row className="text-center p-1"> 
                        <Col> <Code/> </Col>
                    </Row>
                    </> : <>
                        {
                            newsData && newsData.slice(1, 20).map((news, i) => (
                                <Col key={i}>
                                    <Card style={{ width: '18rem' }} className="mb-2">
                                        <Badge bg="light"> {news?.date} </Badge>
                                        <Card.Img variant="top" src={news.headlineImage} alt="image">
                                            
                                        </Card.Img> 
                                        <Card.Body>
                                            <Card.Title> {news.headLine.substr(0, 40)+"..."} </Card.Title >
                                            <Card.Text> {news.subHeadline.substr(0, 45)+"..."}</Card.Text>
                                            <Card.Text> <NavLink> {news.newsLink.substr(0,30)+"..."} </NavLink></Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                
                                // <Col>
                                //     <Row>

                                //     </Row>
                                // </Col>
                            ))
                        }

                        {
                            newsData && newsData.slice(20, 22).map((news, i) => (
                                <Col md={4} key={i}>
                                    <Card style={{ width: '18rem' }} className="mb-2">
                                        <Badge bg="light"> {news?.date} </Badge>
                                        <Card.Img variant="top" src={news.headlineImage} alt="image">
                                            
                                        </Card.Img> 
                                        <Card.Body>
                                            <Card.Title> {news.headLine.substr(0, 40)+"..."} </Card.Title >
                                            <Card.Text> {news.subHeadline.substr(0, 45)+"..."}</Card.Text>
                                            <Card.Text> <NavLink> {news.newsLink.substr(0,30)+"..."} </NavLink></Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        }
                    </>
                }
            </Row>
        </Container>
    </>)
}

export default AllNews;