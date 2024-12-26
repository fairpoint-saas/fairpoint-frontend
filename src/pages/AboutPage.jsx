import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { AuthContext } from '../context/auth.context';
import { useContext } from 'react';

const AboutPage = () => {

  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <div className="flex-grow p-5">
      <h1>About FairPrice</h1>
      <p>
        FairPrice is a project aimed at providing business owners with the best tools to control their pricing strategies.
        It enables them create new products and offerings while ensuring a positive margin for their financial health.
      </p>

      <h1>How it works</h1>
      <ol className="list-decimal ml-5">
        <li>Create new products and offerings.</li>
        <li>Manage the costs of the ingredients and materials that go into the products.</li>
        <li>Set the price of the products based on the costs and target profit margin fixed at 20% for the moment.</li>
      </ol>

      <p className='mt-5'>FairPrice is a project developed by Ahmed Belabdia as part of the final project at IronHack.</p>

      <h1>About the Author</h1>

      <div className="flex items-center mt-4">
        <img
          src="/Ahmed.jpeg"
          alt="Author"
          className="w-24 h-24 rounded-full mr-4"
        />
        <p>
          This project was developed by Ahmed, a passionate engineer with a keen interest in entrepreneurship and creating solutions that make everyday tasks easier and more efficient.
          With a background in software development and data analysis and a love for technology, Ahmed strives to build applications that are both functional and user-friendly.
        </p>
      </div>
      <div className="flex space-x-4 mt-4">
        <NavLink to="https://www.linkedin.com/in/ahmed-belabdia-a19118128/" target="_blank" rel="noopener noreferrer" className="text-blue-500 inline-block flex items-center">
          <img src="LI-In-Bug.png" alt="LinkedIn Logo" className="w-7" />
        </NavLink>
        <NavLink to="https://github.com/Belaquila" target="_blank" rel="noopener noreferrer" className="text-gray-500 inline-block flex items-center">
          <img src="github-mark.png" alt="Github Logo" className="w-7" />
        </NavLink>
      </div>
      <div className="mt-6 flex justify-center">
        {!isLoggedIn && (<NavLink to="/signup">
          <Button className="bg-[var(--secondary-color)] text-white">Try Fairprice</Button>
        </NavLink>)}
      </div>
    </div>
  );
};

export default AboutPage;