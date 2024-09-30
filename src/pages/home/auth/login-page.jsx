import { Form, Button, Container, Col, Row } from "react-bootstrap";
import { CustomButton } from "../../../components/button-component";
import { BiLogIn } from "react-icons/bi";
import { MdOutlineCancel } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { Title } from "../../../components/heading-component";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../../../reducers/user-reducer";

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginSchema = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().min(3).required()
    })

    const {register, handleSubmit, formState: { errors }   } = useForm({
        resolver: yupResolver(loginSchema)
    });

    const onSubmit = async (data) => {
        try{
            setLoading(true);
            let response = await axios.post(
                'https://reqres.in/api/login', data,
                {
                    headers: {
                    'Content-Type': 'application/json'
                    }
                }
            )
            console.log(response)
            localStorage.setItem('token', response.data.token);
            dispatch(setLoggedInUser(response.data.token));
            navigate("/admin")
        } catch(exception){
            console.log(exception)
            toast.error(exception.response.data.error);
            navigate("/register")
        // console.log(data);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        let token = localStorage.getItem('token')
        if(token) {
            toast.info("you are already loggedin");
            navigate("/"+token)
        }
    }, [])

    return(<>
        <Container className="my-5" style={{backgroundColor: "#E5E8E8"}} fluid>
            {
                loading?
                <Row className="text-center p-1">
                    <Col>
                        <BeatLoader loading={loading} color="#1aa659" margin={5}/>
                    </Col>
                </Row> :
                <>
                    <Row className="py-3">
                        <Title>Login</Title>
                        <Col md={{span: 4, offset: 4}}>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" 
                                        {...register("email")}
                                    />
                                    <span className="text-danger">
                                        {errors.email && errors.email?.message}
                                    </span>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password"
                                        {...register("password")}
                                    />
                                    <span className="text-danger">
                                        {errors.password && errors.password?.message}
                                    </span>
                                </Form.Group>

                                <CustomButton type="submit" disabled={loading} $green><BiLogIn className="me-1"/> Login</CustomButton>
                                <CustomButton type="reset" $primary className="ms-3"><MdOutlineCancel className="me-1"/>Reset</CustomButton>
                            </Form>
                        </Col>
                    </Row>

            <Row>
                <Col className="my-3" md={{offset: 4, span: 4}}>
                    <Link to="/register" style={{textDecoration: "none"}} className="me-3">Register Now</Link>
                    <Link to="/resetpw" style={{textDecoration: "none"}}>Forgot Password?</Link>
                </Col>
            </Row>
                </>
            }
        </Container>
    </>)
}

export default LoginPage;