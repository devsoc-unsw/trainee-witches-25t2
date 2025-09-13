import './Login.css';
import '../LoginReg/LoginReg.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const backend_url = "http://localhost:8080";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      alert('All fields are required');
      return;
    }

    try {
      // Call the register API
      const response = await axios.post(`${backend_url}/auth/login`, {
        email: email,
        password: password,
      });

      localStorage.setItem('token', response.data.token);

      navigate('/dishcover');
    } catch (error) {
      alert('Login failed: ' + JSON.stringify(error.response.data.message));
    }
  }


  return (
    <div className="loginReg-page">
      <header className="LoginReg-header-box">
        <img src="../MainLogo.png" alt="Dishcovery logo" className="LoginReg-header-image" />
        
        <div className="LoginReg-header">
          <h1 className="LoginReg-title">Dishcovery</h1>
        </div>
      </header>

      <div className="loginReg-box">
        <h2 className="loginReg-pageTitle">Login</h2>
        
        <Form.Label className="loginReg-inputDesc" htmlFor="inputPassword5">Enter your email</Form.Label>
        <Form.Control
          type="email"
          className="loginReg-input"
          id="loginReg-inputPassword"
          aria-describedby="passwordHelpBlock"
          placeholder="123@email.com"
          onChange={e => setEmail(e.target.value)}
        />

        <br/>

        <Form.Label className="loginReg-inputDesc" htmlFor="inputPassword5">Enter your password</Form.Label>
        <Form.Control
          type="password"
          className="loginReg-input"
          id="loginReg-inputEmail"
          aria-describedby="emailHelpBlock"
          placeholder="password123"
          onChange={e => setPassword(e.target.value)}
        />

        <br/>

        <div className="loginReg-buttonBoxCenter">
          <div className="loginReg-buttonBox">
            <Button onClick={handleLogin} className="loginReg-button" variant="danger">Login</Button>

            <div className="loginReg-lineBox">
              <div className="horizontal-line"></div>
                <span className="loginReg-or">or</span>
              <div className="horizontal-line"></div>
            </div>

            <div className="loginReg-buttonDesc">Don't have an account?</div>
            <Button onClick={() => navigate('/register')} className="loginReg-button" variant="danger">Register</Button>
          </div>
        </div>
      </div>

      <footer className="loginReg-footerBar">
        <p className="footer-text">© 2025 Dishcovery. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Login;
