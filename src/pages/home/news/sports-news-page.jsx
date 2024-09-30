import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import Swal from "sweetalert2";
import newsServices from "../../../services/news-services";

const SportNews = () => {
    const [loading, setLoading] = useState(false);
    const [newsData, setNewsData] = useState();
    const loadSportNews = useCallback(async() => {
        try {
            setLoading(true)
            let response = await newsServices.getNews();
            // let response = await axios.get(
            //     'https://bbc-api2.p.rapidapi.com/news',
            //     {
            //         params: {
            //             lang: 'english'
            //         },

            //         headers: {
            //             'x-rapidapi-key': '625a255072msh290aaa1f9e90940p15dbadjsn4cf54e2c7307',
            //             'x-rapidapi-host': 'bbc-api2.p.rapidapi.com'
            //         }
            //     }
            // )
            setNewsData(response.data.Sport)
            // console.log(contentNews)
        } catch(exception) {
            throw exception;
        } finally {
            setLoading(false)
        }
    })

    const handleClick = (e) => {
        e.preventDefault();
        showNews()
    }

    const showNews = (data) => {
        
        Swal.fire({
            title: "Read",
            showCloseButton: true,
        })
    }

    useEffect(() => {
        loadSportNews();
    }, [])

    return(<>
        <Container className="bg-light my-3 p-2">
            <Row className="mb-2">
                {
                    loading ? (<>
                        <Col className="text-center p-1">
                            <BeatLoader loading={loading} color="#1AA659"/>
                        </Col>
                    </>) : (<>
                        {
                            newsData && newsData.map((data, i) => (
                                <Col sm={3} key={i} className="mb-2 p-2">
                                    <Card style={{ width: 'auto' }}>
                                    <Card.Img variant="top" src={data.image_link} alt="thumbnail not available" />
                                        <Card.Body>
                                            <NavLink className="card-title h5"> {data.title} </NavLink>
                                            <Card.Text>Summary: {data.summary}</Card.Text>
                                            <Card.Text> <NavLink> {data.news_link.substr(0,30)+"..."} </NavLink></Card.Text>
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

export default SportNews;