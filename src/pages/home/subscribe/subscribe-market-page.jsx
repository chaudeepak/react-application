import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const Subscribe = () => {
    const [loading, setLoading] = useState(false);
    const [productList, setProductList] = useState();

    // const loadProduct = async() => {
    //     try {
    //         setLoading(true)
    //         let response = await axios.get(
    //             // 'https://amazon-online-data-api.p.rapidapi.com/search',
    //             {
    //             params: {
    //                 sort_by: 'REVIEWS',
    //                 geo: 'UK',
    //                 query: 'crocs',
    //                 page: '1'
    //             },
    //             headers: {
    //                 'x-rapidapi-key': '625a255072msh290aaa1f9e90940p15dbadjsn4cf54e2c7307',
    //                 'x-rapidapi-host': 'amazon-online-data-api.p.rapidapi.com'
    //             }
    //             }
    //         )
    //         // setProductList(response.data.products)
    //         // console.log(response.data.products)
    //     } catch(exception) {
    //         throw exception;
    //     } finally {
    //         setLoading(false)
    //     }
    // } 

    const loadItems = useCallback(async() => {
        try{
            setLoading(true)
            let response = await axios.get(
                'https://real-time-product-search.p.rapidapi.com/search',
                {
                    params: {
                        q: 'books',
                        country: 'us',
                        language: 'en',
                        page: '1',
                        limit: '10',
                        sort_by: 'BEST_MATCH',
                        product_condition: 'ANY',
                        min_rating: 'ANY'
                      },
                      headers: {
                        'x-rapidapi-key': '625a255072msh290aaa1f9e90940p15dbadjsn4cf54e2c7307',
                        'x-rapidapi-host': 'real-time-product-search.p.rapidapi.com'
                      }
                }
            )
            // console.log(response.data.data.products)
            setProductList(response.data.data.products)
        } catch(exception){
            throw exception
        } finally{
            setLoading(false)
        }
    })

    useEffect(() =>{
        // loadProduct()
        loadItems()
    }, [])

    return(<>
        <Container className="bg-light my-3 p-2">
            <Row className="mb-2">
                <Col className="text-center">
                    <h4>Subscribe Our Publications</h4>
                </Col>
            </Row>
            <hr/>

            <Row className="mb-2">
                {
                    loading ? (<>
                        <Col className="text-center p-1">
                            <BeatLoader loading={loading} color="#1AA659"/>
                        </Col>
                    </>) : (<>
                        {
                            productList && productList.map((data, i) => (
                                <Col sm={3} key={i} className="mb-2">
                                    <Card style={{ width: 'auto' }} className="p-2">
                                        <Card.Img variant="top" src={data?.product_photos[0]} alt="image" />
                                        <Card.Body>
                                            <NavLink to={"/subscribe/"+data.product_id} className="card-title h5"> {data.product_title} </NavLink>
                                            <Card.Text>Price: {data?.typical_price_range}</Card.Text>
                                            <Card.Text> <NavLink> {data?.product_page_url} </NavLink></Card.Text>
                                            <Badge bg="secondary">Rating: {data?.product_rating} </Badge>
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

export default Subscribe;