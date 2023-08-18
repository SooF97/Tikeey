"use client";
import React, { useState, useEffect } from "react";
import Tikeey from "../Tikeey.json";
import { ethers } from "ethers";

import Loading from "react-loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = ({ params }) => {
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [limit, setLimit] = useState();
  const [ticketsSold, setTicketsSold] = useState();
  const [city, setCity] = useState();
  const [timeDate, setTimeDate] = useState();
  const [supply, setSupply] = useState();

  const [fetching, setFetching] = useState(false);

  const [buy, setBuy] = useState(false);

  function handleQuantity(e) {
    let value = e.target.value;
    console.log(value);
    setQuantity(value);
  }

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
        const data = await contract.eventMapping(params.eventId);
        console.log("data from smart contract", data);
        setTitle(data[2]);
        setDescription(data[3]);
        setPrice(data[6].toString());
        setImage(data[4]);
        setTimeDate(data[9]);
        setCity(data[10]);
        setSupply(data[5].toString());
        setTicketsSold(data[8].toString());
        setLimit(data[7].toString());
        setFetching(true);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function purchaseTicket() {
    setBuy(true);
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      try {
        const contract = new ethers.Contract(
          Tikeey.address,
          Tikeey.abi,
          signer
        );
        const priceToPay = (price * quantity).toString();
        const transaction = await contract.buyTickets(
          params.eventId,
          quantity,
          { value: priceToPay }
        );
        await transaction.wait();
        toast(`You bought ${quantity} ticket(s) successfully!`, {
          type: "success",
        });
        console.log(transaction);
      } catch (error) {
        console.log(error);
      }
    }
    setBuy(false);
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
    <>
      <ToastContainer />
      {fetching && (
        <div className="container mx-auto p-4">
          <div className="grid md:grid-cols-2 gap-4 items-center">
            {/* Product Image Section */}
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img src={image} alt="productImage" className="w-full h-auto" />
            </div>

            {/* Product Details and Quantity Section */}
            <div className="px-4 py-6">
              <h1 className="text-3xl font-bold mb-4">{title}</h1>
              <p className="text-gray-600 mb-4">{description}</p>
              <p className="text-2xl font-semibold mb-2">
                {city} on {timeDate}
              </p>
              <p className="text-2xl font-semibold mb-2">
                Price: {weiToEth(price)} MATIC
              </p>

              <p className="text-2xl font-semibold mb-2">
                {ticketsSold}/{supply} Supply
              </p>
              <p className="text-2xl font-semibold mb-2">
                Limit to buy: {limit}
              </p>

              {/* Quantity Input */}
              <div className="flex items-center mb-4">
                <label htmlFor="quantity" className="mr-2">
                  Quantity:
                </label>

                <input
                  type="number"
                  id="quantity"
                  className="w-12 px-2 py-1 text-center border border-gray-400 rounded-lg focus:outline-none"
                  onChange={handleQuantity}
                />
              </div>

              {/* Purchase Button */}
              <button
                className="block w-full bg-blue-500 text-white px-4 py-3 rounded-md shadow hover:bg-blue-600"
                onClick={purchaseTicket}
              >
                Purchase {quantity} {quantity === 1 ? "ticket" : "tickets"}
              </button>
              {buy && (
                <div className="mt-2 flex justify-center">
                  <Loading type="spin" color="black" height={25} width={25} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
