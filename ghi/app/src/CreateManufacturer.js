import React, {useState, useEffect } from 'react';

function CreateManufacturer() {
    const [formData, setFormData] = useState({
        name: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const customerURL = 'http://localhost:8100/api/manufacturers/'
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const response = await fetch(customerURL, fetchConfig);

        if (response.ok) {
            setFormData({
                name: '',
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

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add a Manufacturer</h1>
                    <form onSubmit={handleSubmit} id="add-customer-form">
                        <div className="form-floating mb-3">
                            <input value={formData.name} onChange={handleFormChange} placeholder="Manufacturer name" required type="text" name="name" id="name" className="form-control" />
                            <label htmlFor="name">Manufacturer name</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );

}
export default CreateManufacturer;
