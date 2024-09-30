import { Card, Container, Breadcrumb, ProgressBar } from "react-bootstrap"
import { FaRegCopyright } from "react-icons/fa";
import { useEffect, useState } from "react"
import axios from "axios";

const AdminDashboard = () => {
    const [loading, setLoading] = useState(false);
    const [totalUser, setTotalUser] = useState();
    const [totalPosts, setTotalPosts] = useState();

    const loadData = async () => {
        try {
            setLoading(true)
            let response = await axios.get(
                `https://reqres.in/api/users`,
                {
                    Headers: {
                        'Content-Type': 'application/json',
						'Accept': 'application/json'
                    }
                }
            )
            setTotalUser(((response.data.total)/userLimit)*100)
        }
        catch (exception) {
            throw exception;
        }
        finally{
            setLoading(false)
        }
    }

    const loadPosts = async () => {
        try {
            setLoading(true)
            let response = await axios.get(
                'https://gorest.co.in/public/v2/posts',
                {
                    Headers: {
                        'Content-Type': 'application/json',
						'Accept': 'application/json'
                    }
                }
            )
			let totalPosts = response.headers.get('x-pagination-total');
            setTotalPosts((totalPosts/postsLimit)*100);
        }
        catch (exception) {
            throw exception;
        }
        finally{
            setLoading(false)
        }
    }

    const userLimit = 100;
    const postsLimit = 5000;

    useEffect(() => {
        loadData();
        loadPosts();
    }, [])

    return(<>
        <Container className="px-4" fluid>

            <Breadcrumb>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>

                {/* <Breadcrumb.Item active>Data</Breadcrumb.Item> */}
            </Breadcrumb>

            <Card className="mb-4">
                <Card.Body>
                    <Card.Title>
                        <h4 className="mb-6 p-3 text-center"><code>Admin</code> Dashboard Overview</h4>
                    </Card.Title>
                </Card.Body>

                <Card.Body>
                    <Card.Subtitle className="text-bold mb-3">User Overview</Card.Subtitle>
                    <ProgressBar now={totalUser} label={`Total Users: ${totalUser}%`} variant="success" />
                </Card.Body>

                <Card.Body>
                    <Card.Subtitle className="text-bold mb-3">Posts Overview</Card.Subtitle>
                    <ProgressBar now={totalPosts} label={`Total Posts: ${totalPosts}%`} variant="success" />
                </Card.Body>
            </Card>

            <Container as={"div"} style={{height: "100vh"}}>

            </Container>

            <Card className="mb-4">
                <Card.Body>
                    <Card.Footer className="text-center"><FaRegCopyright /> Copyright News.com 2024</Card.Footer>
                </Card.Body>
            </Card>
        </Container>
    </>)
}

export default AdminDashboard;