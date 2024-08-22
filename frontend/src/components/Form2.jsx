import React,{useState,useEffect} from 'react'
import Load from '../assets/Bars.gif';
import SoilForm from './SampleForm';
import { useAuth0 } from "@auth0/auth0-react";
export default function Form1(props) {

    const host = "http://localhost:3000";

    const handlechange = props.handleChange;
    const change = props.change; 
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
    const [moisture, setMoisture] = useState(0);
    const [soilType, setSoilType] = useState('');
    const [cropType, setCropType] = useState('');


    const { user, isAuthenticated, isLoading } = useAuth0();

// Extract unique values for Soil Type and Crop Type
const uniqueSoilTypes = [...new Set([
    'Sandy', 'Loamy', 'Black', 'Red', 'Clayey'
])];

const uniqueCropTypes = [...new Set([
    'Maize', 'Sugarcane', 'Cotton', 'Tobacco', 'Paddy', 'Barley',
    'Wheat', 'Millets', 'Oil seeds', 'Pulses', 'Ground Nuts'
])];

    
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
 let cropElement = document.getElementById('fertilizer');
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
                if(State==="UTTARAKHAND")
                    State = "UTTARANCHAL";
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

                // await getRain();


            var fetchedRain = localStorage.getItem('rain');

                const predection = "Assumed Result";
                console.log(nitrogen+" "+potassium+" "+" "+Phosphorus+" "+fetchedRain+" "+temp+" "+humid+" "+predection+" "+soilType+" "+moisture+" "+cropType)            ;


                

                    await createUser(user.email);
                    //console.log("PARAMETERS OF ADD NOTE"+title+" "+description+" "+tag);
                
                
                    const response = await fetch( `${host}/api/fertilizerprec/fertilizerrecommend`, {
                      method: 'POST',
                      headers:{
                        'Content-Type':'application/json',
                       
                      },
                      body: JSON.stringify({email:user.email,Soil_Type:soilType,Crop_Type:cropType,Temperature:temp,Humidity:humid,Nitrogen:nitrogen,Phosphorous:Phosphorus,Potassium:potassium,Soil_Moist:moisture})
                    });
                
                    const json = await response.json();
                
                
                
                 const   newCrop = json ;
                // setcrop(crop.concat(newCrop));
                console.log(newCrop.Prediction);
                localStorage.setItem("fPrediction",newCrop.Prediction);



                     // Clear previous content
                     




                     let cropElement = document.getElementById('fertilizer');
                     cropElement.innerText = ""; // Clear text content
                     cropElement.classList.remove('btn', 'btn-info', 'btn-lg'); // Remove classes
                    
                     // Remove existing icon if present
                     let icon = cropElement.querySelector('.fa-brands.fa-pagelines');
                     if (icon) {
                         cropElement.removeChild(icon);
                     }


 // Set new content
 cropElement.innerText = `Result: ${newCrop.Prediction.toUpperCase()}`;
 
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
                  
                  setnitrogen(0);
                //   setrain(0);
                  
                   setstate(state+""); 
                props.handleChange();

                setcropLoad(false);
                
        }
        

        useEffect(() => {

        }, [Loading,state,Phosphorus,humid,Phosphorus,potassium,nitrogen,change])


        useEffect(() => {
          
            setPhosphorus("");
            sethumid(0);
            setPhosphorus(0);
            setpotassium(0);
          
            setnitrogen(0);
             setstate(state+""); 
          return () => {
            setPhosphorus("");
            sethumid(0);
            setPhosphorus(0);
            setpotassium(0);
            
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
                        <input type="number" className="form-control" id="validationDefault01" placeholder="Nitrogen" onChange={handleNitrogenChange} value={nitrogen} required />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="validationDefault02">Potassium (kg/ha)</label>
                        <input type="number" className="form-control" id="validationDefault02" placeholder="Potassium" onChange={handlePotassiumChange} value={potassium} required />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="validationDefault03">Phosphorus (kg/ha)</label>
                        <input type="number" className="form-control" id="validationDefault03" placeholder="Phosphorus" value={Phosphorus} onChange={handlePhosChange} required />
                    </div>
                   
                  
                    
        <div className="col-md-4 mb-3">
          <label htmlFor="validationDefault05">Soil Moisture (%)</label>
          <input
            type="number"
            className="form-control"
            id="validationDefault05"
            placeholder="Soil Moisture"
            onChange={(e) => setMoisture(e.target.value)}
            value={moisture}
            required
          />
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
                        {uniqueCropTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
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
                        {uniqueSoilTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>


                    <div className="col-md-4 mb-3">
                        <button className="btn btn-success" type="submit" onClick={(e)=>{e.preventDefault();handleClick();handlechange();    }}  >Predict Fertilizer </button>
                    </div>
                 
                     {
                      cropLoad=== true && <> <p className='fa-fade' style={{color:"green"}} >Predicting Best Fertilizer... </p><img style={{width:"20%"}} src={Load} ></img> </>
                    }
                     <div   className={cropLoad ? "d-none" : ""} >
                        <p id="fertilizer">

                        </p> 
                    </div> 
                </div>
            </form >
        </div >
    )
}
