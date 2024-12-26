import { Button, Navbar } from "flowbite-react";
import { AuthContext } from '../context/auth.context';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

export function Header() {

  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <Navbar fluid className="fixed top-0 w-full z-50 bg-white shadow-md">

      <NavLink to="/">
        <div className="flex md:order-1">
          <img src="./fairprice_logo.svg" className="mr-3 h-6 sm:h-9" alt="FairPrice Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold italic" style={{ color: 'var(--primary-color)' }}>FairPrice</span>
        </div>
      </NavLink>

      <div className="flex md:order-2">
        {!isLoggedIn && (
          <NavLink to="/login">
            <Button className="bg-[var(--secondary-color)] text-white mr-4">Log in</Button>
          </NavLink>
        )}
        {!isLoggedIn && (
          <NavLink to="/signup">
            <Button className="bg-[var(--primary-color)] text-white mr-4">Get started</Button>
          </NavLink>
        )}
        {isLoggedIn && (
          <Button onClick={logOutUser} className="bg-slate-400 text-white mr-4">Logout</Button>
        )}

        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        {isLoggedIn && (
          <NavLink to="/products">
            <Navbar.Link style={{ color: 'var(--primary-color)' }} active>My products</Navbar.Link>
          </NavLink>
        )}
        {isLoggedIn && (
          <NavLink to="/costs">
            <Navbar.Link style={{ color: 'var(--primary-color)' }} active>My costs</Navbar.Link>
          </NavLink>
        )}
        <NavLink to="/about">
          <Navbar.Link style={{ color: 'var(--primary-color)' }} active>About</Navbar.Link>
        </NavLink>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;