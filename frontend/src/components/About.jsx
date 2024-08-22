import React from 'react'
import "./About.css"
import Form3 from './Form3';
function About() {
  return (
    <div className='section-abt-us'>
        <div className='Heading-abt-us'>
          <p>Welcome to AgriAdvisor - Unveiling Precision Farming Excellence!</p>
          <p>
          AgriAdvisor is the result of the collaborative efforts of a dynamic team, each contributing their unique expertise to create a groundbreaking platform. Meet the talented individuals who brought their skills to the table:
          </p>
        </div>
        <div className='container-abt'>
        
          <div className='person-card'>
            <img src="" alt="" />
            <p>Akshit Tomar - Backend Maestro:
In charge of the robust backend infrastructure, Akshit Tomar utilized his expertise in Node.js, Express.js, and MongoDB to create the engine that powers AgriAdvisor. His dedication to crafting a scalable and efficient backend ensures that the platform runs seamlessly, providing farmers with reliable data and predictions.</p>
          </div>
          
          <div className='person-card'>
            <img src="" alt="" />
            <p>Sabhya Mittal - Analytics and Machine Learning Dynamo:
Sabhya Mittal brought his passion for data analytics and machine learning to the forefront of AgriAdvisor. Using Python, he energized the platform with advanced algorithms and data-driven insights. Sabhya's commitment to harnessing the power of data ensures that AgriAdvisor's predictions are not only accurate but also at the forefront of technological innovation.</p>
          </div>

          
          <div className='person-card'>
            <img src="" alt="" />
            <p>Siddharth Jain - Frontend Virtuoso:
Responsible for the user interface that brings AgriAdvisor to life, Siddharth Jain utilized React, Vite, and Bootstrap to develop a sleek and user-friendly frontend. His focus on creating an intuitive user experience ensures that farmers can easily navigate and leverage the platform's capabilities to enhance their farming practices.</p>
          </div>

          
          <div className='person-card'>
            <img src="" alt="" />
            <p>Shashank Prajapati - Resource Maven and Project Analyst:
Shashank Prajapati played a pivotal role in the project as a resource finder and project analyst. His efforts in identifying essential resources and meticulously analyzing project dynamics ensured a well-rounded and strategically executed development process.</p>


          </div>
          <div className='others-abt'>
            <span>Our Vision:</span>
            <p>At AgriAdvisor, we envision a future where farmers have access to cutting-edge technology that simplifies decision-making in agriculture. From backend reliability to advanced analytics, seamless frontend experiences, and meticulous project analysis, AgriAdvisor aims to be the go-to platform for farmers seeking precision in their farming practices.</p>
          </div>
          <div className='others-abt'>
            <span>Connect with Us:</span>
            <p>For a closer look at the technical aspects of AgriAdvisor, explore our GitHub repository here. Collaboration is key, and we welcome developers and enthusiasts to join us on our journey.

To reach out to our team or inquire about AgriAdvisor, please contact us at [insert-email-address].

Join us in revolutionizing agriculture with AgriAdvisor - where expertise meets innovation for a smarter and more sustainable farming future.</p>
          </div>
          
        </div>

    </div>
  )
}

export default About;