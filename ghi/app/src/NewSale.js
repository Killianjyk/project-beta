import React, {useState, useEffect } from 'react';

function NewSale() {
    const [automobiles, setAutomobiles] = useState([])
    const [salespersons, setSalespersons] = useState([])
    const [customers, setCustomers] = useState([])
    const [formData, setFormData] = useState({
        automobile: '',
        salesperson: '',
        customer: '',
        price: ''
    })

    const getDataAuto = async () => {
        const url = 'http://localhost:8100/api/automobiles/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setAutomobiles(data.autos)
        }
    }

    const getDataSalespersons = async () => {
        const url = 'http://localhost:8090/api/salespeople/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setSalespersons(data.salespeople)
        }
    }

    const getDataCustomers = async () => {
        const url = 'http://localhost:8090/api/customers/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setCustomers(data.customers)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const saleURL = 'http://localhost:8090/api/sales/';
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const response = await fetch(saleURL, fetchConfig);
        console.log(response)

        if (response.ok) {
            setFormData({
                automobile: '',
                salesperson: '',
                customer: '',
                price: ''
            });
        }
    }

    const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;
        setFormData({
            ...formData,
            [inputName]: value
        });
    }

    useEffect(()=> {
        getDataAuto();
        getDataSalespersons();
        getDataCustomers();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new sale</h1>
                    <form onSubmit={handleSubmit} id="create-sale-form">
                        <div className="mb-3">
                            <select value={formData.auto} onChange={handleFormChange} required name="auto" id="auto" className="form-select">
                            <option value="">Choose an automobile vin</option>
                            {automobiles.map(automobile => {
                                return (
                                <option key={automobile.vin} value={automobile.vin}>
                                    {automobile.vin}
                                </option>
                                );
                            })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select value={formData.salesperson} onChange={handleFormChange} required name="salesperson" id="salesperson" className="form-select">
                            <option value="">Choose a salesperson</option>
                            {salespersons.map(salesperson => {
                                return (
                                <option key={salesperson.id} value={salesperson.id}>
                                    {salesperson.first_name} {salesperson.last_name}
                                </option>
                                );
                            })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select value={formData.customer} onChange={handleFormChange} required name="customer" id="customer" className="form-select">
                            <option value="">Choose a customer</option>
                            {customers.map(customer => {
                                return (
                                <option key={customer.id} value={customer.id}>
                                    {customer.first_name} {customer.last_name}
                                </option>
                                );
                            })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.price} onChange={handleFormChange} placeholder="Price" required type="text" name="price" id="price" className="form-control" />
                            <label htmlFor="price">Price</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewSale;
