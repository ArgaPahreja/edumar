import Navbar from "../components/Navbar";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/apiCalls";
import "./Login.css"
import Footer from "../components/Footer";


const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Link = styled.a`

`;


const Login = () => {
  // State untuk menyimpan email dan password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Hook untuk navigasi halaman
  const navigate = useNavigate();

  // Hook untuk mengakses dispatch dari Redux
  const dispatch = useDispatch();

  // Fungsi untuk menangani proses login
  const handleLogin = (e) => {
    e.preventDefault();
    const userCheck = {
      email: email,
      password: password,
    };
    try {
      // Melakukan permintaan POST ke endpoint login
      axios
        .post("https://edumar-api.vercel.app/users/login", userCheck)
        .then((response) => {
          console.log(response.status);
          console.log(response.data);
          // Melakukan dispatch untuk menyimpan data login ke Redux store
          login(dispatch, { email, password });
          console.log("data suc");
          // Mengarahkan pengguna ke halaman dashboard setelah berhasil login
          navigate("/dashboard");
        });
    } catch {
      alert();
    }
  };

  return (
    <>
      <Navbar />

      <div className="gradient">
      <div className="greetings">
      <h1> Hallo, &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1><h1> Welcome Back!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1>
        <img src="./assets/greating-image.png" className='log' alt="" height={400} width={400}/>
      </div>
      <div className="container-login">
        <div className="login-box">      
          <h2>Log In</h2> 
            <Form onSubmit={handleLogin}>
              {/* Input email */}
              <input
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {/* Input password */}
              <input
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* Tombol login */}
              <button type="submit">Submit</button>
              </Form>
              {/* Tautan untuk membuat akun baru */}
              <label>Don't have an account?</label><Link href="/register"><a>&nbsp;Register!</a></Link>
            </div>  
          </div>
        </div>
        <Footer />
    </>
  );
};

export default Login;
