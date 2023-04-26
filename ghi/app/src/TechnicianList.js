import React, { useState, useEffect } from 'react';

function TechnicianList() {
  const [technicians, setTechnicians] = useState([]);

  const getData = async () => {
    const response = await fetch ('http://localhost:8080/api/technicians/');

    if (response.ok) {
      const data = await response.json();
      setTechnicians(data.technicians);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (technician) => {
    try {
      const response = await fetch(`http://localhost:8080/api/technicians/${technician.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        const updatedTechnicians = technicians.filter(t => t.id !== technician.id);
        setTechnicians(updatedTechnicians);
      } else {
        throw new Error(`Error to delete technician ${technician.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Technicians</h1>
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th> Last Name</th>
          </tr>
        </thead>
        <tbody>
          {technicians.map((technician) => (
            <tr key={technician.id}>
                <td>{technician.employee_id}</td>
                <td>{technician.first_name}</td>
                <td>{technician.last_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TechnicianList;
