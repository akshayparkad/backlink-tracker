import "./style.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import request from "../../request/request";


const Registration = () => {

  let [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  let [error, setError] = useState({
    errorName: "",
    errorEmail: "",
    errorcity: "",
    errorPassword: "",
    errorRePassword: "",
    errorType: "",
  });

  const [regerror, setRegerror] = useState(null);

  const navigate = useNavigate();


  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();


    if (validate()) {

      const response = await request.register(data);
      console.log(response);
      if (response.data.status === "ok") {
        
        navigate("/login");

      } else if (response.data.status === "error") {

        setRegerror(response.data.message)

        setTimeout(() => {
          setRegerror(null)
        }, 4000);

      }
    }
  };

  var validate = () => {
    error = {};
    const nameregx = /^([a-z]+(-| )?)+$/i;
    const emailregx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const Passwordregx =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    // validation

    if (!data.name) {
      setError({ errorName: "*Name is required" });
      return false;
    } else if (!data.name.match(nameregx)) {
      setError({ errorName: "*Invalid name" });
      return false;
    } else {
      setError({ errorName: "" });
    }

    if (!data.email) {
      setError({ errorEmail: "*Email is required" });
      return false;
    } else if (!data.email.match(emailregx)) {
      setError({ errorEmail: "*Invalid email" });
      return false;
    } else {
      setError({ errorEmail: "" });
    }

    if (!data.password) {
      setError({ errorPassword: "*Password is required" });
      return false;
    } else if (!data.password.match(Passwordregx)) {
      setError({
        errorPassword: "*Password must be like Abcde@123",
      });
      return false;
    } else {
      setError({ errorPassword: "" });
    }

    if (!data.confirmPassword) {
      setError({ errorRePassword: "*Confirm password is required" });
      return false;
    } else if (data.password !== data.confirmPassword) {
      setError({
        errorRePassword: "*Password does not match",
      });
      return false;
    } else {
      setError({ errorRePassword: "" });
      return true;
    }
  };

  console.log(regerror);

  return (

    <>
      <h1 style={{ textAlign: "center", textShadow: "1px 1px #2c3e50" }}>
        Create Account
      </h1>
      <div className="container-signup">

        <form onSubmit={handleSubmit}>

          <div>
            <label htmlFor="username">Name</label>
            <input
              name="name"
              type="text"
              placeholder="Enter Your Name"
              onChange={handleChange}
              className="form-control shadow-none"
            />
          </div>


          <span className="text-danger">{error.errorName}</span>

          <div>
            <label htmlFor="email">Email-Id</label>

            <input
              name="email"
              type="email"
              placeholder="Enter Your Email-Id"
              onChange={handleChange}
              className="form-control shadow-none"
            />

            <span className="text-danger">{error.errorEmail}</span>
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
            <span className="text-danger">{error.errorPassword}</span>
          </div>

          <div>
            <label htmlFor="repass">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              onChange={handleChange}
              className="form-control shadow-none"
            />

            <span className="text-danger">{error.errorRePassword}</span>

          </div>
          <p className="login-link-signup">
            Already have an account? <Link to="/login"> Sign In </Link>
          </p>

          {regerror !== null ? <div id="fail-box-1">{regerror}</div> : null}

          <button
            type="submit"
            className="auth-btn"
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Registration;