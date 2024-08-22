// import React, { useState, useEffect } from 'react';

// import loaderGif from '../assets/Bars.gif';  // Assume you have a loader gif in your project

// const Form3 = () => {
//   const [states, setStates] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [selectedState, setSelectedState] = useState('');
//   const [selectedDistrict, setSelectedDistrict] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Fetch states on component mount
//   useEffect(() => {
//     const fetchStates = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch('https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise');
//         const data = await response.json();
//         const stateNames = data.data.statewise.map(state => state.state);
//         setStates(stateNames);
//       } catch (error) {
//         console.error('Error fetching states:', error);
//       }
//       setLoading(false);
//     };

//     fetchStates();
//   }, []);

//   // Fetch districts when a state is selected
//   useEffect(() => {
//     if (selectedState) {
//       const fetchDistricts = async () => {
//         setLoading(true);
//         try {
//           const response = await fetch(`https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise/district/${selectedState}`);
//           const data = await response.json();
//           console.log(data.data);
//           const districtNames = data.data.districtData.map(district => district.name);
//           setDistricts(districtNames);
//         } catch (error) {
//           console.error('Error fetching districts:', error);
//         }
//         setLoading(false);
//       };

//       fetchDistricts();
//     }
//   }, [selectedState]);

//   const handleStateChange = (event) => {
//     setSelectedState(event.target.value);
//     setSelectedDistrict(''); // Reset district selection when state changes
//   };

//   const handleDistrictChange = (event) => {
//     setSelectedDistrict(event.target.value);
//   };

//   return (
//     <div className="container mt-5">

//       <div className="form-group">
//         <label htmlFor="stateSelect">Select State</label>
//         <select
//           id="stateSelect"
//           className="form-control"
//           onChange={handleStateChange}
//           value={selectedState}
//         >
//           <option value="" disabled>Select State</option>
//           {states.map((state) => (
//             <option key={state} value={state}>{state}</option>
//           ))}
//         </select>
//         {loading && <img src={loaderGif} style={{width:"10%"}} alt="Loading..." />}
//       </div>

//       {selectedState && (
//         <div className="form-group">
//           <label htmlFor="districtSelect">Select District</label>
//           <select
//             id="districtSelect"
//             className="form-control"
//             onChange={handleDistrictChange}
//             value={selectedDistrict}
//           >
//             <option value="" disabled>Select District</option>
//             {districts.map((district) => (
//               <option key={district} value={district}>{district}</option>
//             ))}
//           </select>
//         </div>
//       )}

//       {selectedDistrict && (
//         <div className="mt-3">
//           <p><strong>Selected State:</strong> {selectedState}</p>
//           <p><strong>Selected District:</strong> {selectedDistrict}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Form3;





// import React, { useState, useEffect } from 'react';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// import loaderGif from '../assets/Bars.gif';
// import statesAndDistricts from '../data/states-and-districts.json';  // Import the JSON data

// const StateDistrictSelector = () => {
//   const [states, setStates] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [selectedState, setSelectedState] = useState('');
//   const [selectedDistrict, setSelectedDistrict] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Load states from JSON data on component mount
//   useEffect(() => {
//     setLoading(true);
//     setStates(statesAndDistricts.states);
//     setLoading(false);
//   }, []);

//   // Update districts when a state is selected
//   const handleStateChange = (event) => {
//     const stateName = event.target.value;
//     setSelectedState(stateName);
//     const state = states.find(s => s.state === stateName);
//     setDistricts(state ? state.districts : []);
//     setSelectedDistrict(''); // Reset district selection when state changes
//   };

//   const handleDistrictChange = (event) => {
//     setSelectedDistrict(event.target.value);
//   };

//   return (
//     <div className="container mt-5">
//       {loading && <img src={loaderGif} alt="Loading..." />}
//       <div className="form-group">
//         <label htmlFor="stateSelect">Select State</label>
//         <select
//           id="stateSelect"
//           className="form-control"
//           onChange={handleStateChange}
//           value={selectedState}
//         >
//           <option value="" disabled>Select State</option>
//           {states.map((state) => (
//             <option key={state.state} value={state.state}>{state.state}</option>
//           ))}
//         </select>
//       </div>

//       {selectedState && (
//         <div className="form-group">
//           <label htmlFor="districtSelect">Select District</label>
//           <select
//             id="districtSelect"
//             className="form-control"
//             onChange={handleDistrictChange}
//             value={selectedDistrict}
//           >
//             <option value="" disabled>Select District</option>
//             {districts.map((district) => (
//               <option key={district} value={district}>{district}</option>
//             ))}
//           </select>
//         </div>
//       )}

//       {selectedDistrict && (
//         <div className="mt-3">
//           <p><strong>Selected State:</strong> {selectedState}</p>
//           <p><strong>Selected District:</strong> {selectedDistrict}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StateDistrictSelector;




import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Load from '../assets/Bars.gif';
import statesAndDistricts from '../data/states-and-districts.json';  // Import the JSON data
import { useAuth0 } from "@auth0/auth0-react";

