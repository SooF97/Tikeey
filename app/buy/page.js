"use client";
import React, { useState, useEffect } from "react";
import Tikeey from "../Tikeey.json";
import { ethers } from "ethers";
import Link from "next/link";

const page = () => {
  const [events, setEvents] = useState([]);

  async function fetchEvents() {
    if (window.ethereum) {
      const provider = new ethers.providers.AlchemyProvider(
        "maticmum",
        "mrvXire3FFkkoWo_HFHsBmRpJDRh1snd"
      );
      try {
        const contract = new ethers.Contract(
          Tikeey.address,
          Tikeey.abi,
          provider
        );
        const data = await contract.fetchAvailableEvents();
        console.log(data);
        setEvents(data);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const weiToEth = (valueInWei) => {
    const valueInBN = ethers.BigNumber.from(valueInWei);
    const valueInEth = ethers.utils.formatEther(valueInBN);
    return valueInEth;
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 ">
      {events.map((event, index) => (
        <Link href={`/${event[0].toString()}`} key={index}>
          <div className="relative bg-white rounded-md shadow-sm overflow-hidden transform hover:scale-105 transition-all duration-300 cursor-pointer">
            <img
              src={event[4]}
              alt={`Image ${index}`}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{event[2]}</h3>
              <p className="text-gray-600">{event[3]}</p>
              <div className="mt-4 flex flex-row items-center gap-2 justify-between">
                <div className="flex flex-col">
                  <span className="text-indigo-600 font-semibold">
                    {weiToEth(event[7].toString())} MATIC
                  </span>
                  <span className="text-indigo-600 font-semibold">
                    {event[9].toString()}/{event[6].toString()} Supply
                  </span>
                  <span className="text-indigo-600 font-semibold">
                    {event[10].toString()}
                  </span>
                  <span className="text-indigo-600 font-semibold">
                    {event[11].toString()}
                  </span>
                </div>
                <button className="px-3 py-1 bg-indigo-600 text-white rounded-md transform hover:scale-105 transition-all duration-300 cursor-pointer">
                  Buy Ticket
                </button>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default page;
