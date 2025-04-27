import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-black">Forever</h2>
          <p className="text-gray-600 text-sm">
            Forever is your go-to destination for trendy, comfortable, and
            affordable fashion. We bring you the best styles with quality you
            can trust.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-black">Quick Links</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>
              <a href="#" className="hover:text-black transition">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition">
                Collection
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-black">
            Customer Service
          </h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>
              <a href="#" className="hover:text-black transition">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition">
                Shipping & Returns
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-black">Contact Us</h3>
          <div className="space-y-3 text-gray-600 text-sm">
            <div className="flex items-start gap-2">
              <MapPin size={16} />
              <span>123 Fashion St, New York, NY</span>
            </div>
            <div className="flex items-start gap-2">
              <Phone size={16} />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-start gap-2">
              <Mail size={16} />
              <span>support@foreverfashion.com</span>
            </div>
          </div>

          {/* Socials */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-black transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-black transition">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-black transition">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200 px-6 py-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Forever. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
