import { yupResolver } from "@hookform/resolvers/yup";
import { Col, Container, Form, Row } from "react-bootstrap";
import { MdOutlineCancel } from "react-icons/md";
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { CustomButton } from "../../../../components/button-component";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";

const UserCreate = () => {
    const userSchema = Yup.object({
        name: Yup.string().required(),
        job: Yup.string().required()
    })

    const { register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(userSchema)
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async(data) => {
        try{
            setLoading(true)
            let response = await axios.post(
                'https://reqres.in/api/users', data,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            console.log(response)
            toast.success("created successfully")
            navigate("/admin/user")
        } catch(exception) {
            throw exception;
        } finally {
            setLoading(false)
        }
    }

    return(<>
        <Container className="my-2" style={{backgroundColor: "#E5E8E8"}} fluid>
            {
                loading ? <>
                    <Row className="text-center p-1"> 
                    <Col><BeatLoader loading={loading} color="#1aa659"/></Col>
                    </Row>
                </> : <>
                <Row>
                <Col md={{span: 4, offset: 4}}>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name"
                                {...register("name")}
                            />
                            <span className="text-danger">
                                {errors.name && errors.name?.message}
                            </span>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Job</Form.Label>
                            <Form.Control type="text" placeholder="Job"
                                {...register("job")}
                            />
                            <span className="text-danger">
                                {errors.job && errors.job?.message}
                            </span>
                        </Form.Group>

                        <CustomButton type="submit" $green>Create</CustomButton>
                        <CustomButton type="reset" $primary className="ms-3">
                            <MdOutlineCancel className="me-1"/>Reset
                        </CustomButton>
                    </Form>
                </Col>
            </Row>
                </>
            }
            {/* <Row>
                <Col md={{span: 4, offset: 4}}>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name"
                                {...register("name")}
                            />
                            <span className="text-danger">
                                {errors.name && errors.name?.message}
                            </span>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Job</Form.Label>
                            <Form.Control type="text" placeholder="Name"
                                {...register("job")}
                            />
                            <span className="text-danger">
                                {errors.job && errors.job?.message}
                            </span>
                        </Form.Group>

                        <CustomButton type="submit" $green>Create</CustomButton>
                        <CustomButton type="reset" $primary className="ms-3">
                            <MdOutlineCancel className="me-1"/>Reset
                        </CustomButton>
                    </Form>
                </Col>
            </Row> */}
        </Container>
    </>)
}

export default UserCreate;