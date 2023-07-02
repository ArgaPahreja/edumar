import React from "react";
import { Link } from "react-router-dom";
import './Hero.css'



const Hero = () => {
  return (
    <>
    <section className='home'>
      <div className='container flex'>
        <div className='left '>
          <h1 className="up">Let's Level Up Your</h1>
          <h1 className="down">Grammar With Us!</h1>
          <Link to="/register"><button className="margin-button" className='primary-btn'>Get Started!</button></Link>
        </div>
          <div >
            <img src='./assets/home.png' alt='' />
          </div>
        {/* </div> */}
      </div>
    </section>
    <div id=''>
      &nbsp; 
      </div>
      <div id=''>
      &nbsp; 
      </div>
      <div id=''>
      &nbsp; 
      </div>
      <div id=''>
      &nbsp; 
      </div>
      <div id=''>
      &nbsp; 
      </div>

  </>
  );
};

export default Hero;
