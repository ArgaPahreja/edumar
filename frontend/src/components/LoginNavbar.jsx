import styled from 'styled-components'
import { Link } from "react-router-dom";
import {NavDropdown} from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { logoutD } from "../redux/apiCalls";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import "./LoginNavbar.css"

const Container = styled.div`
height:60px;
background-color: #3db2d2;
`
const Img = styled.img`
    width: 10%;
    margin-left: 117px;
    margin-top: 10px;
    
`

const LoginNavbar = () => {

    const dispatch = useDispatch();

    const handleLogout = () => {
        logoutD(dispatch)
    }

    return (
        <Container>
          <div>
            
          <li  className="akun">
          <NavDropdown className='drop' id="navbarScrollingDropdown">
          <NavDropdown.Item><Link to="/login" onClick={handleLogout}>Log Out &nbsp;<LogoutIcon/></Link></NavDropdown.Item>
        </NavDropdown>
</li>
<li className='akun2'><AccountCircleIcon/></li>
              <Img src='assets/logo2.png' alt='' />
              
            </div>
        </Container>
    )
}

export default LoginNavbar