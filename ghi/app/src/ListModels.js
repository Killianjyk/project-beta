import React, {useState, useEffect } from 'react';

function ListModels() {
    const [models, setModels] = useState([])

    const getData = async () => {
        const response = await fetch('http://localhost:8100/api/models/');
        if (response.ok) {
            const data = await response.json();
            setModels(data.models)
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
                    <th>Manufacturer</th>
                    <th>Picture</th>
                </tr>
            </thead>
            <tbody>
                {models.map(model => {
                    return (
                        <tr key={model.id}>
                            <td>{ model.name }</td>
                            <td>{ model.manufacturer.name }</td>
                            <td>
                                <img src= {model.picture_url} />
                            </td>
                        </tr>
                    );
                },
                )}
            </tbody>
        </table>
        <a href="/models/new">Add a model</a>
        </div>
        </>
    );
}

export default ListModels;
