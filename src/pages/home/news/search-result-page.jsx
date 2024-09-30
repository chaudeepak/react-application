import { useCallback, useEffect, useState } from "react";
import { Col, Container, Row, Card, Badge } from "react-bootstrap";
import { NavLink, useSearchParams } from "react-router-dom";
import searchService from "../../../services/search-service";
import axios from "axios";
import { BeatLoader } from "react-spinners";

const SearchPage = () => {
    const [query, setQuery] = useSearchParams();
    const [newsList, setNewsList] = useState();
    const [loading, setLoading] = useState(false);

    const loadSearchList = useCallback(async() => {
        try{
            setLoading(true)
            let response = await axios.get(
                'https://news-api14.p.rapidapi.com/v2/search/articles',
                {
                    params: {
                        query: query.get('search'),
                        language: 'en'
                      },
                      headers: {
                        'x-rapidapi-key': '625a255072msh290aaa1f9e90940p15dbadjsn4cf54e2c7307',
                        'x-rapidapi-host': 'news-api14.p.rapidapi.com'
                      }
                }
            )
            setNewsList(response.data.data)
            console.log(response.data.data)
        } catch(exception) {
            throw exception;
        } finally {
            setLoading(false);
        }
    }, [query])

    useEffect(() => {
        loadSearchList();
    }, [query])
    return(<>
        <Container className="bg-light my-3">
        {
            loading ? <>
                <Row className="text-center p-1">
                    <Col>
                        <BeatLoader loading={loading} color="#1aa659" margin={5}/>
                    </Col>
                </Row>
            </> : <>
                <Row>
                    <Col>
                        <h4 className="text-center mb-3">search for: <i>{query.get('search')}</i></h4>
                    </Col>
                </Row>

                <Row>
                    {
                        newsList && newsList.length>0 ? <>
                            {
                                newsList.map((item, i) => (
                                    <Col className="mb-2" sm={12} md={4} key={i}>
                                        <Card>
                                            <Card.Body>
                                                <Card.Img src={item.thumbnail}></Card.Img>
                                                <Card.Title> {item.title.substr(0, 15)+"..."} </Card.Title >
                                                <NavLink to={"/serach/"+item.title.substr(0,10)+"..."} >
                                                    <Card.Text> {item.url.substr(0,65)+"..."}</Card.Text>
                                                </NavLink>
                                                <Badge bg="info" pill="true" className="mt-1">
                                                    {
                                                        item.publisher.name ?? item.publisher.name
                                                    }
                                                </Badge>
                                                <Badge bg="light" pill="true" className="mt-1">
                                                    {
                                                        item.publisher.favicon ?? item.publisher.favicon
                                                    }
                                                </Badge>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))
                            }
                        </> : <>
                            <Col>
                            <h4 className="text-center text-danger">No search results found</h4>
                            </Col>
                        </>
                    }
                </Row>
            </>
        }
            {/* <Row>
                <Col>
                    <h4 className="text-center">search for: <i>{query.get('search')}</i></h4>
                </Col>
            </Row>

            <Row>
                {
                    newsList && newsList.length>0 ? <>
                        {
                            newsList.map((item, i) => (
                                <Col sm={12} md={3} key={i}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title> {item.title} </Card.Title >
                                            <Card.Text> {item.url}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        }
                    </> : <>
                        <Col>
                        <h4 className="text-center text-danger">No search results found</h4>
                        </Col>
                    </>
                }
            </Row> */}
        </Container>
    </>)
}

export default SearchPage;