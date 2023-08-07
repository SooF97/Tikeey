"use client";
import React from "react";
import { motion } from "framer-motion";

const Hero2 = () => {
  return (
    <div className="flex flex-col  justify-center items-center mt-10 ">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="text-center mb-8 md:mb-0 md:m-4 "
      >
        <motion.h1 className="text-2xl md:text-4xl font-bold text-gray-800 mr-4 ml-4 ">
          Unleash the Future of Events with{" "}
          <span className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-900 to-orange-500 text-transparent bg-clip-text ">
            NFT Ticketing
          </span>{" "}
          on the Blockchain
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg text-gray-600 mr-4 ml-4 mt-2"
        >
          Step into the future of event ticketing with NFTs on the blockchain -
          a seamless, secure, and unique experience, bidding farewell to fraud
          and scalping, while empowering attendees to effortlessly transfer,
          resell, or collect their exclusive event tickets within a transparent
          ecosystem, leaving behind the limitations and frustrations of
          traditional ticketing.
        </motion.p>
      </motion.div>
      <motion.img
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        src="/hero_image.png"
        alt="3D Image"
        className="w-[70%] max-w-[60vh] object-contain z"
      />
    </div>
  );
};

export default Hero2;
