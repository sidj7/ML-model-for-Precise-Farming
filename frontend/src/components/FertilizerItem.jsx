import React from 'react'
import Image from '../assets/fertilizer.jpg'
import './Card.css'
function FertilizerItem(props) {


  function formatDateTime(isoString) {
    // Create a Date object from the ISO string
    const date = new Date(isoString);
  
    // Extract date components
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = date.getDate().toString().padStart(2, '0');
  
    // Extract time components
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
  
    // Construct the formatted date and time string
    const formattedDate = `${year}-${month}-${day}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;
  
    return `${formattedDate} ${formattedTime}`;
  }
  
  // Example usage
  const isoString = "2024-05-17T09:25:22.558Z";
  console.log(formatDateTime(isoString)); // Output: "2024-05-17 09:25:22"
  




  function getMonthName(isoString) {
    // Create a Date object from the ISO string
    const date = new Date(isoString);
  
    // Array of month names
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    // Get the month index from the Date object (0-11)
    const monthIndex = date.getMonth();
  
    // Return the corresponding month name
    return monthNames[monthIndex];
  }

  return (
    <div>
    <div className="card card-custom" >
    <div className="card-header">
   Fertilizer Prediction &nbsp; <i className="fa-regular fa-clock"></i> {formatDateTime(props.crop.date)}
  </div>
  <img className="card-img-top img-fluid" src={Image} alt="Card image cap"/>
 
  <div className="card-body">
  <h5 className="card-title">{props.crop.Prediction.toUpperCase()}<i className="fa-solid fa-oil-can"></i></h5>
    <h6 className="card-subtitle mb-2 text-body-secondary"><i className="fa-solid fa-temperature-high fa-lg"></i>&nbsp;:{props.crop.Temperature}°C&nbsp; <i className="fa-solid fa-droplet fa-lg"></i> :{props.crop.Humidity}%</h6>
    <p className="card-text"><strong>Nitrogen in soil</strong> : {props.crop.Nitrogen} kg/ha </p>
    
    
    <p className="card-text"><strong>Potassium in soil</strong> : {props.crop.Potassium} kg/ha </p>
    <p className="card-text"><strong>Phosphorous in soil</strong> : {props.crop.Phosphorous} kg/ha </p>
    <p className="card-text"><strong>Soil Type  </strong> : {props.crop.Soil_Type} </p>
    <p className="card-text"><strong>Crop Type  </strong> : {props.crop.Crop_Type} </p>
    <p className="card-text"><strong>Soil Moisture  </strong> : {props.crop.Soil_Moist} % </p>
    {/* <p className="card-text"><strong>Ph value</strong>:{props.crop.ph}</p> */}
    {/* <p className="card-text">{props.crop.humid}</p> */}
  </div>
</div>
    </div>
  )
}

export default FertilizerItem