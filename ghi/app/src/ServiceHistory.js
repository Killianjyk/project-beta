import React, { useState, useEffect } from 'react';

function ServiceHistory() {
    const [searchTerm, setSearchTerm] = useState('');
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            const response = await fetch('http://localhost:8080/api/appointments/');
            if (response.ok) {
                const data = await response.json();
                setAppointments(data.appointments);
            }
        };

        fetchAppointments();
    }, []);

    const handleSearch = (event) => {
        event.preventDefault();
        const filtered = appointments.filter((appointment) =>
            appointment.vin.includes(searchTerm.toUpperCase())
        );
        setFilteredAppointments(filtered);
    };

    return (
        <>
        <div className="container mt-5">
            <h1>Service History</h1>
            <form onSubmit={handleSearch}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="vin"
                        placeholder="Search by VIN..."
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Search
                </button>
            </form>
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th scope="col">VIN</th>
                        <th scope="col">Is VIP?</th>
                        <th scope="col">Customer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Time</th>
                        <th scope="col">Technician</th>
                        <th scope="col">Reason</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td>{appointment.vin}</td>
                            <td>{appointment.is_vip ? 'Yes' : 'No'}</td>
                            <td>{appointment.customer}</td>
                            <td>{new Date(appointment.date_time).toLocaleDateString()}</td>
                            <td>{new Date(appointment.date_time).toLocaleTimeString()}</td>
                             <td>{appointment.technician}</td>
                            <td>{appointment.reason}</td>
                            <td>{appointment.finished ? 'Finished' : 'Created'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default ServiceHistory;
