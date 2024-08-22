// import React,{useEffect,useState,useRef} from 'react'
// import Spinner from '../assets/Bars.gif'
// import CropItem from './CropItem';
// import Noresult from './Noresult';
// import './CropGuide.css'
// import RainItem from './RainItem';
// import FertilizerItem from './FertilizerItem';
// function Predictions() {

    
// const [crop, setcrop] = useState([]);

// const host = "http://localhost:3000";
// const [load, setload] = useState(true)

// const createUser = async (email)=>{

      
//   const countRef = useRef(1);
    
//     const response = await fetch( `${host}/api/auth/createUser`, {
//       method: 'POST',
//       headers:{
//         'Content-Type':'application/json',
        
//       },
//       body: JSON.stringify({email:email,name:"Akshit"})
//     });

//     const json = await response.json();
    
//     if(json.success===true){
//       console.log("chaldiya mai");
     
//      }
//     else
//     {
//       //console.log(json.error);
//     alert("INTERNAL SERVER ERROR");
    
    
//     // navigate("/sign-up");
//     }

// }



// const getCrops = async (mail)=>{
//   console.log('i ran');

//     await createUser('akshitt125@gmail.com');
  
//       const response = await fetch( `${host}/api/crop/fetchallcrops`, {
//         method: 'POST',
//         headers:{
//           'Content-Type':'application/json',
          
         
//         },
//         body: JSON.stringify({email:mail})
//       });
  
//   const json = await response.json();
  
//    setcrop(json);
//    //console.log("i am running"+notes.length);
//   }


//   const getFertilizer = async (mail)=>{
//     console.log('fertlizer');
//     setload(true);
//       await createUser('akshitt125@gmail.com');
    
//         const response = await fetch( `${host}/api/fertilizerprec/fetchallfertilizer`, {
//           method: 'POST',
//           headers:{
//             'Content-Type':'application/json',
            
           
//           },
//           body: JSON.stringify({email:mail})
//         });
    
//     const json = await response.json();
    
    
//     setload(false);
//      setcrop(json);
//      //console.log("i am running"+notes.length);
//     }





//     const getRain = async (mail)=>{
//       console.log('rain');
//       setload(true);
//         await createUser('akshitt125@gmail.com');
      
//           const response = await fetch( `${host}/api/rainprec/fetchallrain`, {
//             method: 'POST',
//             headers:{
//               'Content-Type':'application/json',
              
             
//             },
//             body: JSON.stringify({email:mail})
//           });
      
//       const json = await response.json();
      
      
//       setload(false);
//        setcrop(json);
//        //console.log("i am running"+notes.length);
//       }
  


// useEffect(() => {
  
//     const fetchData = async () => {
      
//       await getCrops('akshitt125@gmail.com');
//       setload(false);
//     };
  
//     fetchData();
  
//   }, []);


//   return (
//     <>
//       <div className="dropdown my-5 mx-5 ">
//   <button className="btn btn-light btn-lg dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
//     Select Predictions <i className="fa-solid fa-carrot fa-lg"></i>&nbsp;
//   </button>
//   <ul className="dropdown-menu">
//     <li><div className="dropdown-item" onClick={ ()=>{getCrops('akshitt125@gmail.com');   countRef.current=1}} >Crop Prediction</div></li>
//     <li><div className="dropdown-item" onClick={ ()=>{getFertilizer('akshitt125@gmail.com');   countRef.current=2}}  >Fertilizer Predection</div></li>
//     <li><div className="dropdown-item" onClick={ ()=>{getRain('akshitt125@gmail.com');   countRef.current=3}}  >Rain Predection</div></li>
//   </ul>
// </div>


//     <div className='CropGuide'>{load===true && <><img src={Spinner} className='my-5 mx-5 bg-transparent' style={{width:"20%"}} alt='LOADING...'></img></>}
//        <div className="cards-container" >  
//         {   countRef.current===1 && crop.length!==0  && load===false &&
//          crop.map((crop) => {
//           return <>
//             <CropItem key={crop._id} crop={crop}  />
//             </>;
//         })
//         }
//           {   countRef.current===2 && crop.length!==0  && load===false &&
//          crop.map((crop) => {
//           return <>
//             <RainItem key={crop._id} crop={crop}  />
//             </>;
//         })
//         }
//           {   countRef.current===1 && crop.length!==0  && load===false &&
//          crop.map((crop) => {
//           return <>
//             <FertilizerItem key={crop._id} crop={crop}  />
//             </>;
//         })
//         }
//         { 
//           crop.length === 0 && <Noresult/>
//         }



