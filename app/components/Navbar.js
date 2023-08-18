"use client";
import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

import { ConnectWallet } from "@thirdweb-dev/react";

import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="text-black py-4">
      <div className="container mx-auto px-4">
        <div className="flex  justify-between items-center">
          {/* Logo Part */}
          <div>
            <Link
              href="/"
              className="flex flex-row justify-center items-center gap-2 "
            >
              <Image
                src="/logoPNG.png"
                alt="Logo"
                className="h-8 rounded-full"
                width={30}
                height={30}
              />
              <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-900 to-orange-500 text-transparent bg-clip-text">
                Tikeey
              </p>
            </Link>
          </div>

          {/* Navbar Menu */}
          <div className="hidden md:flex space-x-4">
            <Link href="/" className=" hover:uppercase hover:font-bold">
              Home
            </Link>
            <Link href="/about" className=" hover:uppercase hover:font-bold">
              About
            </Link>
            <Link href="/contact" className=" hover:uppercase hover:font-bold">
              Contact
            </Link>
            <Link href="/buy" className=" hover:uppercase hover:font-bold">
              Explore
            </Link>
          </div>

          {/* Login Button */}

          {/* <button className="hidden md:flex bg-gray-900 text-white py-3 px-6 rounded-md font-semibold shadow-md transform hover:scale-105 transition-all duration-300 ">
                Launch App
              </button> */}
          <ConnectWallet
            btnTitle="Sign in"
            className="hidden md:hidden py-3 px-6 rounded-md font-semibold shadow-md transform hover:scale-105 transition-all duration-300"
          />

          {/* Hamburger Menu */}
          <div className="md:hidden">
            <button onClick={handleToggleMenu} className="text-black">
              <HiMenuAlt3 className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Responsive Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <Link href="/" className="block hover:uppercase hover:font-bold">
              Home
            </Link>
            <Link
              href="/about"
              className="block hover:uppercase hover:font-bold"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block hover:uppercase hover:font-bold"
            >
              Contact
            </Link>
            <Link href="/buy" className=" hover:uppercase hover:font-bold">
              Explore
            </Link>

            <div className="flex space-x-4 mt-4">
              <FaTwitter className=" hover:text-gray-300" />
              <FaFacebook className=" hover:text-gray-300" />
              <FaInstagram className=" hover:text-gray-300" />
            </div>
          </div>
        )}

        {/* Social Icons */}
      </div>
    </nav>
  );
};

export default Navbar;
