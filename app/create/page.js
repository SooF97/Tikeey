"use client";
import React, { useState } from "react";
import { ethers } from "ethers";

import { useAddress } from "@thirdweb-dev/react";
import { create as ipfsHttpClient } from "ipfs-http-client";

import Tikeey from "../Tikeey.json";

import Loading from "react-loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const projectId = "2MyNroGl6iLE7zAs4P4RNLzSAES";
const projectSecret = "72901dfa73bf4a41fe20077f44f2aa0b";
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const client = ipfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

const page = () => {
  const address = useAddress();
  // use states for inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [supply, setSupply] = useState();
  const [price, setPrice] = useState();
  const [limit, setLimit] = useState();
  const [dateTime, setDateTime] = useState("YYYY/MM/DD HH:mm");
  const [city, setCity] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploadedCids, setUploadedCids] = useState([]);

  const [fileIsUploading, setFileIsUploading] = useState(false);
  const [folderIsUploading, setFolderIsUploading] = useState(false);

  const [creating, setCreating] = useState(false);

  // for select input
  const options = [
    { value: "Choose the event city..." },
    { value: "Casablanca" },
    { value: "Rabat" },
    { value: "Tangier" },
  ];

  // functions to handle inputs
  async function handleTitle(e) {
    const enteredTitle = e.target.value;
    console.log(enteredTitle);
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(address);
    }
    setTitle(enteredTitle);
  }

  function handleDescription(e) {
    const enteredDescription = e.target.value;
    console.log(enteredDescription);
    setDescription(enteredDescription);
  }
  function handleSupply(e) {
    const enteredSupply = e.target.value;
    console.log(enteredSupply);
    setSupply(enteredSupply);
  }
  function handlePrice(e) {
    const enteredPrice = e.target.value;
    const priceInWei = ethers.utils.parseEther(enteredPrice.toString());
    console.log(enteredPrice, priceInWei);
    setPrice(priceInWei);
  }
  function handleLimit(e) {
    const enteredLimit = e.target.value;
    console.log(enteredLimit);
    setLimit(enteredLimit);
  }
  function handleDateTime(e) {
    const dateAndTime = e.target.value;
    console.log(dateAndTime);
    setDateTime(dateAndTime);
  }
  function handleCity(e) {
    const enteredCity = e.target.value;
    console.log(enteredCity);
    setCity(enteredCity);
  }

  // function to upload a file to IPFS
  async function imageToIpfs(e) {
    setFileIsUploading(true);
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.io/ipfs/${added.path}`;
      console.log(url);
      setImageUrl(url);
      toast("Uploaded successfully !", { type: "success" });
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
    setFileIsUploading(false);
  }

  // function to upload a tickets folder to IPFS
  async function ticketsToIpfs(e) {
    setFolderIsUploading(true);
    const files = e.target.files;
    const filesArray = Array.from(files);
    console.log(filesArray);

    try {
      const uploadedCidsArray = [];
      var index = 0;
      for (const file of filesArray) {
        const added = await client.add(file, {
          progress: (prog) => console.log(`received: ${prog}`),
        });

        uploadedCidsArray[index] =
          "https://ipfs.io/ipfs/" + `${added.cid.toString()}`;
        index++;
      }
      console.log(uploadedCidsArray);
      setUploadedCids(uploadedCidsArray);
      toast("Uploaded successfully !", { type: "success" });
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
    setFolderIsUploading(false);
  }

  // function to create the event
  async function createEvent() {
    setCreating(true);
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      try {
        const contract = new ethers.Contract(
          Tikeey.address,
          Tikeey.abi,
          signer
        );
        const transaction = await contract.createEvent(
          title,
          description,
          imageUrl,
          uploadedCids,
          supply,
          price,
          limit,
          dateTime,
          city
        );
        await transaction.wait();
        toast("Event created successfully!", { type: "success" });
        console.log(transaction);
      } catch (error) {
        console.log(error);
      }
    }
    setCreating(false);
  }
  return (
    <>
      <ToastContainer />
      <div className="max-w-md mx-auto m-4 p-4 bg-gray-100 rounded-md shadow-md border-indigo-500">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Event title
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your event title"
            onChange={handleTitle}
            className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Event description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Your event description"
            onChange={handleDescription}
            className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="supply"
            className="block text-gray-700 font-bold mb-2"
          >
            Event supply
          </label>
          <input
            type="number"
            id="supply"
            name="supply"
            placeholder="Your event supply"
            onChange={handleSupply}
            className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
            Price per ticket
          </label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Ticket price in MATIC"
            onChange={handlePrice}
            className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="limit" className="block text-gray-700 font-bold mb-2">
            Limit to buy per customer
          </label>
          <input
            type="number"
            id="limit"
            name="limit"
            placeholder="How many tickets can a customer buy?"
            onChange={handleLimit}
            className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="dateAndTime"
            className="block text-gray-700 font-bold mb-2"
          >
            Event date and time
          </label>
          <input
            type="datetime-local"
            id="dateAndTime"
            name="dateAndTime"
            onChange={handleDateTime}
            className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="city" className="block text-gray-700 font-bold mb-2">
            Event city
          </label>
          <select
            id="city"
            name="city"
            onChange={handleCity}
            className="block w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-indigo-500"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.value}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="upload"
            className="block text-gray-700 font-bold mb-2"
          >
            Event Template/Thumbnail
          </label>
          <input
            type="file"
            id="upload"
            name="upload"
            btnName
            onChange={imageToIpfs}
            className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:border-indigo-500"
            required
          />
          {fileIsUploading && (
            <div className="mt-2 flex justify-center">
              <Loading type="spin" color="black" height={25} width={25} />
            </div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="tickets"
            className="block text-gray-700 font-bold mb-2"
          >
            Event Tickets folder
          </label>
          <input
            type="file"
            id="tickets"
            name="tickets"
            onChange={ticketsToIpfs}
            className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:border-indigo-500"
            required
            webkitdirectory="true"
            mozdirectory
            directory
          />
          {folderIsUploading && (
            <div className="mt-2 flex justify-center">
              <Loading type="spin" color="black" height={25} width={25} />
            </div>
          )}
        </div>

        <button
          onClick={createEvent}
          className="w-full bg-gray-900 text-white py-3 px-6 rounded-md font-semibold shadow-md transform hover:scale-105 transition-all duration-300"
        >
          Create event
        </button>
        {creating && (
          <div className="mt-2 flex justify-center">
            <Loading type="spin" color="black" height={25} width={25} />
          </div>
        )}
      </div>
    </>
  );
};

export default page;
