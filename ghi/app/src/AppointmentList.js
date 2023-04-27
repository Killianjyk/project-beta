import React, { useState, useEffect } from 'react';

function AppointmentList() {
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAppointments = async () => {
      const response = await fetch('http://localhost:8080/api/appointments/', {
        headers: {
          Accept: 'application/json+datetime',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAppointments(data.appointments);
      }
      setIsLoading(false);
    };

      useEffect(() => {
        fetchAppointments();
      }, []);




    const handleCancelAppointment = async (appointmentId) => {
      const url = `http://localhost:8080/api/appointments/${appointmentId}`;
      const fetchConfig = {
        method: 'DELETE',
      };
      const response = await fetch(url, fetchConfig);
      if (response.ok) {
        setAppointments((prevAppointments) => {
          return prevAppointments.filter((appointment) => appointment.id !== appointmentId);
        });
      } else {
        console.log('Failed to cancel service appointment');
      }
    };

    const handleFinishAppointment = async (appointmentId) => {
      const url = `http://localhost:8080/api/appointments/${appointmentId}`;
      const fetchConfig = {
        method: 'PUT',
        body: JSON.stringify({ finished: true }),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(url, fetchConfig);
      if (response.ok) {
        setAppointments((prevAppointments) => {
          return prevAppointments.filter((appointment) => appointment.id !== appointmentId);
        });
      } else {
        console.log('Failed to finish service appointment');
      }
    };

    if (isLoading) {
      return <div>Loading...</div>;
    }
    console.log(appointments)
    return (
      <div className="row">
        <div className="col offset">
          <div className="shadow p-3 mt-5">
            <h1>Service Appointments</h1>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">VIN</th>
                  <th scope="col">Is VIP?</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Date</th>
                  <th scope="col">Time</th>
                  <th scope="col">Technician</th>
                  <th scope="col">Reason</th>
                </tr>
              </thead>
              <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.vin}</td>
                  <td>{appointment.is_vip ? 'Yes' : 'No'}</td>
                  <td>{appointment.customer}</td>
                  <td>{new Date(Date.parse(appointment.date_time)).toLocaleDateString()}</td>
                  <td>{new Date(appointment.date_time).toLocaleTimeString()}</td>
                  <td>{appointment.technician}</td>
                  <td>{appointment.reason}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleCancelAppointment(appointment.id)}
                    >
                      Cancel
                    </button>
                    {!appointment.finished && (
                      <button
                        className="btn btn-success ms-2"
                        onClick={() => handleFinishAppointment(appointment.id)}
                      >
                        Finish
                      </button>
                    )}
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  export default AppointmentList;
