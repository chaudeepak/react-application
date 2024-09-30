import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const CountryNews = () => {
    const [loading, setLoading] = useState(false);
    const [cultures, setCultures] = useState();

    const loadCountryNews = useCallback(async() => {
        try {
            setLoading(true)
            let response = await axios.get(
                'https://bbc-api2.p.rapidapi.com/news',
                {
                params: {
                    lang: 'english'
                },
                headers: {
                    'x-rapidapi-key': '625a255072msh290aaa1f9e90940p15dbadjsn4cf54e2c7307',
                    'x-rapidapi-host': 'bbc-api2.p.rapidapi.com'
                }
            }
            )
            setCultures(response.data.Culture)
            console.log(response.data.Culture)
            console.log(cultures)
        } catch(exception) {
            throw exception;
        } finally {
            setLoading(false)
        }
    })

    useEffect(() => {
        loadCountryNews();
    }, [])

    return(<>
        <Container className="bg-light my-3 p-2">
            <Row>
                {
                    loading ? (<>
                        <Row className="text-center p-1"> 
                            <Col> <BeatLoader loading={false}/> </Col>
                        </Row>
                    </>) : (<>
                        {
                            cultures && cultures.slice(3, 23).map((data, i) => {
                                <Col sm={3} key={i} className="mb-2 p-2">
                                    <Card style={{ width: 'auto' }}>
                                        <Card.Img variant="top" src={data.image_link} alt="news image not available" />
                                        <Card.Body>
                                            <Card.Title> {data.title} </Card.Title >
                                            <Card.Text>Summary: {data.summary}</Card.Text>
                                            <Card.Link> <NavLink> {data?.news_link.substr(0,30)+"..."} </NavLink></Card.Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            })
                        }
                    </>)
                }
            </Row>
        </Container>
    </>)
}

export default CountryNews;