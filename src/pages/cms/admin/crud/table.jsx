import axios from 'axios';
import { useEffect, useState } from 'react';
import { Cell, Column, HeaderCell, Table } from 'rsuite-table';
import 'rsuite-table/dist/css/rsuite-table.css';

const TableComponent = () => {
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(false);

    const loadData = async() => {
        try{
            setLoading(true);
            let response = await axios.get(
                'https://reqres.in/api/users',
                {
                    headers: {
                        'Accept': 'applicatio/json',
                        'Content-Type': 'application/json'
                    }
                }
            )
            console.log(response)
            setUserData(response.data.data)
        } catch(exception) {
            throw exception;
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadData();
    }, [])

    // console.log([userData])

    return(<>
            <Table data={userData} autoHeight hover loading={loading} onSortColumn={(dataKey, sortType) => {
                dataKey = first_name;
                sortType=asc;
            }}>
                <Column sortable resizable>
                    <HeaderCell>ID</HeaderCell>
                    <Cell dataKey="id" />
                </Column>

                <Column sortable="true" resizable>
                    <HeaderCell>Email</HeaderCell>
                    <Cell dataKey="email" />
                </Column>

                <Column sortable resizable>
                    <HeaderCell>First Name</HeaderCell>
                    <Cell dataKey="first_name" />
                </Column>
            </Table>
    </>)
}

export default TableComponent;