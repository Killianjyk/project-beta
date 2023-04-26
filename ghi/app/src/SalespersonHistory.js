import React, {useState, useEffect } from 'react';

function SalespersonHistory() {
    const [salespeople, setSalespersons] = useState([]);
    const [sales, setSalesList] = useState([]);
    const [name, setName] = useState('')

    const getDataSalespersons = async () => {
        const url = 'http://localhost:8090/api/salespeople/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setSalespersons(data.salespeople)
        }
    }

    const getSalesList = async () => {
        const url = 'http://localhost:8090/api/sales';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setSalesList(data.sales)
        }
    }

    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);
    }

    useEffect(() => {
        getDataSalespersons();
        getSalesList();
    }, []);


    return (
        <>
            <div className="container">
                <select onChange={handleNameChange} required name= "vin" id="vin" className="form-select">
                    <option value="">Salesperson</option>
                    {salespeople.map(salesperson => {
                        return (
                            <option id={salesperson.id} key={salesperson.href} value={salesperson.id}>
                                {salesperson.first_name} {salesperson.last_name}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div className="container">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Salesperson</th>
                            <th>Customer</th>
                            <th>Vin</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.filter((sale) => sale.salesperson.id == name).map(sale => {
                            return (
                                <tr key={sale.id}>
                                    <td>{ `${sale.salesperson.first_name} ${sale.salesperson.last_name}` }</td>
                                    <td>{ `${sale.customer.first_name} ${sale.customer.last_name}` }</td>
                                    <td>{ sale.automobile.vin }</td>
                                    <td>{ sale.price }</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );

}

export default SalespersonHistory;
