import React from "react";
const Hero4 = () => {
  const securityPoints = [
    "Immutable Record Keeping: Blockchain's decentralized nature ensures ticket data cannot be altered or duplicated, preventing fraud.",
    "Verified Authenticity: Each NFT ticket is a unique digital asset, proving its authenticity and eliminating counterfeiting.",
    "Transparent Transactions: Public ledger technology allows for transparent ticket transfers and resales, reducing scalping and black market activity.",
    "Decentralized Verification: Ticket validation is distributed across the network, making it tamper-resistant and hacker-proof.",
    "Smart Contract Automation: NFTs enable automatic execution of event access rules, streamlining entry and enhancing security.",
    "Ownership Empowerment: Attendees have full control over their NFT tickets, reducing reliance on third-party ticket vendors and intermediaries.",
  ];

  return (
    <div className="flex flex-col items-center py-16 ml-8 mr-8">
      <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mr-4 ml-4 mb-6">
        Why Blockchain is Secure for NFT Ticketing
      </h2>
      <div className="max-w-3xl space-y-4">
        {securityPoints.map((point, index) => (
          <div key={index} className="flex items-start">
            <svg
              className="w-6 h-6 mt-1 mr-2 text-black font-bold"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p>{point}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero4;
