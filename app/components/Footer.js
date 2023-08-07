import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const quote = "The best way to predict the future is to create it.";

  return (
    <footer className="py-8">
      <div className="container mx-auto px-4">
        <div className="text-black text-center mb-4">
          <p className="xl md:3xl font-bold">&ldquo;{quote}&rdquo;</p>
          <p>&mdash; {currentYear} Tikeey</p>
        </div>
        <div className="flex justify-center items-center">
          <Link
            href="www.facebook.com"
            className="text-black hover:text-blue-900 transition duration-300 mx-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook size={24} />
          </Link>
          <Link
            href="www.twitter.com"
            className="text-black hover:text-blue-900 transition duration-300 mx-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter size={24} />
          </Link>
          <Link
            href="www.instagram.com"
            className="text-black hover:text-blue-900 transition duration-300 mx-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={24} />
          </Link>
          {/* Add more social links as needed */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
