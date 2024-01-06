import "./style.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import request from "../../request/request";
import { useAuth } from "../../context/AuthContext";


const Login = () => {

    var navigate = useNavigate();
    var [errorEmail, setEmail] = useState("");
    var [errorPassword, setPassword] = useState("");
    let [data, setData] = useState();
    const [regerror, setRegerror] = useState(null);

    const { _login } = useAuth();
  
    var handleChange = (event) => {
      setData({ ...data, [event.target.name]: event.target.value });
    };
  
    var handleSubmit = async (event) => {

      event.preventDefault();

      const response = await request.login(data);

  
        if (response.data.status === 'ok') {  

          sessionStorage.removeItem('token'); //removing already existed token in case use relogin

          console.log(response.data.user);

          _login(response.data.user); //adding to context

          // const name = {name: response.data.user.name}

          //sessionStorage.setItem('jwt-token', response.data.user.token);
  
          setEmail("");

          setPassword("");
          //sessionStorage.setItem("jwtToken", "Bearer " + response.data.jwtToken);
            navigate('/dashboard');
         
        }else {

            setRegerror(response.data.message)

            setTimeout(() => {
                setRegerror(null)
              }, 4000);
        }
    
    };
  

  return (

    <>
      <h1 style={{ textAlign: "center", textShadow: "1px 1px #2c3e50" }}>
        Sign In
      </h1>
      <div className="container-signup">

        <form onSubmit={handleSubmit}>

          <div>
            <label htmlFor="email">Email-Id</label>

            <input
              name="email"
              type="email"
              placeholder="Enter Your Email-Id"
              onChange={handleChange}
              className="form-control shadow-none"
            />

            <span className="text-danger">{errorEmail}</span>
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter Your Password"
              onChange={handleChange}
              className="form-control shadow-none"
            />
            <span className="text-danger">{errorPassword}</span>
          </div>


          <p className="login-link-signup">
          Don't have an account?  <Link to="/register"> Sign Up </Link>
          </p>

          {regerror !== null ? <div id="fail-box-1">{regerror}</div> : null}

          <button
            type="submit"
            className="auth-btn"
          >
            Login
          </button>

        </form>
      </div>
    </>
  );
};

export default Login;