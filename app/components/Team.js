// components/Team.js
const Team = () => {
  const teamMembers = [
    {
      name: "Soufiane Masad",
      role: "Project Manager",
      bio: "The visionary leader behind the SaaS, driving innovation and growth.",
      socials: {
        twitter: "https://twitter.com/The_S00F",
        linkedin: "https://www.linkedin.com/in/soufn",
      },
      image: "/sfn_pdp.png",
    },
    {
      name: "Abderrahim Ennouhi",
      role: "Project Manager",
      bio: "The mastermind behind our soft solutions, ensuring seamless operations.",
      socials: {
        twitter: "https://twitter.com",
        linkedin: "https://www.linkedin.com",
      },
      image: "/sfn_pdp.png",
    },
    {
      name: "Hatim Belfaquir",
      role: "Designer",
      bio: "Hatim brings creativity to life, crafting captivating visuals and user experiences.",
      socials: {
        twitter: "https://twitter.com",
        linkedin: "https://www.linkedin.com",
      },
      image: "/sfn_pdp.png",
    },
    {
      name: "Mohamad Berrouane",
      role: "Web Developer",
      bio: "Mohamad is the driving force behind our technical success, maintenance and support.",
      socials: {
        twitter: "https://twitter.com",
        linkedin: "https://www.linkedin.com",
      },
      image: "/sfn_pdp.png",
    },
  ];

  return (
    <section className="py-13 ">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center mb-6">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mr-4 ml-4">
            Meet Our Team
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-center mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">{member.name}</h3>
              <p className="text-gray-600 mb-4 italic">{member.role}</p>
              <p className="text-gray-700">{member.bio}</p>
              <div className="flex justify-center mt-6 space-x-4">
                <a
                  href={member.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 transition duration-300"
                >
                  Twitter
                </a>
                <a
                  href={member.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 transition duration-300"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
