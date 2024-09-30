import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { BeatLoader } from "react-spinners";
import newsServices from "../../../services/news-services";

const Categories = () => {
    const [category, setCategory] = useState({});
    const [loading, setLoading] = useState(false)

    const loadCategory = async() => {
        try{
            setLoading(true)
            let response = await newsServices.getNews()
            setCategory(Object.keys(response.data))
            // console.log(response.data)
            // console.log(typeof(response.data))
        } catch(exception) {
            throw exception;
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadCategory()
    }, [])

    // console.log(Object.keys(category))
    return(<>
        <Container className="bg-light my-3 p-2">
            <Row className="mb-2">
                <Col>
                    <h4 className="text-center">Categories</h4>
                </Col>
            </Row>
            <hr />

            <Row>
                {
                    loading ? (<>
                        <Col className="text-center">
                            <BeatLoader loading={loading} ></BeatLoader>
                        </Col>
                        </>) : (<>
                            {
                                category && category.map((data, i) => (
                                    <Col sm={3} key={i} className="mb-2 p-2">
                                        <h1>title {i}</h1>
                                    <Card style={{ width: 'auto' }}>
                                        <Card.Body>
                                            <NavLink to={"/category/"+data} className="card-title h5"> {data?? data} </NavLink>
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

export default Categories;