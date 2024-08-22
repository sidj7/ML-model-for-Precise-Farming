import React,{useState,useEffect} from 'react'
import { useAuth0 } from "@auth0/auth0-react";

import Load from '../assets/Bars.gif';
export default function Form1(props) {

    const host = "http://localhost:3000";

    const handlechange = props.handleChange;
    const change = props.change; 

    const [ph, setph] = useState(null)
    const [Phosphorus, setPhosphorus] = useState(null);
    const [nitrogen, setnitrogen] = useState(null)
    const [potassium, setpotassium] = useState(null)
    const [Loading, setLoading] = useState(null)
    const [longitude, setlongitude] = useState(null)
    const [latitude, setlatitude] = useState(null)
    const [state, setstate] = useState(null)
    const [temp, settemp] = useState(null)
    const [rain, setrain] = useState(null)
    const [humid, sethumid] = useState(null)
    const [condition, setcondition] = useState(null)
    const [crop, setcrop] = useState(null);
    const [rainLoad, setrainLoad] = useState(false)
    const [cropLoad, setcropLoad] = useState(false);
    const { user, isAuthenticated, isLoading } = useAuth0();
    
    function handleGetLocation (){
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                console.log("Latitude is :", position.coords.latitude);
                console.log("Longitude is :", position.coords.longitude);
    
                // Set state for latitude and longitude if needed elsewhere in your component
                setlatitude(position.coords.latitude);
                setlongitude(position.coords.longitude);
                    setLoading(true);
                // Call getData directly with the obtained coordinates
                await getData(position.coords.longitude, position.coords.latitude);
                setLoading(false);
            }, (error) => {
                console.error("Error Code = " + error.code + " - " + error.message);
                window.alert("Error Code = " + error.code + " - " + error.message);
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
            window.alert("Geolocation is not supported by this browser.");
        }
    };
    
    const handleNitrogenChange = (event) => {
        setnitrogen(event.target.value); // Update the nitrogen state with the new input value
    };


    const handlePotassiumChange = (event) => {
        setpotassium(event.target.value); // Update the nitrogen state with the new input value
    };

    const handlePhosChange = (event) =>{
            setPhosphorus(event.target.value);
    }

    const handlephChange = (event) =>{
            setph(event.target.value);
    }


          const getData = async (longitude, latitude) => {
            const apiKey = 'c6d93363baf641e283774714242602'; // Replace with your API key
            const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}&aqi=no`;
        
            try {
                setLoading(true); // Set loading to true before fetching data
        
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`); // Throw an error for non-2xx responses
                }
                const data = await response.json();
        
                console.log(data);
                const temperature = data.current.temp_c; // Temperature in Celsius
                const humidity = data.current.humidity; // Humidity percentage
                const precipitation = data.current.precip_mm; // Precipitation in millimeters
                var locationUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=2f7dc611d30e4383a2d9c500b180083a`
                const location = await fetch(locationUrl);
                if(!location.ok)
                    {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                     var locationData  = await location.json();
                
                console.log(locationData.results[0].components.state.toUpperCase());
                console.log(locationData.results[0].components.county.toUpperCase());
                var stateName = locationData.results[0].components.state.toUpperCase()+", "+locationData.results[0].components.county.toUpperCase();
                setstate(stateName);

                console.log(`Temperature: ${temperature}°C, Humidity: ${humidity}%, Precipitation: ${precipitation}mm , State name : ${ stateName} `);
                setcondition(data.current.condition);
                // Update state with fetched data
                sethumid(humidity);
                settemp(temperature);
                
            } catch (error) {
                console.error('Error fetching weather data:', error);
            } finally {
                setLoading(false); // Ensure loading is set to false when the fetch is complete
            }
        };




        const createUser = async (email)=>{

      
  
    
            const response = await fetch( `${host}/api/auth/createUser`, {
              method: 'POST',
              headers:{
                'Content-Type':'application/json',
                
              },
              body: JSON.stringify({email:email,name:user.name})
            });
        
            const json = await response.json();
            
            if(json.success===true){
              console.log("chaldiya mai");
             
             }
            else
            {
              //console.log(json.error);
            alert("INTERNAL SERVER ERROR");
            
            
            // navigate("/sign-up");
            }
        
        }
        
        
        const getRain = async()=> {


            const predection = "Assumed Result";

           
                    ;
                     // Clear previous content
 let cropElement = document.getElementById('crop');
 cropElement.innerText = ""; // Clear text content
 cropElement.classList.remove('btn', 'btn-info', 'btn-lg'); // Remove classes

 // Remove existing icon if present
 let icon = cropElement.querySelector('.fa-brands.fa-pagelines');
 if (icon) {
     cropElement.removeChild(icon);
 }

                setrainLoad(true);
            

                await createUser(user.email);
                //console.log("PARAMETERS OF ADD NOTE"+title+" "+description+" "+tag);

                var commaIndex = state.indexOf(',');
                var State = state.substring(0, commaIndex).trim();
                console.log("Extracted State: ", State);
             
                
// Extract the city name using substring
                var city = state.substring(commaIndex + 1).trim();
                console.log("Extracted City: ", city)
            
                const currentDate = new Date();

// Get the current month (0-11)
const currentMonth = currentDate.getMonth();

// Convert the month index to a 1-based month number
                const monthNumber = currentMonth + 1;
            
                const response = await fetch( `${host}/api/rainprec/getrain`, {
                  method: 'POST',
                  headers:{
                    'Content-Type':'application/json',
                   
                  },
                  body: JSON.stringify({email:user.email,State:State,District:city,Month:monthNumber})
                });
            
                const rain = await response.json();
            
            
            console.log(rain.rain);
          setrain(rain.rain);
          localStorage.setItem('rain',rain.rain);
            setrainLoad(false);
            
    }






        const handleClick= async()=> {

            setcropLoad(true);

                await getRain();


            var fetchedRain = localStorage.getItem('rain');

                const predection = "Assumed Result";
                console.log(nitrogen+" "+potassium+" "+ph+" "+Phosphorus+" "+fetchedRain+" "+temp+" "+humid+" "+predection)            ;


                

                    await createUser(user.email);
                    //console.log("PARAMETERS OF ADD NOTE"+title+" "+description+" "+tag);
                
                
                    const response = await fetch( `${host}/api/croprec/croprecommend`, {
                      method: 'POST',
                      headers:{
                        'Content-Type':'application/json',
                       
                      },
                      body: JSON.stringify({email:user.email,rain:fetchedRain,temp:temp,humid:humid,nitro:nitrogen,p:Phosphorus,k:potassium,ph:ph})
                    });
                
                    const json = await response.json();
                
                
                
                 const   newCrop = json ;
                // setcrop(crop.concat(newCrop));
                console.log(newCrop.prediction);
                localStorage.setItem("cropPrediction",newCrop.prediction);
                // document.getElementById('crop').innerText = `The best suited crop at ${temp}°C , ${localStorage.getItem('rain')}mm(Expected this month ) with ${humid}% Humidity and having Nirogen, Phosphorus, and Potassium as ${nitrogen} kg/ha , ${Phosphorus} kg/ha , ${potassium} kg/ha is ${<strong style={{color:"HighlightText",fontWeight:"bold"}} >{newCrop.prediction}</strong>} `;
//                 document.getElementById('crop').innerText =`Result : ${newCrop.prediction.toUpperCase()}`
//                 let cropElement = document.getElementById('crop');

// // Add Bootstrap classes dynamically
// cropElement.classList.add('btn', 'btn-info' , 'btn-lg' );
// let newIcon = document.createElement('i');
// newIcon.classList.add('fa-brands', 'fa-pagelines');
// cropElement.appendChild(newIcon);



                     // Clear previous content
                     let cropElement = document.getElementById('crop');


 // Set new content
 cropElement.innerText = `Result: ${newCrop.prediction.toUpperCase()}`;
 
 // Add new classes
 cropElement.classList.add('btn', 'btn-info', 'btn-lg');

 // Add new icon
 let newIcon = document.createElement('i');
 newIcon.classList.add('fa-brands', 'fa-pagelines');
 cropElement.appendChild(newIcon);


                  setPhosphorus("");
                  sethumid(0);
                  setPhosphorus(0);
                  setpotassium(0);
                  setph(0);
                  setnitrogen(0);
                //   setrain(0);
                  
                   setstate(state+""); 
                props.handleChange();

                setcropLoad(false);
                
        }
        

        useEffect(() => {

        }, [Loading,state,Phosphorus,humid,Phosphorus,potassium,ph,nitrogen,change])


        useEffect(() => {
          
            setPhosphorus("");
            sethumid(0);
            setPhosphorus(0);
            setpotassium(0);
            setph(0);
            setnitrogen(0);
             setstate(state+""); 
          return () => {
            setPhosphorus("");
            sethumid(0);
            setPhosphorus(0);
            setpotassium(0);
            setph(0);
            setnitrogen(0);
             setstate(state+""); 
          }
        }, [crop])
        
        
          {/*
        1.temperature 
        2.humidity
        3.rainfall----> state , month 
        4.nitrogen
        */ }
    
    return (
        <div>
            <form>
                <div className="form-row">
                    <div className="col-md-4 mb-3">
                        <label htmlFor="getLocationButton">Get Weather <i className="fa-solid fa-sun fa-spin "></i> </label>
                        <input type="button" className="form-control" id="getLocationButton" value="Get Weather" required onClick={handleGetLocation} />
                        {Loading!==null && !Loading && <>
                        <p>
                        <i className="fa-solid fa-map-pin fa-fade"></i> {state} <br/>    
                        {"It's "+condition.text} <img style={{width:"25%"}}  src={condition.icon}/>  <br/>
                        <i className="fa-solid fa-temperature-three-quarters fa-xl "></i> : {temp}°C  <br/>
                        <i className="fa-solid fa-droplet fa-lg"></i> : {humid} %<br/>
                    
                       
                        </p>
                        </> }
                        {
                           Loading!==null && Loading===true && <p className='fa-fade'>Loading....</p>
                        }

                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="validationDefault01">Nitrogen (kg/ha)</label>
                        <input type="text" className="form-control" id="validationDefault01" placeholder="Nitrogen" onChange={handleNitrogenChange} value={nitrogen} required />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="validationDefault02">Potassium (kg/ha)</label>
                        <input type="text" className="form-control" id="validationDefault02" placeholder="Potassium" onChange={handlePotassiumChange} value={potassium} required />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="validationDefault03">Phosphorus (kg/ha)</label>
                        <input type="text" className="form-control" id="validationDefault03" placeholder="Phosphorus" value={Phosphorus} onChange={handlePhosChange} required />
                    </div>
                   
                    <div className="col-md-4 mb-3">
                        <label htmlFor="validationDefault04">pH </label>
                        <input type="text" className="form-control" id="validationDefault04" placeholder="pH" value={ph} onChange={handlephChange}  required />
                    </div>
                    <div className="col-md-4 mb-3">
                        <button className="btn btn-success" type="submit" onClick={(e)=>{e.preventDefault();handleClick();handlechange();    }}  >Predict Crop</button>
                    </div>
                    {
                        rainLoad=== true && <> <p className='fa-fade' style={{color:"blue"}} >Collecting  RainFall Info... </p><img style={{width:"20%"}} src={Load} ></img> </>
                    }
                     {
                      rainLoad===false &&  cropLoad=== true && <> <p className='fa-fade' style={{color:"green"}} >Predicting Best Crop... </p><img style={{width:"20%"}} src={Load} ></img> </>
                    }
                     <div>
                        <p id="crop">

                        </p> 
                    </div> 
                </div>
            </form >
        </div >
    )
}
