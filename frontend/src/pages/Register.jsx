import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css"

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Link = styled.a`

`;

const Register = ({role}) => {
  // State untuk menyimpan nilai input email, nama, nama belakang, peran, dan password
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [pass, setPass] = useState();

  // Hook untuk navigasi halaman
  const navigate = useNavigate();

  // Fungsi untuk menangani proses registrasi
  const handleRegister = async (e) => {
    e.preventDefault();
    const registered = {
      role: role,
      firstname: name,
      lastname: lastName,
      email: email,
      password: pass,
    };
    console.log(registered);
    axios.post("http://localhost:5000/users/", registered).then((response) => {
      console.log(response.status);
      console.log(response.data);
    });

    navigate("/login");
  };

  return (
    <>
      <Navbar />
      <div className="gradient">
      <div className="greetings">
      <h1> Hi... &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1>
      <h1> Welcome to &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1>
      <h1>EDUMAR :)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1>
        <img src="./assets/greating-image.png" className='log' alt="" height={400} width={400}/>
      </div>
      <div className="container-login">
        <div className="login-box">      
          <h2>Register</h2> 
            <Form onSubmit={handleRegister}>
              <input
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input className="first"
                placeholder="First Name"
                type="text"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input className="last"
                placeholder="Last Name"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <input
                placeholder="Password"
                type="password"
                onChange={(e) => setPass(e.target.value)}
                required
              />
              <button className="sub" type="submit">Submit</button>
            </Form>
            <label>Already have an account?</label><Link href="/login"><a>&nbsp;Login!</a></Link>
            </div>
          </div>
        </div>
        <Footer />
    </>
  );
};

export default Register;
