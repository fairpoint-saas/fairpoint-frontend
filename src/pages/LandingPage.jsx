import React from "react";
import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";
import { AuthContext } from '../context/auth.context';
import { useContext } from 'react';

const LandingPage = () => {

  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <div className="flex flex-col min-h-screen">
      


      {/* Main Content */}
      <main className="flex-grow bg-gray-100 py-10">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to fairprice
          </h1>
          <p className="text-gray-600 mb-8">
            Simplify your pricing with our intuitive tool and services.
          </p>

          {/* Cards */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="custom-card">
              <div className="image-container">
                <img
                  src="payment_processors.jpg"
                  alt="Payment Processors"
                  className="w-full"
                />
              </div>
              <h2 className="text-xl font-bold mb-2">Payment Processors</h2>
              <p className="text-gray-600">
                Scale securly your processing business with our advanced pricing engine.
              </p>
            </Card>
            <Card className="custom-card">
              <div className="image-container">
                <img
                  src="online_business_retailing.jpg"
                  alt="Online Business Retailing"
                  className="w-full"
                />
              </div>
              <h2 className="text-xl font-bold mb-2">Online Business Retailing</h2>
              <p className="text-gray-600">
                Enhance your online retail business pricing with our comprehensive tool.
              </p>
            </Card>
            <Card className="custom-card">
              <div className="image-container">
                <img
                  src="local_businesses.jpg"
                  alt="Local Businesses"
                  className="w-full"
                />
              </div>
              <h2 className="text-xl font-bold mb-2">Local Businesses</h2>
              <p className="text-gray-600">
                Connect and grow your local business with our tailored solutions.
              </p>
            </Card>
          </div>


          {!isLoggedIn && <Link to="/signup">
          <Button className="bg-[var(--secondary-color)] text-white mt-5">
            Get Started
          </Button>
          </Link>}

        </div>
      </main>
  


    </div>
  );
};

export default LandingPage;
