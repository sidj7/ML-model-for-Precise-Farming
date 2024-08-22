

import React, { useState, useEffect } from 'react';
import video from '../assets/video.mp4';
import './home.css';



function Home() {
  const headings = [
    'Seamless Security for Every User',
    'Precision at Your Fingertips',
    'Simplify Farming, Enrich Life',
    'Harvesting Data, Growing Success',
    'Future-Proof Your Farm',
    'From Seed to Success'
  ];
  const icons = [
    "fa-solid fa-house",
    "fa-solid fa-house",
    "fa-solid fa-house",
    "fa-solid fa-house",
    "fa-solid fa-house",
    "fa-solid fa-house"
  ]


  const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0);
  const [currenticons, setcurrenticons] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadingIndex((prevIndex) =>
        (prevIndex + 1) % headings.length
      );
      setcurrenticons((prevIndex) =>
        (prevIndex + 1) % icons.length
      );
    }, 2500); // Adjust the interval as needed (3000ms = 3 seconds)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fullscreen-bg">
      <video className="fullscreen-bg__video" loop autoPlay muted>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="fullscreen-bg__content"   >
        <p className="mx-4 "   >Welcome to the Field of Tomorrow</p>


        <div style={{ display: "flex" }}>
          <div className="fade-in-heading-container">
            {headings.map((heading, index) => (
              <p
                key={index}
                style={{ color: "", opacity: currentHeadingIndex === index ? 1 : 0 }}
                className={currentHeadingIndex === index ? "mx-4 fade-in-heading fa-fade" : "d-none"}
              >
                {heading}&nbsp; 


              </p>
            ))}
          </div>



        </div>

         {/*<div style={{ display: "flex", cursor: "pointer" }}>
          <p className='mx-3' style={{ color: "white" }}>
            HEADING ONE HERE
          </p>
          <p className='mx-3' style={{ color: "white" }}>
            HEADING TWO HERE  </p>

          <p className='mx-3' style={{ color: "white" }}>
            HEADING THREE HERE
          </p>

          <p className='mx-3' style={{ color: "white" }}>
            HEADING FOUR HERE
          </p>

            </div>*/ }
      </div>
    </div>
  );
}

export default Home;
