import { Container, Row, Col, Form } from "react-bootstrap"
import { BeatLoader } from "react-spinners"
import { CustomButton } from "../../../../components/button-component"
import { MdOutlineCancel } from "react-icons/md"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import axios from "axios"
import { toast } from "react-toastify"

const UserEdit = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const editSchema = Yup.object({
        name: Yup.string().required(),
        job: Yup.string().required()
    });

    const { register, handleSubmit, formState: {errors}, setValue} = useForm({
        resolver: yupResolver(editSchema)
    });

    const onSubmit = async(data) => {
        try {
            setLoading(true)
            let updatedata = await axios.patch(
                'https://reqres.in/api/users/2', data,
                {
                    Headers: {
                        'Content-Type': 'application/json',
						'Accept': 'application/json'
                    }
                }
            )
            toast.success("edited successfully")
            navigate("/admin/user")
            // console.log(updatedata)
        } catch(exception) {
            throw exception;
        } finally {
            setLoading(false)
        }
    }

    let loadData = async (page=1) => {
        try {
            let response = await axios.get(
                'https://reqres.in/api/users?page='+page,
				{auth: true},
                {
                    Headers: {
                        'Content-Type': 'application/json',
						'Accept': 'application/json'
                    }
                }
            )
            setValue("name", response.data.data.first_name)
			console.log(response)
        }
        catch (exception) {
            toast.error("user does not exists")
            throw exception;
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return(<>
         <Container className="my-2 py-3" style={{backgroundColor: "#E5E8E8"}} fluid>
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

                        <CustomButton type="submit" $green>Update</CustomButton>
                        <CustomButton type="reset" $primary className="ms-3">
                            <MdOutlineCancel className="me-1"/>Reset
                        </CustomButton>
                    </Form>
                </Col>
                </Row>
                </>
            }
        </Container>
    </>)
}

export default UserEdit;