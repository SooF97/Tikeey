import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col w-full md:w-3/4 lg:w-1/2 max-w-screen-md mx-auto p-4 gap-4">
      <div className="flex flex-col md:flex-row items-center md:space-x-4 rounded-lg ">
        <div className="w-full md:w-1/2">
          <img
            src="/create.png"
            alt="create"
            className="w-[70%] max-w-[60vh] object-contain z "
          />
        </div>
        <div className="w-full md:w-1/2 p-4 flex flex-col items-center md:items-start">
          <Link href="/create">
            <button className=" bg-gray-900 text-white py-3 px-6 rounded-md font-semibold shadow-md transform hover:scale-105 transition-all duration-300">
              Create Event
            </button>
          </Link>
          <p className="mt-4 text-gray-600">
            Unlock Limitless Possibilities with Tikeey: Power Your Events to New
            Heights!
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center md:space-x-4  rounded-lg ">
        <div className="w-full md:w-1/2">
          <img
            src="/purchase.png"
            alt="purchase"
            className="w-[70%] max-w-[60vh] object-contain z"
          />
        </div>
        <div className="w-full md:w-1/2 p-4 flex flex-col items-center md:items-start">
          <Link href="/buy">
            <button className=" bg-gray-900 text-white py-3 px-6 rounded-md font-semibold shadow-md transform hover:scale-105 transition-all duration-300">
              Buy Tickets
            </button>
          </Link>
          <p className="mt-4 text-gray-600">
            Experience the Ultimate Event Adventure: Grab Your Tickets on Tikeey
            Today and Make Memories to Last a Lifetime!
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
