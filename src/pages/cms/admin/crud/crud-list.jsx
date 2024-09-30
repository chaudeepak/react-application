import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Image, Table, PageItem, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import Swal from 'sweetalert2';
import { toast } from "react-toastify";
import { Title } from "../../../../components/heading-component";
import { FaPlus } from "react-icons/fa";
import ReactPaginate from "react-paginate";



const CrudList = () => {
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(false)

    let loadData = async () => {
        try {
            setLoading(true)
            let response = await axios.get(
				'https://api.restful-api.dev/objects',
                {
                    Headers: {
                        'Content-Type': 'application/json',
						'Accept': 'application/json',
                    }
                }
            )
			console.log(response)
			setUserData(response.data)
        }
        catch (exception) {
            throw exception;
        }
        finally{
            setLoading(false)
        }
    }

	const handleDelete = (id) => {
		Swal.fire({
			title: "Delete the product?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Delete"
		}).then(async (result) => {
			if (result.isConfirmed) {
				setLoading(true)
				try{
					let response = await axios.delete(
						'https://api.restful-api.dev/objects/'+id,
						{auth: true},
						{
							Headers: {
								'Content-Type': 'application/json'
							}
						}
					)
					if(response){
						// toast.success("successfully deleted");
						Swal.fire({
							title: "Deleted!",
							text: "User deleted.",
							icon: "success"
						});
						loadData()
					}
					console.log(response)
				} catch(exception) {
					throw exception
				} finally {
					setLoading(false)
				}
			}
		  });
	}

	useEffect(() => {
		loadData()
	}, [])

    return (<>
	<Container className="my-2">
		<Row>
			<Col>
				<Title>Basic CRUD</Title>
			</Col>
			<Col>
				<NavLink to="/admin/crud/create" className="btn btn-sm btn-success float-end me-1">
					Create User<FaPlus />
				</NavLink>
			</Col>
		</Row>
	</Container>

	<Table striped bordered hover responsive>
		<thead>
			<tr>
				<th>ID</th>
				<th>Name</th>
				{/* <th>Color</th> */}
				<th>Action</th>
			</tr>
		</thead>
      	<tbody>
			{
				loading? <tr><td colSpan={3}><BeatLoader loading={true} /></td></tr> : (
					userData && userData.map((row, index) => (
						<tr key={index}>
							<td>{row.id}</td>
							<td>{row.name}</td>
							{/* <td>{toString(row.data.data)}</td> */}
							<td>
								<NavLink to={"/admin/crud/"+row.id} className="me-2" >
									<FaPencil />
								</NavLink>
								<NavLink onClick={
									(e) => {e.preventDefault();
										handleDelete(row)
									}}
									to={"/admin/crud/"+row.id} style={{color: "red"}}
                                    >
									<FaTrashCan />
								</NavLink>
							</td>
						</tr>
					))
				)
			}
      </tbody>
    </Table>
	
    </>)
}

export default CrudList;