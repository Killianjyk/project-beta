import React, {useState, useEffect } from 'react';

function ListAutomobiles() {
    const [autos, setAutomobiles] = useState([])

    const getData = async () => {
        const response = await fetch('http://localhost:8100/api/automobiles/');
        if (response.ok) {
            const data = await response.json();
            setAutomobiles(data.autos)
        }
    }

    const [salesList, setSalesList] = useState([])
    const getSalesList = async () => {
        const url = 'http://localhost:8090/api/sales';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setSalesList(data.sales)
        }
    }

    useEffect(()=> {
        getData();
        getSalesList();
    }, []);

    // const handleDelete = async (customer) => {
    //     try {
    //         const response = await fetch(`http://localhost:8090/api/customers/${customer.id}`, {
    //             method: 'DELETE',
    //         });
    //         if (response.ok) {
    //             const updatedCustomers = customers.filter((c) => c.id !== customer.id);
    //             setCustomers(updatedCustomers);
    //         } else {
    //             throw new Error(`Failed to delete customer ${customer.id}`);
    //         }
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };
    const soldlist = [];
    for (let soldprop of salesList) {
        soldlist.push(soldprop["automobile"]["sold"])
    }
    console.log(soldlist);

    return (
        <>
        <div className="container">
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Color</th>
                    <th>Year</th>
                    <th>Model</th>
                    <th>Manufacturer</th>
                    <th>Sold</th>
                </tr>
            </thead>
            <tbody>
                {autos.map((automobile, index) => {
                    return (
                        <tr key={automobile.id}>
                            <td>{ automobile.vin }</td>
                            <td>{ automobile.color }</td>
                            <td>{ automobile.year }</td>
                            <td>{ automobile.model.name }</td>
                            <td>{ automobile.model.manufacturer.name }</td>
                            <td>{ soldlist[index] ? "Yes" : "No" }</td>
                            {/* <td>{ automobile.sold }</td> */}
                            {/* <td>
                                <button onClick={() => handleDelete(customer)}>Delete</button>
                            </td> */}
                        </tr>
                    );
                },
                )}
            </tbody>
        </table>
        <a href="/automobiles/new">Add an automobile</a>
        </div>
        </>
    );
}

export default ListAutomobiles;
