"use client";
import React from "react";
import Link from "next/link";

const Hero3 = () => {
  return (
    <section className=" py-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left grid */}
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6">
              An end to ticket fraud
            </h1>
            <p className="text-black text-lg mb-8">
              Our tickets are registered on the blockchain and connected to
              visitor’s smartphones, making fraud impossible.
            </p>
            <Link href="/app" target="_blank">
              <button className="hidden md:flex bg-gray-900 text-white py-3 px-6 rounded-md font-semibold shadow-md transform hover:scale-105 transition-all duration-300 ">
                Launch App
              </button>
            </Link>
          </div>

          {/* Right grid */}
          <div className="flex justify-center">
            <img
              src="/secure.png"
              alt="image"
              className="w-[70%] max-w-[60vh] object-contain z "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero3;
