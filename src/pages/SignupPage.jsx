import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Button, Label, Checkbox, TextInput } from "flowbite-react";
import '../css/App.css'

// Import the string from the .env with URL of the API/server - http://localhost:5005
const API_URL = import.meta.env.VITE_API_URL;


function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();


  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);


  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios.post(`${API_URL}/auth/signup`, requestBody)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <Card className="w-full max-w-sm md:max-w-md lg:max-w-lg">

        <form onSubmit={handleSignupSubmit} className="p-4">

          <h3 className="text-center font-bold mb-4">Sign Up</h3>

          <label className="label" htmlFor="email">Email</label>
          <input
            className="input"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleEmail}
            autoComplete="off"
          />

          <label className="label" htmlFor="password">Password</label>
          <input
          className="input"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handlePassword}
            autoComplete="off"
          />

          <label className="label" htmlFor="name">Name</label>
          <input
          className="input"
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleName}
            autoComplete="off"
          />

          <button className= "mt-4" type="submit">Create Account</button>
          
        </form>

        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

        <p className="ml-4">Already have an account?   <span><Link to={"/login"}>Log in</Link></span></p>
        


      </Card>
    </div>

  )
}

export default SignupPage;