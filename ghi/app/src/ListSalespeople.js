import React, {useState, useEffect } from 'react';

function ListSalespeople() {
    const [salespeople, setSalespeople] = useState([])

    const getData = async () => {
        const response = await fetch('http://localhost:8090/api/salespeople/');
        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salespeople)
        }
    }

    useEffect(()=> {
        getData()
    }, [])



    return (
        <>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                </tr>
            </thead>
            <tbody>
                {salespeople.map(salespeople => {
                    return (
                        <tr key={ salespeople.id }>
                            <td>{ salespeople.employee_id }</td>
                            <td>{ salespeople.first_name }</td>
                            <td>{ salespeople.last_name }</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        <a href="/salespeople/new">Add new salesperson</a>
        </>
    );
}

export default ListSalespeople;
