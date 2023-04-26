import React, {useState, useEffect } from 'react';

function ListManufacturers() {
    const [manufacturers, setManufacturers] = useState([])

    const getData = async () => {
        const response = await fetch('http://localhost:8100/api/manufacturers');
        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers)
        }
    }

    useEffect(()=> {
        getData();
    }, []);



    return (
        <>
        <div className="container">
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {manufacturers.map(manufacturer => {
                    return (
                        <tr key={manufacturer.id}>
                            <td>{ manufacturer.name }</td>
                        </tr>
                    );
                },
                )}
            </tbody>
        </table>
        <a href="/manufacturers/new">Add a manufacturer</a>
        </div>
        </>
    );
}

export default ListManufacturers;
