import React from 'react'
import Image from '../assets/rain.jpg'
import './Card.css'
function RainItem(props) {


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
  




  function getMonthName(monthIndex) {
    // Create a Date object from the ISO string
    
  
    // Array of month names
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    // Get the month index from the Date object (0-11)
    
  
    // Return the corresponding month name
    return monthNames[monthIndex];
  }

  return (
    <div>
    <div className="card card-custom" >
    <div className="card-header">
   Rain Prediction &nbsp; <i className="fa-regular fa-clock"></i> {formatDateTime(props.crop.date)}
  </div>
  <img className="card-img-top img-fluid" src={Image} alt="Card image cap"/>
 
  <div className="card-body">
  <h5 className="card-title">{props.crop.Prediction.toUpperCase()} mm of Rainfall <i className="fa-solid fa-cloud-moon-rain"></i></h5>
  
    <p className="card-text"><strong>State </strong> : {props.crop.State}  </p>
    
    
    <p className="card-text"><strong>District</strong> : {props.crop.District} </p>
    <p className="card-text"><strong>Month</strong> : {getMonthName(props.crop.Month)}  </p>
  
    {/* <p className="card-text"><strong>Ph value</strong>:{props.crop.ph}</p> */}
    {/* <p className="card-text">{props.crop.humid}</p> */}
  </div>
</div>
    </div>
  )
}

export default RainItem