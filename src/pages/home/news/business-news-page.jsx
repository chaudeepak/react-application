import { useEffect, useState, useCallback } from "react"
import { Container, Row, Col, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import newsServices from "../../../services/news-services";

const Business = () => {
    const [loading, setLoading] = useState(false);
    const [businessNews, setBusinessNews] = useState()

    const loadBusiness = useCallback(async() => {
        try {
            setLoading(true)
            let response = await newsServices.getNews()
            // let response = await axios.get(
            //     'https://bbc-api2.p.rapidapi.com/news',
            //     {
            //     params: {
            //         lang: 'english'
            //     },
            //     headers: {
            //         'x-rapidapi-key': '625a255072msh290aaa1f9e90940p15dbadjsn4cf54e2c7307',
            //         'x-rapidapi-host': 'bbc-api2.p.rapidapi.com'
            //     }
            // }
            // )
            setBusinessNews(response.data.Business)
            // console.log(response.data.Business)
        } catch(exception) {
            throw exception;
        } finally {
            setLoading(false)
        }
    })

    useEffect(() => {
        loadBusiness()
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
                                businessNews && businessNews.map((data, i) => (
                                    <Col sm={3} key={i} className="mb-2 p-2">
                                    <Card style={{ width: 'auto' }}>
                                        <Card.Img variant="top" src={data?.image_link} />
                                        <Card.Body>
                                            <NavLink className="card-title h5"> {data.title} </NavLink>
                                            
                                            <Card.Text>Summary: {data.summary}</Card.Text>
                                            <Card.Text> <NavLink target="_blank"> {data.news_link.substr(0,30)+"..."} </NavLink></Card.Text>
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

export default Business;