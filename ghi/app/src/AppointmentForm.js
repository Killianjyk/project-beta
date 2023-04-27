import React, {useState, useEffect } from 'react';

function AppointmentForm() {
  const [vin, setVIN] = useState('');
  const [customer, setCustomer] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [technician, setTechnician] = useState('');
  const [reason, setReason] = useState('');
  const [technicians, setTechnicians] = useState([]);
  const [status, setStatus] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();

    const appointmentURL = 'http://localhost:8080/api/appointments/';
    const fetchConfig = {
      method: 'POST',
      body: JSON.stringify({
          vin: vin,
          customer: customer,
          date_time: `${date} ${time}`,
          technician: technician,
          reason: reason,
          technicians: technicians,
          status: status
      }),
      headers: {
          'Content-Type': 'application/json'
      }
  };

  const response = await fetch(appointmentURL, fetchConfig);

  if (response.ok) {
      setVIN('');
      setCustomer('');
      setDate('');
      setTime('');
      setTechnician('');
      setReason('');
      setTechnicians('');
      setStatus('');
    } else {
      console.log('Failed to create service appointment');
    }
};

  const handleFormChange = (event) => {
    const { name, value } = event.target;
      if (name === "vin") {
        setVIN(value);
      } else if (name === "customer") {
        setCustomer(value);
      } else if (name === "date") {
        setDate(value);
      } else if (name === "time") {
        setTime(value);
      } else if (name === "technician") {
        setTechnician(value);
      } else if (name === "reason") {
        setReason(value);
      } else if (name === "status") {
        setStatus(value);
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

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="row">
      <div className="col offset">
        <div className="shadow p-3 mt-5">
          <h1>Create a Service Appointment</h1>
          <form onSubmit={handleSubmit}>
            <div className="shadow p-3 mt-5">
              <input
                value={vin}
                onChange={handleFormChange}
                type="text"
                name="vin"
                id="vin"
                className="form-control"
              />
              <label htmlFor="automobileVIN"> Automobile VIN</label>
            </div>
            <div className="shadow p-3 mt-5">
                <input
                    value={customer}
                    onChange={handleFormChange}
                    type="text"
                    name="customer"
                    id="customer"
                    className="form-control"
                />
                <label htmlFor="customer">Customer</label>
            </div>
            <div className="shadow p-3 mt-5">
                <input
                    value={date}
                    onChange={handleFormChange}
                    placeholder="Date (YYYY-MM-DD)"
                    required
                    type="date"
                    name="date"
                    id="date"
                    className="form-control"
                />
                <label htmlFor="date"> Date</label>
            </div>
            <div className="shadow p-3 mt-5">
                <input
                    value={time}
                    onChange={handleFormChange}
                    placeholder="Time (HH:MM)"
                    required
                    type="time"
                    name="time"
                    id="time"
                    className="form-control"
                />
                <label htmlFor="date"> Time</label>
            </div>
            <div className="shadow p-3 mt-5">
                <select
                    className="form-select"
                    name="technician"
                    id="technician"
                    value={technician}
                    onChange={handleFormChange}
                    required
                >
                    <option value="" disabled>Choose a technician...</option>
                    {technicians.map((tech) => (
                    <option key={tech.id} value={tech.id}>
                        {tech.first_name} {tech.last_name}
                    </option>
                    ))}
                </select>
                <label htmlFor="technician"> Technician</label>
            </div>
            <div className="shadow p-3 mt-5">
                <input
                    value={reason}
                    onChange={handleFormChange}
                    type="text"
                    name="reason"
                    id="reason"
                    className="form-control"
                />
                <label htmlFor="reason"> Reason</label>
            </div>
            <div className="shadow p-3 mt-5">
                <input
                    value={status}
                    onChange={handleFormChange}
                    type="text"
                    name="status"
                    id="status"
                    className="form-control"
                />
                <label htmlFor="status"> Status</label>
            </div>
                <button type="submit">Create</button>
            </form>
            </div>
        </div>
    </div>
  );
}

export default AppointmentForm;
