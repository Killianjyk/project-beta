import React, {useState, useEffect } from 'react';

function TechnicianForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [technicians, setTechnicians] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const technicianURL = 'http://localhost:8080/api/technicians/';
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                employee_id: employeeId
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const response = await fetch(technicianURL, fetchConfig);

        if (response.ok) {
            setFirstName('');
            setLastName('');
            setEmployeeId('');
            setTechnicians();
        }
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        if (name === "first_name") {
            setFirstName(value);
        } else if (name === "last_name") {
            setLastName(value);
        } else if (name === "employee_id") {
            setEmployeeId(value);
        }
    };

    const getData = async () => {
        const url = 'http://localhost:8080/api/technicians/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians);
        }
    };

    useEffect(()=> {
        getData();
    }, []);

    return (
        <div className="row">
            <div className="col offset">
            <div className="shadow p-3 mt-5">
                <h1>Add a Technician</h1>
                <form onSubmit={handleSubmit}>
                <div className="shadow p-3 mt-5">
                    <input
                    value={firstName}
                    onChange={handleFormChange}
                    placeholder="First Name..."
                    required
                    type="text"
                    name="first_name"
                    id="first_name"
                    className="form-control"
                    />
                </div>
                <div className="shadow p-3 mt-5">
                    <input
                    value={lastName}
                    onChange={handleFormChange}
                    placeholder="Last Name..."
                    required
                    type="text"
                    name="last_name"
                    id="last_name"
                    className="form-control"
                    />
                </div>
                <div className="shadow p-3 mt-5">
                    <input
                    value={employeeId}
                    onChange={handleFormChange}
                    placeholder="Employee ID..."
                    required
                    type="text"
                    name="employee_id"
                    id="employee_id"
                    className="form-control"
                    />
                </div>
                <button type="submit">Create</button>
                </form>
            </div>
            </div>
        </div>
    );
}

export default TechnicianForm;
