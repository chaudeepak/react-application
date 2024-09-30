import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import newsServices from "../../../services/news-services";

const CultureNews = () => {
    const [loading, setLoading] = useState(false);
    const [dataBbc, setDataBbc] = useState()

    const loadNews = useCallback(async() => {
        try {
            setLoading(true)
            let response = await newsServices.getNews()
            setDataBbc(response.data.Culture)
        } catch(exception) {
            throw exception;
        } finally {
            setLoading(false)
        }
    })

    useEffect(() => {
        loadNews()
    }, [])

    return(<>
        <Container className="bg-light my-3 p-2">
            <Row>
                {
                    loading ? (<>
                        <Col className="text-center">
                            <BeatLoader loading={loading} ></BeatLoader>
                        </Col>
                        </>) : (<>
                            {
                                dataBbc && dataBbc.map((data, i) => (
                                    <Col sm={3} key={i} className="mb-2 p-2">
                                    <Card style={{ width: 'auto' }}>
                                        <Card.Img variant="top" src={data.image_link} alt="thumbnail not available" />
                                        <Card.Body>
                                            <NavLink className="card-title h5"> {data.title} </NavLink>
                                            <Card.Text>Summary: {data.summary}</Card.Text>
                                            <Card.Text> <a target="_blank"> {data.news_link.substr(0,30)+"..."} </a></Card.Text>
                                        </Card.Body>
                                    </Card>
                                    </Col>
                                ))
                            }
                    </>)
                }
            </Row>
        </Container>
    </>)
}

export default CultureNews;