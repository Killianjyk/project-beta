import React, {useState, useEffect } from 'react';

function CreateAutomobiles() {
    const [formData, setFormData] = useState({
        color: '',
        year: '',
        vin: '',
        model_id: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const autoURL = 'http://localhost:8100/api/automobiles/'
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const response = await fetch(autoURL, fetchConfig);
        console.log(formData);
        if (response.ok) {
            setFormData({
                color: '',
                year: '',
                vin: '',
                model_id: '',
            });
        }
    }

    const [models, setModelList] = useState([])
    const getModel = async (event) => {
        const url = 'http://localhost:8100/api/models/'
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setModelList(data.models)
        }

    }

    const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;
        setFormData({
            ...formData,
            [inputName]: value
        });
        console.log(formData);
    }

    useEffect(()=> {
        getModel();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add an automobile</h1>
                    <form onSubmit={handleSubmit} id="add-customer-form">
                        <div className="form-floating mb-3">
                            <input value={formData.color} onChange={handleFormChange} placeholder="Color..." required type="text" name="color" id="color" className="form-control" />
                            <label htmlFor="name">Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.year} onChange={handleFormChange} placeholder="Year..." required type="text" name="year" id="year" className="form-control" />
                            <label htmlFor="name">Year</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.vin} onChange={handleFormChange} placeholder="VIN..." required type="text" name="vin" id="vin" className="form-control" />
                            <label htmlFor="name">VIN</label>
                        </div>
                        <div className="mb-3">
                            <select value={formData.model} onChange={handleFormChange} required name="model_id" id="model_id" className="form-select">
                            <option value="">Choose a model</option>
                            {models.map(model => {
                                return (
                                <option key={model.id} value={model.id}>
                                    {model.manufacturer.name} {model.name}
                                </option>
                                );
                            })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );

}
export default CreateAutomobiles;
