import { Footer } from "flowbite-react";
import { NavLink } from "react-router-dom";

function MainFooter() {
  return (
    <Footer id="footer" className="w-full bg-white shadow dark:bg-gray-800 md:flex md:items-center md:justify-between mt-0" style={{ marginTop: '0px' }}>
      <Footer.Copyright by="FairPrice™" year={2024} className="p-4" />
      <Footer.LinkGroup className="pr-4">
        <NavLink to="/about" className="p-4">About</NavLink>
        <NavLink to="/about"className="p-4">Privacy Policy</NavLink>
        <NavLink to="https://github.com/Belaquila/fairprice-backend" className="p-4">Github</NavLink>
        <NavLink to="https://www.linkedin.com/in/ahmed-belabdia-a19118128/" className="p-4">Contact</NavLink>
      </Footer.LinkGroup>
    </Footer>
  );
}

export default MainFooter;

