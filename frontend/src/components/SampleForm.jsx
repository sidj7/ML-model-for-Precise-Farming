import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

const SoilForm = () => {
    const [moisture, setMoisture] = useState(0);
    const [soilType, setSoilType] = useState('');
    const [cropType, setCropType] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Soil Moisture:', moisture);
        console.log('Soil Type:', soilType);
        console.log('Crop Type:', cropType);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="col-md-4 mb-3">
                    <label htmlFor="validationDefault01">Soil Moisture</label>
                    <input
                        type="number"
                        className="form-control"
                        id="validationDefault01"
                        placeholder="Soil Moisture"
                        onChange={(e) => setMoisture(e.target.value)}
                        value={moisture}
                        required
                    />
                </div>




                <div className="col-md-4 mb-3">
                    <label htmlFor="validationDefault02">Soil Type</label>
                    <select
                        className="form-control"
                        id="validationDefault02"
                        onChange={(e) => setSoilType(e.target.value)}
                        value={soilType}
                        required
                    >
                        <option value="" disabled>Select Soil Type</option>
                        <option value="sandy">Sandy</option>
                        <option value="clay">Clay</option>
                        <option value="silt">Silt</option>
                        <option value="loamy">Loamy</option>
                    </select>
                </div>




                <div className="col-md-4 mb-3">
                    <label htmlFor="validationDefault03">Crop Type</label>
                    <select
                        className="form-control"
                        id="validationDefault03"
                        onChange={(e) => setCropType(e.target.value)}
                        value={cropType}
                        required
                    >
                        <option value="" disabled>Select Crop Type</option>
                        <option value="wheat">Wheat</option>
                        <option value="rice">Rice</option>
                        <option value="corn">Corn</option>
                        <option value="soybean">Soybean</option>
                    </select>
                </div>





            </div>




            <button className="btn btn-primary" type="submit">Submit</button>
        </form>
    );
};

export default SoilForm;
