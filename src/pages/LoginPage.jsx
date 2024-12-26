import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Card } from "flowbite-react";


// URL of the API/server - http://localhost:5005
const API_URL = import.meta.env.VITE_API_URL;


function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {

        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm md:max-w-md lg:max-w-lg">
      <form onSubmit={handleLoginSubmit} className="p-4">
        <h3 className="text-center font-bold mb-4">Login</h3>

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

        <label htmlFor="password">Password</label>
        <input
          className="input"
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handlePassword}
          autoComplete="off"
        />

        <button className= "mt-4" type="submit">Log In</button>
      </form>

      {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

      <p className="ml-4">Don&apos;t have an account yet?   <span><Link to={"/signup"}> Sign Up</Link></span></p>
      

      </Card>
    </div>
  );
}

export default LoginPage;
