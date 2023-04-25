import React, {useState, useEffect } from 'react';

function ListCustomers() {
    const [customers, setCustomers] = useState([])

    const getData = async () => {
        const response = await fetch('http://localhost:8090/api/customers/');
        if (response.ok) {
            const data = await response.json();
            setCustomers(data.customers)
        }
    }

    useEffect(()=> {
        getData()
    }, [])

    const handleDelete = async (customer) => {
        try {
            const response = await fetch(`http://localhost:8090/api/customers/${customer.id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                const updatedCustomers = customers.filter((c) => c.id !== customer.id);
                setCustomers(updatedCustomers);
            } else {
                throw new Error(`Failed to delete customer ${customer.id}`);
            }
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody>
                {customers.map(customer => {
                    return (
                        <tr key={customer.href}>
                            <td>{ customer.first_name }</td>
                            <td>{ customer.last_name }</td>
                            <td>{ customer.phone_number }</td>
                            <td>{ customer.address }</td>
                            <td>
                                <button onClick={() => handleDelete(customer)}>Delete</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        <a href="/customers/new">Add new customer</a>
        </>
    );
}

export default ListCustomers;
