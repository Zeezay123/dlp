import React from 'react';
import Button from './Button.jsx';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="relative flex flex-col items-center justify-center p-8 md:p-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
      
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]"></div>

      <div className="relative text-center max-w-3xl">
        <h1 className="text-2xl md:text-4xl font-extrabold leading-snug">
          Ready to Take the Next Step <br className="hidden md:block" /> Toward
          Your Future Career?
        </h1>
        <p className="mt-4 text-gray-200 text-sm md:text-lg">
          Join hundreds of successful students who have turned their ambitions
          into reality with us. Your journey starts here.
        </p>

        <div className="mt-6 flex items-center justify-center">
        <Link to={'https://portal.delsu.edu.ng/'}> <Button
            className="font-bold px-6 py-3 md:px-8 md:py-4 text-lg  text-blue-700 rounded-full shadow-lg flex items-center gap-3 hover:scale-105 transition-transform"
            text="Apply Now"
            icon={<FaArrowRight className="text-blue-600" />}
          /></Link> 
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
