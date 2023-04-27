import React, {useState, useEffect } from 'react';

function CreateVehicle() {
    const [name, setName] = useState("");
    const [pictureUrl, setPictureUrl] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    const [manufacturers, setManufacturers] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const vehicleURL = 'http://localhost:8100/api/models/';
        const fetchConfig = {
          method: 'POST',
          body: JSON.stringify({
            name: name,
            picture_url: pictureUrl,
            manufacturer_id: manufacturer,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const response = await fetch(vehicleURL, fetchConfig);

        if (response.ok) {
          setName('');
          setPictureUrl('');
          setManufacturer('');
        }
      };

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        if (name === "name") {
          setName(value);
        } else if (name === "picture_url") {
          setPictureUrl(value);
        } else if (name === "manufacturer") {
          setManufacturer(parseInt(value));
        }
      };

    const getData = async () => {
        const url = 'http://localhost:8100/api/manufacturers/'
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers)
        }
    }

    useEffect(()=> {
        getData();
    }, []);

    return (
        <div className="row">
            <div className="col offset">
            <div className="shadow p-3 mt-5">
                <h1>Create a vehicle model </h1>
                <form onSubmit={handleSubmit}>
                <div className="shadow p-3 mt-5">
                    <input
                    value={name}
                    onChange={handleFormChange}
                    placeholder="Model Name..."
                    required
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    />
                </div>
                <div className="shadow p-3 mt-5">
                    <input
                    value={pictureUrl}
                    onChange={handleFormChange}
                    placeholder="Picture..."
                    required
                    type="text"
                    name="picture_url"
                    id="picture_url"
                    className="form-control"
                    />
                </div>
                <div className="shadow p-3 mt-5">
                <select
                    className="form-select"
                    name="manufacturer"
                    id="manufacturer"
                    value={manufacturer}
                    onChange={handleFormChange}
                    required
                >
                    <option value="" disabled>Choose a manufacturer...</option>

                    {manufacturers.map((tech) => {
                        return(
                            <option key={tech.id} value={tech.id}>
                                {tech.name}
                            </option>
                        )
                    })}
                </select>
                </div>
                <button type="submit">Create</button>
                </form>
            </div>
            </div>
        </div>
    );
}

export default CreateVehicle;
