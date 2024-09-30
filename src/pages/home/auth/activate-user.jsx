import { Container, Row, Col, Form } from "react-bootstrap"
import { BeatLoader } from "react-spinners"
import { CustomButton } from "../../../components/button-component"

const ActivateUser = () => {
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
                </>
            }
        </Container>
    </>)
}

export default ActivateUser;