const StateDistrictSelector = () => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [loading, setLoading] = useState(false);
  const [cropLoad, setcropLoad] = useState(false);
  const host = "http://localhost:3000";

  const { user, isAuthenticated, isLoading } = useAuth0();
  const months = [
    { name: 'January', number: 1 },
    { name: 'February', number: 2 },
    { name: 'March', number: 3 },
    { name: 'April', number: 4 },
    { name: 'May', number: 5 },
    { name: 'June', number: 6 },
    { name: 'July', number: 7 },
    { name: 'August', number: 8 },
    { name: 'September', number: 9 },
    { name: 'October', number: 10 },
    { name: 'November', number: 11 },
    { name: 'December', number: 12 }
  ];

  // Load states from JSON data on component mount
  useEffect(() => {
    setLoading(true);
    setStates(statesAndDistricts.states);
    setLoading(false);
  }, []);

  // Update districts when a state is selected
  const handleStateChange = (event) => {
    const stateName = event.target.value;
    setSelectedState(stateName);
    const state = states.find(s => s.state === stateName);
    setDistricts(state ? state.districts : []);
    setSelectedDistrict(''); // Reset district selection when state changes
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };




  const createUser = async (email) => {




    const response = await fetch(`${host}/api/auth/createUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({ email: email, name: user.name })
    });

    const json = await response.json();

    if (json.success === true) {
      console.log("success");

    }
    else {
      //console.log(json.error);
      alert("INTERNAL SERVER ERROR");


      // navigate("/sign-up");
    }

  }



  const handleClick = async () => {

    setcropLoad(true);

    // await getRain();





    console.log(selectedDistrict + " " + selectedState + " " + selectedMonth);




    await createUser(user.email);
    //console.log("PARAMETERS OF ADD NOTE"+title+" "+description+" "+tag);


    const response = await fetch(`${host}/api/rainprec/rainrecommend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({ email: user.email, State: selectedState.toUpperCase(), Month: selectedMonth, District: selectedDistrict.toUpperCase() })
    });

    const json = await response.json();



    const newCrop = json;
    // setcrop(crop.concat(newCrop));
    console.log(newCrop.Prediction);
    localStorage.setItem("rPrediction", newCrop.Prediction);



    // Clear previous content





    let cropElement = document.getElementById('rain');
    cropElement.innerText = ""; // Clear text content
    cropElement.classList.remove('btn', 'btn-info', 'btn-lg'); // Remove classes

    // Remove existing icon if present
    let icon = cropElement.querySelector('.fa-solid.fa-cloud-showers-heavy');
    if (icon) {
      cropElement.removeChild(icon);
    }


    // Set new content
    if(newCrop.Prediction.length > 5)
      cropElement.innerText = `${newCrop.Prediction}`;  
      else
    cropElement.innerText = `Result: ${newCrop.Prediction.toUpperCase()} mm of expected rainfall `;

    // Add new classes
    cropElement.classList.add('btn', 'btn-info', 'btn-lg');

    // Add new icon
    let newIcon = document.createElement('i');
    newIcon.classList.add('fa-solid', 'fa-cloud-showers-heavy');
    cropElement.appendChild(newIcon);




    setcropLoad(false);

  }






  return (
    <div className="container mt-5">
      {loading && <img src={loaderGif} alt="Loading..." />}
      <div className="form-group">
        <label htmlFor="stateSelect">Select State</label>
        <select
          id="stateSelect"
          className="form-control"
          onChange={handleStateChange}
          value={selectedState}
        >
          <option value="" disabled>Select State</option>
          {states.map((state) => (
            <option key={state.state} value={state.state}>{state.state}</option>
          ))}
        </select>
      </div>

      {selectedState && (
        <div className="form-group">
          <label htmlFor="districtSelect">Select District</label>
          <select
            id="districtSelect"
            className="form-control"
            onChange={handleDistrictChange}
            value={selectedDistrict}
          >
            <option value="" disabled>Select District</option>
            {districts.map((district) => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div>
      )}

      <div className="form-group">
        <label htmlFor="monthSelect">Select Month</label>
        <select
          id="monthSelect"
          className="form-control"
          onChange={handleMonthChange}
          value={selectedMonth}
        >
          <option value="" disabled>Select Month</option>
          {months.map((month) => (
            <option key={month.number} value={month.number}>{month.name}</option>
          ))}
        </select>
      </div>




      <div className="col-md-4 mb-3">
        <button className="btn btn-success my-2" type="submit" onClick={(e) => { e.preventDefault(); handleClick(); }}  >Predict Rainfall</button>
      </div>
      {
        cropLoad === true && <> <p className='fa-fade' style={{ color: "blue" }} >Predicting Rainfall... </p><img style={{ width: "20%" }} src={Load} ></img> </>
      }


       <div className={cropLoad ? "d-none" : ""} >
        <p id="rain">

        </p>
      </div> 
      {/* {selectedDistrict && (
        <div className="mt-3">
          <p><strong>Selected State:</strong> {selectedState}</p>
          <p><strong>Selected District:</strong> {selectedDistrict}</p>
        </div>
      )} */}

      {/* {selectedMonth && (
        <div className="mt-3">
          <p><strong>Selected Month Number:</strong> {selectedMonth}</p>
          <p><strong>Selected Month Name:</strong> {months.find(month => month.number === parseInt(selectedMonth)).name}</p>
        </div>
      )} */}
    </div>




  );
};

export default StateDistrictSelector;
