import React from "react"
import { Link } from "react-router-dom"
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import "./Footer.css"


const Footer = () => {
  return (
    <>
      <footer>
        <div className='container grid1'>
          <div className='box'style={{textAlign:"justify"}}>
          <h4>EDUMAR</h4>
            <p>EDUMAR also known as Educational Grammar is a website based English quiz that focuses on grammar questions. 
      This website is very useful to practice your English grammar skills and of course it is free.</p>
            <div className='SocailIcon'>
              <i className="facebook"><FacebookIcon/></i>
              <i className="instagram"><InstagramIcon /></i>
              <i className="twitter"><TwitterIcon/></i>
              <i className="youtube"><YouTubeIcon /></i>
            </div>
          </div>

          <div className='box'>
            <h4>Difficulty</h4>
            <ul>
              <li>Easy</li>
              <li>Medium</li>
              <li>Hard</li>
              <li>Expert</li>
              {/* <li>The Final</li> */}
            </ul>
          </div>

          <div className='box'>
            <h4>Help & Support</h4>
          <ul>
              <li><Link to='/' style={{textDecoration: "none", color : "black"}}>Home</Link></li>
              <li><Link to='/login' style={{textDecoration: "none", color : "black"}}>Login</Link></li>
              <li><Link to='/about' style={{textDecoration: "none", color : "black"}}>About</Link></li>
              <li><Link to='/register' style={{textDecoration: "none", color : "black"}}>Register</Link></li>
              
              {/* <li>Help</li> */}
            </ul>
          </div>

          <div className='box'>
            <h4>Get in Touch</h4>
            <div className='icon'>
              <label><LocationCityIcon />&nbsp;&nbsp;Location :&nbsp; &nbsp; &nbsp; 
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <a href="https://goo.gl/maps/TcqYhHHN9V8eTntG7" className="text-black">Sukabumi, Indonesia</a></label>
            </div>
            <div className='icon'>
              <label> <PhoneIcon />&nbsp;&nbsp; Phone :  
               &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <a href="https://wa.me/+6285860301670/?text=Assalamualaikum..." className="text-black">+62 858-6030-1670</a></label>
            </div>
            <div className='icon'>
              <label><EmailIcon />&nbsp;&nbsp; Email : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="mailto:argapahreja8@gmail.com" className="text-black">support@edumar.com</a></label>
            </div>
          </div>
        </div>
        <div className='d-flex justify-content-center legal container'>
          <p className="copy" style={{textAlign:"center"}}>Copyright @2022. All rights reserved.</p>
        </div>
        
      </footer>
    </>
  )
}

export default Footer
