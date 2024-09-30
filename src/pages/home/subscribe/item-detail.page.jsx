import { Button, Carousel, CarouselItem, Col, Container, Form, Image, Row } from "react-bootstrap"
import { Rating } from "react-simple-star-rating";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setToCart } from "../../../reducers/cart-reducer";

const DetailPage = () => {
    const [photos, setPhotos] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState(100);
    const [productID, setProductId] = useState();
    const [highlights, setHighlights] = useState()
    const [rating, setRating] = useState();
    let [loading, setLoading] = useState(false);
    // const [detailData, setDetailData] = useState([]);
    let [qty, setQty] = useState(0);
    let [catrError, setCartError] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const params = useParams()
    
    const addToCart = (e) => {
        e.preventDefault()
        if(qty < 0 ) {
            setCartError("Order must be more than 0")

        } else {
            setCartError("")
            let cartItem = {
                productId: productID,
                qty: qty,
                price: price
            }
            dispatch(setToCart(cartItem));
            console.log(cartItem)
            toast.success("cart updated successfully")
            navigate("/cart")
        }
    }

    // const getDetail = useCallback(async() => {
    //     try{
    //         setLoading(true)
    //         let response = await axios.get(
    //             'https://amazon-online-data-api.p.rapidapi.com/product',
    //             {
    //                 params: {
    //                     asins: params.id,
    //                     // asins: 'B0014BYHJE',
    //                     geo: 'UK'
    //                 },
    //                 headers: {
    //                     'x-rapidapi-key': '625a255072msh290aaa1f9e90940p15dbadjsn4cf54e2c7307',
    //                     'x-rapidapi-host': 'amazon-online-data-api.p.rapidapi.com'
    //                 }
    //             }
    //         )
    //         setDetailData(response.data.results)
    //         console.log(response.data.results)
    //     } catch(exception){
    //         throw exception
    //     } finally{
    //         setLoading(false)
    //     }
    // })

    const getDetail = useCallback(async() => {
        try{
            setLoading(true)
            let response = await axios.get(
                'https://real-time-product-search.p.rapidapi.com/product-details',
                {
                    params: {
                        product_id: params.id,
                        country: 'us',
                        language: 'en'
                    },
                    headers: {
                        'x-rapidapi-key': '625a255072msh290aaa1f9e90940p15dbadjsn4cf54e2c7307',
                        'x-rapidapi-host': 'real-time-product-search.p.rapidapi.com'
                    }
                }
            )
            setPhotos(response.data.data.product_photos)
            setTitle(response.data.data.product_title)
            setRating(response.data.data.product_rating)
            setDescription(response.data.data.product_description)
            // setPrice(response.data.data.typical_price_range)
            setProductId(response.data.data.product_id)
            setHighlights(response.data.data.product_highlights)
            // setDetailData(response.data.data)
            // console.log(response.data.data)
        } catch(exception){
            throw exception
        } finally{
            setLoading(false)
        }
    })

    useEffect(() => {
        getDetail()
    }, [])

    return(<>
        <Container className="bg-light my-3 p-2">
            {
                loading ? (<>
                    <Row className="mb-2">
                        <Col className="text-center p-1">
                            <BeatLoader loading={loading} color="#1AA659"/>
                        </Col>
                    </Row>
                </>) : (<>
                            <Row>
                                <Col sm={4}>
                                    <Carousel fade controls={false} touch>
                                        {
                                            photos && photos.map((image, ind) => (
                                                <Carousel.Item key={ind}>
                                                    <Image src={image} fluid />
                                                </Carousel.Item>
                                            ))
                                        }
                                    </Carousel>
                                </Col>

                                <Col sm={5} className="bg-white">
                                    <h2 className="text-center mb-3"> {title?? title} </h2>
                                    <Row className="mb-3">
                                        <Col>
                                            <Rating readonly initialValue={rating?? rating} size={25} allowFraction/>
                                        </Col>
                                    </Row>
                                    <Row className="flex-row mb-3">
                                            <Col sm={3}>
                                                <span className="text-bold">Quantity:</span>
                                            </Col>
                                            <Col sm={5} >
                                            <Form.Control type="number" min={0} size="sm" placeholder="desired quantity"
                                            onChange={(e) => {
                                                if(e.target.value < 0) {
                                                    setCartError("Order must be more than 0")
                                                } else {
                                                    setCartError("")
                                                    setQty(Number(e.target.value))
                                                }
                                            }}
                                            />
                                            <span className="text-danger"> {catrError} </span>
                                            </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        {/* {
                                            price && price.slice(0,1).map((p, i) => (
                                                <p><em>Price: </em> {p} </p>
                                            ))
                                        } */}
                                        <p><em>Price: </em> {price} </p>
                                        <p> <em>Description: </em> {description?? description} </p>
                                    </Row>
                                    <Row>
                                        <Col className="float-end">
                                            <Button size="sm" 
                                            onClick={addToCart} 
                                            style={{width: "fit-content", backgroundColor: "#1AA659", border: "none"}} 
                                            className="float-end">
                                                Add to cart
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col sm={3} className="bg-white">
                                    <h2 className="text-center">Product Details</h2>
                                    <ul>
                                        {
                                            highlights && highlights.map((item, ind) => (
                                                <li key={ind}> {item} </li>
                                            ))
                                        }
                                    </ul>
                                </Col>
                            </Row>
                </>)
            }

        </Container>
    </>)
}

export default DetailPage;