//       </div> 
//     </div>
//     </>
//   )
// }

// export default Predictions








import React, { useEffect, useState, useRef } from 'react';
import Spinner from '../assets/Bars.gif';
import CropItem from './CropItem';
import Noresult from './Noresult';
import './CropGuide.css';
import RainItem from './RainItem';
import FertilizerItem from './FertilizerItem';
import { useAuth0 } from "@auth0/auth0-react";
import PleaseLogin from './PleaseLogin';
function Predictions() {

  const { user, isAuthenticated, isLoading } = useAuth0(); 
  const [crop, setCrop] = useState([]);
  const [load, setLoad] = useState(true);
  const countRef = useRef(1); // Moved outside of the function to be used in the component scope
  const host = "http://localhost:3000";

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
      console.log("chaldiya mai");
    } else {
      alert("INTERNAL SERVER ERROR");
    }
  };

  const getCrops = async (mail) => {
    console.log('i ran');
    await createUser(user.email);
    const response = await fetch(`${host}/api/crop/fetchallcrops`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: mail })
    });
    const json = await response.json();
    setCrop(json);
    setLoad(false);
  };

  const getFertilizer = async (mail) => {
    console.log('fertilizer');
    setLoad(true);
    await createUser(user.email);
    const response = await fetch(`${host}/api/fertilizerprec/fetchallfertilizer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: mail })
    });
    const json = await response.json();
    setLoad(false);
    setCrop(json);
  };

  const getRain = async (mail) => {
    console.log('rain');
    setLoad(true);
    await createUser(user.email);
    const response = await fetch(`${host}/api/rainprec/fetchallrain`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: mail })
    });
    const json = await response.json();
    setLoad(false);
    setCrop(json);
  };

  useEffect(() => {
    const fetchData = async () => {
      if(isAuthenticated){
        
      await getCrops(user.email);
      setLoad(false);}
      
    };
    fetchData();
  }, []);

  return (
    <>
    { isAuthenticated &&  <div className="dropdown my-5 mx-5 ">
        <button className="btn btn-light btn-lg dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Select Predictions <i className="fa-solid fa-carrot fa-lg"></i>&nbsp;
        </button>
        <ul className="dropdown-menu">
          <li><div className="dropdown-item" onClick={() => { getCrops(user.email); countRef.current = 1; }} >Crop Prediction</div></li>
          <li><div className="dropdown-item" onClick={() => { getFertilizer(user.email); countRef.current = 2; }}  >Fertilizer Prediction</div></li>
          <li><div className="dropdown-item" onClick={() => { getRain(user.email); countRef.current = 3; }}  >Rain Prediction</div></li>
        </ul>
      </div>
}
      <div className='CropGuide'>
        {  isAuthenticated && load === true && <><img src={Spinner} className='my-5 mx-5 bg-transparent' style={{ width: "20%" }} alt='LOADING...'></img></>}
        <div className="cards-container">
          { isAuthenticated && countRef.current === 1 && crop.length !== 0 && load === false &&
            crop.map((crop) => {
              return <CropItem key={crop._id} crop={crop} />;
            })
          }
          { isAuthenticated &&  countRef.current === 2 && crop.length !== 0 && load === false &&
            crop.map((crop) => {
              return <FertilizerItem key={crop._id} crop={crop} />;
            })
          }
          { isAuthenticated && countRef.current === 3 && crop.length !== 0 && load === false &&
            crop.map((crop) => {
              return <RainItem key={crop._id} crop={crop} />;
            })
          }
          { isAuthenticated && crop.length === 0 && !load && <Noresult />}
          { isLoading &&  <><img src={Spinner} className='my-5 mx-5 bg-transparent' style={{ width: "20%" }} alt='LOADING...'></img></> }
          {isAuthenticated=== false && <PleaseLogin/> }
        </div>
      </div>
    </>
  );
}

export default Predictions;
