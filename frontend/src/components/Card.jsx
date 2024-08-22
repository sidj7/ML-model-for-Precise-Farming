import React ,{useEffect,useState} from 'react';

import './Card.css'; // Import the CSS file

// function Card(props) {
//   return (
//     <div className="card card-custom"> {/* Use className for custom and Bootstrap classes */}
//       <img src={props.image} className="card-img-top img-fluid" alt="Crop" />
//       <div className="card-body">
//         <p className="card-text">{props.text}</p>
//         <button className='btn btn-primary '>Explore Now <i className="fa-solid fa-location-arrow"></i> </button>
//       </div>
//     </div>
//   );


// }

import { useAuth0 } from "@auth0/auth0-react";
import Form1 from '../components/Form1'
import Form2 from '../components/Form2'
import Form3 from '../components/Form3';

function Card(props) {
    // Unique ID for each modal based on the card's ID prop


    const { user, isAuthenticated, isLoading } = useAuth0();
    const { loginWithRedirect } = useAuth0();
    const modalId = `exploreModal-${props.id}`;
    const [change, setchange] = useState(0);
    const [first, setfirst] = useState(0);
    useEffect(() => {
    console.log('I GOT CHANGED');
    
    }, [change])
    
    const  handleChange=()=> {
      
      if(change===0)
        setchange(1);
      else
      setchange(0);

    }
    
    return (
      <div>
        <div className="card card-custom">
          <img src={props.image} className="card-img-top img-fluid" alt="Crop" />
          <div className="card-body">
            <p className="card-text">{props.text}</p>
            {/* Updated data-bs-target to reference the unique modal ID */}
         { isLoading===false &&  isAuthenticated &&   <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target={`#${modalId}`}>Explore Now <i className="fa-solid fa-location-arrow"></i></button>  }
         { isLoading===false && !isAuthenticated && <button className='btn btn-primary '  onClick={() => loginWithRedirect()}  >Login To Continue <i className="fa-solid fa-right-to-bracket"></i></button> }
         { isLoading &&   <button className='btn btn-primary fa-fade'>Loading...</button> }
          </div>
        </div>
  
        {/* Modal with unique ID */}
        <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby={`${modalId}Label`} aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={`${modalId}Label`}>{props.heading}</h5>
                <button type="button"  onClick={()=>{window.location.reload();}} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {  isAuthenticated &&  props.id==='1' && <Form1  handleChange={handleChange} change={change}  />}
                {  isAuthenticated && props.id==='2' && <Form2  handleChange={handleChange} change={change}  ></Form2>}
                {   isAuthenticated && props.id==='3' && <Form3    ></Form3>}
                {/* Add more conditions here for other IDs */}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>{handleChange();window.location.reload();}} >Close</button>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
  

export default Card;
