import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Image, Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import Swal from 'sweetalert2';
import { Title } from "../../../../components/heading-component";
import { FaPlus } from "react-icons/fa";
import ReactPaginate from "react-paginate";



const UserList = () => {
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(false)

	const [pageCount, setPageCount] = useState(0);

    let loadData = async (currentPage) => {
        try {
            setLoading(true)
            let response = await axios.get(
                `https://reqres.in/api/users?page=+${currentPage}`,
				{auth: true},
                {
                    Headers: {
                        'Content-Type': 'application/json',
						'Accept': 'application/json'
                    }
                }
            )
			// console.log(response)
			setUserData(response.data.data)
			let total = response.data.total;
			let perpage = response.data.per_page;
			setPageCount(Math.ceil(total/perpage))
        }
        catch (exception) {
            throw exception;
        }
        finally{
            setLoading(false)
        }
    }

	const handlePageClick = (data) => {
		console.log(data)
		let currentPage = data.selected + 1;
		console.log(currentPage)
		loadData(currentPage)
	}

	const handleDelete = (id) => {
		Swal.fire({
			title: "Delete the user?",
			// text: "",
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
						'https://reqres.in/api/users/'+id,
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
				<Title>User Manage</Title>
			</Col>
			<Col>
				<NavLink to="/admin/user/create" className="btn btn-sm btn-success float-end me-1">
					Create User<FaPlus />
				</NavLink>
			</Col>
		</Row>
	</Container>

	<Table striped bordered hover responsive>
		<thead>
			<tr>
				<th>ID</th>
				<th>Email</th>
				<th>First Name</th>
				<th>Last Name</th>
				<th>Profile</th>
				<th>Action</th>
			</tr>
		</thead>
      	<tbody>
			{
				loading? <><tr><td colSpan={6}><BeatLoader loading={loading}/></td></tr></>  : (
					userData && userData.map((row, index) => (
						<tr key={index}>
							<td>{row.id}</td>
							<td>{row.email}</td>
							<td>{row.first_name}</td>
							<td>{row.last_name}</td>
							<td><Image src={row.avatar} alt="avatar" style={{height: '80px'}}/></td>
							<td>
								<NavLink to={"/admin/user/"+row.id} className="me-2" 
									// onClick={(e) => {e.preventDefault()}}
								>
									<FaPencil />
								</NavLink>
								<NavLink onClick={
									(e) => {e.preventDefault();
										handleDelete(row.id)
									}}
									to={"/admin/user"+row.id} style={{color: "red"}}>
									<FaTrashCan />
								</NavLink>
							</td>
						</tr>
					))
				)
			}
      </tbody>
    </Table>
	
	<Container>
		{/* <Row> 
			<Col>
			<Pagination style={{justifyContent: 'center'}}>
      			<Pagination.Prev />
				{
					
				}
      			<Pagination.Item>{1}</Pagination.Item>
				<Pagination.Item>{2}</Pagination.Item>
      			<Pagination.Ellipsis />

				<Pagination.Item>{20}</Pagination.Item>
				<Pagination.Next  />
    			</Pagination>
			</Col>
		</Row> */}
		<Row>
			<Col>
			<ReactPaginate
        		breakLabel="..."
        		nextLabel=">>"
        		onPageChange={handlePageClick}
        		pageRangeDisplayed={2}
        		pageCount={pageCount}
        		previousLabel="<<"
				breakClassName="page-item"
				breakLinkClassName="page-link"
				nextClassName="page-item"
				nextLinkClassName="page-link"
				previousClassName="page-item"
				previousLinkClassName="page-link"
				pageClassName="page-item"
				pageLinkClassName="page-link"
				activeClassName="active"
				containerClassName="pagination justify-content-center"
        	// renderOnZeroPageCount={null}
      		/>
			</Col>	
		</Row>
	</Container>
    </>) 
}

export default UserList;