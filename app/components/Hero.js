"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="flex flex-col  justify-center items-center mt-20 ">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center mb-8 md:mb-0 md:mr-4"
      >
        <motion.h1 className="text-4xl md:text-6xl font-bold text-gray-800">
          Welcome to{" "}
          <span className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-900 to-orange-500 text-transparent bg-clip-text ">
            Tikeey
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg text-gray-600"
        >
          A Blockchain-Powered DApp Turning Event Tickets into Unique NFTs!
        </motion.p>
        <Link href="/app" target="_blank">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className=" bg-gray-900 text-white py-3 px-6 rounded-md font-semibold shadow-md transform hover:scale-105 transition-all duration-300 mt-2"
          >
            Launch App
          </motion.button>
        </Link>
      </motion.div>
      <motion.img
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        src="/nft_hero.png"
        alt="3D Image"
        className="w-[70%] max-w-[60vh] object-contain z"
      />
    </div>
  );
};

export default Hero;
