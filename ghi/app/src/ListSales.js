import React, {useState, useEffect } from 'react';

function ListSales() {

    const [sales, setSales] = useState([])

    const getData = async () => {
        const response = await fetch('http://localhost:8090/api/sales/');
        if (response.ok) {
            const data = await response.json();
            setSales(data.sales)
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
                    <th>Employee Name</th>
                    <th>Customer</th>
                    <th>Vin</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {sales.map(sale => {
                    return (
                        <tr key={sale.id}>
                            <td>{ sale.salesperson.employee_id }</td>
                            <td>{ `${sale.salesperson.first_name} ${sale.salesperson.last_name}` }</td>
                            <td>{ `${sale.customer.first_name} ${sale.customer.last_name}` }</td>
                            <td>{ sale.automobile.vin }</td>
                            <td>{ sale.price }</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        <a href="/sales/new">Add new sale</a>
        </>
    );
}

export default ListSales;
