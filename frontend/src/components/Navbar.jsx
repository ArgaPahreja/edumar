import React, { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom"
import {NavDropdown} from 'react-bootstrap';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import "./Navbar.css"

const Navbar = () => {
    const [sidebar, setSidebar] = useState(false)
    window.addEventListener("scroll", function () {
      const header = document.querySelector(".header")
      header.classList.toggle("active", window.scrollY > 180)
    })
    return (
      <>
        <header className='header'>
          <div className='container flex'>
            <div className='logo'>
              <img src='assets/logo2.png' alt='' />
            </div>
            <div>
              <ul>
                <li>
                  <Link to='/' style={{textDecoration: "none", color : "black"}}>Home</Link>
                  <Link to='/login' style={{textDecoration: "none", color : "black"}}>&nbsp;&nbsp;&nbsp;Login</Link>
                  <Link to='/about' style={{textDecoration: "none", color : "black"}}>&nbsp;&nbsp;&nbsp;About&nbsp;</Link>
                  {/* <li className="bot"><AccountCircleIcon/></li>
          <NavDropdown className='top' id="navbarScrollingDropdown">
          <NavDropdown.Item className="mid"><Link to="/login">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Logout <LogoutIcon/></Link></NavDropdown.Item>
        </NavDropdown> */}

                </li>
              </ul>
            </div>
          </div>
        </header>
      </>
    )
  }

export default Navbar