import React from 'react'
import "./About.css"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function About() {
  return (
    
    <div className="bg">
    <Navbar />
    <div>&nbsp;</div>
    <div>&nbsp;</div>
    <div>&nbsp;</div>
    <div className="card-holder">
    <h1>About Us</h1>
    <p className="abot text-black" style={{textAlign:"justify"}}>
      EDUMAR also known as Educational Grammar is a website-based English quiz that focuses on grammar questions.
      Each level quiz can contain 30 questions for the easiest 
      to 135 questions for the most difficult and each question is always different. 
      This website is very useful to practice your English grammar skills and of course it is free.
    </p>
    
    </div>
    <div>&nbsp;</div>
    <div>&nbsp;</div>
    <div>&nbsp;</div>
    <Footer />
    

    
      </div>
      
  )
}

export default About