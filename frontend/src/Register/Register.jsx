import './Register.css';
import '../LoginReg/LoginReg.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Register = () => {
  return (
      <div className="loginReg-page">
        <header className="LoginReg-header-box">
          <img src="../MainLogo.png" alt="Dishcovery logo" className="LoginReg-header-image" />
          
          <div className="LoginReg-header">
            <h1 className="LoginReg-title">Dishcovery</h1>
          </div>
        </header>
  
        <div className="loginReg-box">
          <h2 className="loginReg-pageTitle">Register</h2>
          
          <Form.Label className="loginReg-inputDesc" htmlFor="inputPassword5">Enter your name</Form.Label>
          <Form.Control
            type="name"
            className="loginReg-input"
            id="loginReg-inputPassword"
            aria-describedby="passwordHelpBlock"
            placeholder="Jane Doe"
          />

          <br/>
  
          <Form.Label className="loginReg-inputDesc" htmlFor="inputPassword5">Enter your email</Form.Label>
          <Form.Control
            type="email"
            className="loginReg-input"
            id="loginReg-inputPassword"
            aria-describedby="passwordHelpBlock"
            placeholder="123@email.com"
          />
  
          <br/>
  
          <Form.Label className="loginReg-inputDesc" htmlFor="inputPassword5">Enter your password</Form.Label>
          <Form.Control
            type="password"
            className="loginReg-input"
            id="loginReg-inputEmail"
            aria-describedby="emailHelpBlock"
            placeholder="password123"
          />
  
          <br/>
  
          <div className="loginReg-buttonBoxCenter">
            <div className="loginReg-buttonBox">
              <Button className="loginReg-button" variant="danger">Register</Button>
  
              <div className="loginReg-lineBox">
                <div className="horizontal-line"></div>
                  <span className="loginReg-or">or</span>
                <div className="horizontal-line"></div>
              </div>
  
              <div className="loginReg-buttonDesc">Already have an account?</div>
              <Button className="loginReg-button" variant="danger">Login</Button>
            </div>
          </div>
        </div>
  
        <footer className="loginReg-footerBar">
          <p className="footer-text">© 2025 Dishcovery. All rights reserved.</p>
        </footer>
      </div>
    );
};

export default Register;
