import { Container, Row, Col, Form } from "react-bootstrap"
import { CustomButton } from "../../../components/button-component";
import { BiLogIn } from "react-icons/bi";
import { MdOutlineCancel } from "react-icons/md";
import { useState } from "react"
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { BeatLoader } from "react-spinners";
import { Title } from "../../../components/heading-component";
import { yupResolver } from "@hookform/resolvers/yup";

const FileValidation = () => {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);

    const MAX_FILE_SIZE = 102400; //100KB
    const validFileExtensions = { file: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };
    function isValidFileType(fileName, fileType) {
        return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
      }

    const formSchema = Yup.object({
        email: Yup.string().email().required(),
        file: Yup
        .mixed()
        .required("Required")
        .test("is-valid-type", "Not a valid image type",
          value => isValidFileType(value && value.name.toLowerCase(), "file"))
        .test("is-valid-size", "Max allowed size is 100KB",
          value => value && value.size <= MAX_FILE_SIZE)
    })

    const { register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(formSchema)
    });

    const onSubmit = (data) => {
        console.log(data)
    }

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
                        <Title>File Handeling</Title>
                        <Col md={{span: 4, offset: 4}}>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                {/* <Form.Group className="mb-3">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" 
                                        {...register("email")}
                                    />
                                    <span className="text-danger">
                                        {errors.email && errors.email?.message}
                                    </span>
                                </Form.Group> */}

                                <Form.Group className="mb-3">
                                    <Form.Label>File</Form.Label>
                                    <Form.Control type="file" placeholder="file"
                                        {...register("file")}
                                    />
                                    <span className="text-danger">
                                        {errors.file && errors.file?.message}
                                    </span>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="email"
                                    {...register("email")}
                                    />
                                    <span className="text-danger">
                                        {errors.email && errors.email?.message}
                                    </span>
                                </Form.Group>

                                <CustomButton type="submit" disabled={loading} $green><BiLogIn className="me-1"/> Login</CustomButton>
                                <CustomButton type="reset" $primary className="ms-3"><MdOutlineCancel className="me-1"/>Reset</CustomButton>
                            </Form>
                        </Col>
                    </Row>

            {/* <Row>
                <Col className="my-3" md={{offset: 4, span: 4}}>
                    <Link to="/register" style={{textDecoration: "none"}} className="me-3">Register Now</Link>
                    <Link to="/resetpw" style={{textDecoration: "none"}}>Forgot Password?</Link>
                </Col>
            </Row> */}
                </>
            }
        </Container>
    </>)
}

export default FileValidation;