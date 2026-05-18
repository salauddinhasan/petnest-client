import Link from "next/link";
import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-neutral-600 pt-16 pb-8 border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2 text-neutral-950">
            <span className="text-base font-bold tracking-widest uppercase">
              PetNest
            </span>
          </Link>
          <p className="text-xs text-neutral-500 leading-relaxed font-normal">
            Connecting beautiful pets with forever families. Give a second
            chance to a furry friend today.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-neutral-950 font-semibold text-xs tracking-wider uppercase">
            Explore
          </h3>
          <ul className="flex flex-col gap-2.5 text-xs font-medium">
            <li>
              <Link
                href="/"
                className="hover:text-neutral-950 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/all-pets"
                className="hover:text-neutral-950 transition-colors"
              >
                All Pets
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-neutral-950 transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/blogs"
                className="hover:text-neutral-950 transition-colors"
              >
                Success Stories
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-neutral-950 font-semibold text-xs tracking-wider uppercase">
            Contact Us
          </h3>
          <ul className="flex flex-col gap-3 text-xs font-medium">
            <li className="flex items-start gap-2.5 hover:text-neutral-950 transition-colors">
              <FaEnvelope className="text-neutral-400 mt-0.5 flex-shrink-0 text-sm" />
              <span className="break-all">support@petnest.com</span>
            </li>
            <li className="flex items-center gap-2.5 hover:text-neutral-950 transition-colors">
              <FaPhone className="text-neutral-400 flex-shrink-0 text-sm" />
              <span>+880 1234-567890</span>
            </li>
            <li className="flex items-start gap-2.5 hover:text-neutral-950 transition-colors">
              <FaMapMarkerAlt className="text-neutral-400 mt-0.5 flex-shrink-0 text-sm" />
              <span>Habiganj, Sylhet</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-neutral-950 font-semibold text-xs tracking-wider uppercase">
            Follow Us
          </h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Stay updated with pet care tips and news.
          </p>
          <div className="flex items-center gap-3 text-base">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-950 transition-colors bg-neutral-50 border border-neutral-200/60 p-2 rounded-full text-neutral-500"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-950 transition-colors bg-neutral-50 border border-neutral-200/60 p-2 rounded-full text-neutral-500"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-950 transition-colors bg-neutral-50 border border-neutral-200/60 p-2 rounded-full text-neutral-500"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-950 transition-colors bg-neutral-50 border border-neutral-200/60 p-2 rounded-full text-neutral-500"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="border-t border-neutral-100 my-6"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-medium text-neutral-400 tracking-wide">
        <p>
          &copy; {new Date().getFullYear()} PETNEST PLATFORM. ALL RIGHTS
          RESERVED.
        </p>
        <div className="flex gap-5 uppercase text-neutral-400">
          <Link
            href="/privacy"
            className="hover:text-neutral-950 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="hover:text-neutral-950 transition-colors"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
