import React from 'react';
import Card from './Card';
import cropguide from '../assets/cropguide.jpg';
import './CropGuide.css'; // Import the CSS file
import img1 from '../assets/image1.jpg'
import img2 from '../assets/image2.jpg'
import img3 from '../assets/image3.jpg'
import img4 from '../assets/image4.jpg'

function CropGuide() {
  return (
    <div className="CropGuide">
        
      <div>
        <img src={cropguide} className="img-fluid cropguide-image" alt="Crop Guide" />
      </div>
      <div className="cards-container">
        <Card  image={img3} text='Please explore crop prediction here ' id='1' heading='Crop Predictor' />
        <Card   image={img4}   text='Please explore fertilizer prediction here ' id='2' heading='Fertilizer Predictor' />
        <Card image={img2} text='Please explore rainfall prediction here ' id='3' heading='Rainfall Predictor' />
        {/* <Card image={img3} text='Please explore yeild prediction here ' id='4' heading='Yeild Predictor' /> */}
      </div>
    </div>
  );
}

export default CropGuide;
