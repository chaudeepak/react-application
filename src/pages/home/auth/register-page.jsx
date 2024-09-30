import { Container, Row, Col, Form } from "react-bootstrap";
import { CustomButton } from "../../../components/button-component";
import { MdOutlineCancel } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { Title } from "../../../components/heading-component";

import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";

const RegisterPage = () => {
    const registerSchema = Yup.object({
        email: Yup.string().email().required(),
        name: Yup.string(),
        phone: Yup.number(), 
        role: Yup.string().matches(/reader|publisher/),
        password: Yup.string().min(5).required(),
        tandc: Yup.bool().oneOf([true], "please agree with terms and conditions to register").required()
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(registerSchema)
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit =async (data) => {
        try {
            setLoading(true)
            let response = await axios.post(
                'https://reqres.in/api/register', data,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            console.log(response)
            toast.success("registered successfully, please login")
            navigate("/login")
        } catch(exception) {
            toast.error(exception.response.data.error)
            navigate("/")
            throw exception;
        } finally {
            setLoading(false);
        }
        
    }

    useEffect(() => {
        let token = localStorage.getItem('token');
        if(token) {
            toast.info("you are already logged in user")
            navigate('/admin')
        }
    })

    return(<>
        <Container className="my-5" style={{backgroundColor: "#E5E8E8"}} fluid>
            {
                loading ?
                <Row className="text-center p-1"> 
                    <Col><BeatLoader loading={loading} color="#1aa659"/></Col>
                </Row> :
                <>
                    <Row className="py-3">
                        <Title>Register</Title>
                        <Col md={{span: 4, offset: 4}}>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email"
                                        {...register("email")}
                                    />
                                    <span className="text-danger">
                                        {errors.email && errors.email?.message}
                                    </span>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Name" disabled
                                        {...register("name")}
                                    />
                                    <span className="text-danger">
                                        {errors.name && errors.name?.message}
                                    </span>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type="phone" placeholder="Phone" disabled
                                        {...register("phone")}
                                    />
                                    <span className="text-danger">
                                        {errors.phone && errors.phone?.message}
                                    </span>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Select {...register("role")} disabled>
                                        <option>--select--</option>
                                        <option value="reader">reader</option>
                                        <option value="publisher">publisher</option>
                                        
                                    </Form.Select>
                                    <span className="text-danger">
                                        {errors.role && errors.role?.message}
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

                                <Form.Group className="mb-3">
                                    <Form.Check type="checkbox" label="I agree terms & conditions"
                                        {...register("tandc")}
                                    />
                                    <span className="text-danger">
                                        {errors.tandc && errors.tandc?.message}
                                    </span>
                                </Form.Group>

                                <CustomButton type="submit" $green>Register</CustomButton>
                                <CustomButton type="reset" $primary className="ms-3"><MdOutlineCancel className="me-1"/>Reset</CustomButton>
                            </Form>
                        </Col>
                    </Row>

                    <Row>
                    <Col className="my-3" md={{offset: 4, span: 4}}>
                        <span className="me-3">Already Registered?</span>
                        <Link to="/login" style={{textDecoration: "none"}} className="my-5">Login Here</Link>
                    </Col>
                    </Row>
                </>
            }
            
            {/* <Row className="py-3">
                <Title>Register</Title>
                <Col md={{span: 4, offset: 4}}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"
                            {...register("email")}
                        />
                        <span className="text-danger">
                            {errors.email && errors.email?.message}
                        </span>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Name" disabled
                            {...register("name")}
                        />
                        <span className="text-danger">
                            {errors.name && errors.name?.message}
                        </span>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="phone" placeholder="Phone" disabled
                            {...register("phone")}
                        />
                        <span className="text-danger">
                            {errors.phone && errors.phone?.message}
                        </span>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Role</Form.Label>
                        <Form.Select {...register("role")} disabled>
                            <option>--select--</option>
                            <option value="reader">reader</option>
                            <option value="publisher">publisher</option>
                            
                        </Form.Select>
                        <span className="text-danger">
                            {errors.role && errors.role?.message}
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

                    <Form.Group className="mb-3">
                        <Form.Check type="checkbox" label="I agree terms & conditions"
                            {...register("tandc")}
                        />
                        <span className="text-danger">
                            {errors.tandc && errors.tandc?.message}
                        </span>
                    </Form.Group>

                    <CustomButton type="submit" $green>Register</CustomButton>
                    <CustomButton type="reset" $primary className="ms-3"><MdOutlineCancel className="me-1"/>Reset</CustomButton>
                </Form>
                </Col>
            </Row>

            <Row>
                <Col className="my-3" md={{offset: 4, span: 4}}>
                    <span className="me-3">Already Registered?</span>
                    <Link to="/login" style={{textDecoration: "none"}} className="my-5">Login Here</Link>
                </Col>
            </Row> */}
        </Container>
    </>)
}

export default RegisterPage;