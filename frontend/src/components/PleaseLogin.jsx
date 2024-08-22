// import React from 'react'
// import Image from '../Capture.png'
// function Nowork() {
//   return (
//     <div className='mx-5' style={{}}>
//       <img src={Image}></img>
//     </div>
//   )
// }

// export default Nowork

import React from 'react';
import Image from '../assets/noresult.webp';
import { useAuth0 } from "@auth0/auth0-react";

function PleaseLogin() {

    const { user, isAuthenticated, isLoading } = useAuth0();
    const { loginWithRedirect } = useAuth0();
  const headingStyle = {
    background: 'radial-gradient(circle, #000000, rgb(88 199 228))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'lavender',
    fontFamily:"serif" 
    
    // backgroundColor:"red"
  };

  const headingStyle2 = {
    color: '#033147',
    
    fontFamily:"serif" 
    
    // backgroundColor:"red"
  };
  return (
    <div className='mx-5'>
      <button className='my-5 btn btn-lg btn-primary' onClick={()=>loginWithRedirect()} >PLEASE LOGIN TO CONTINUE <i class="fa-solid fa-right-to-bracket"></i> </button>
      <img
        src={Image}
        alt='Description of the image'
        style={{
          width: '50%', // Set the width of the image
          height: 'auto', // Automatically adjust the height based on the width
          // borderRadius: '5px', // Apply a border radius to the image
          // boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Add a box shadow to the image
          marginLeft:'10%',
          marginBottom:'5%',
        }}
      />
      
    </div>
  );
}

export default PleaseLogin;

