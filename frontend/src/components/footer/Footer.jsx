import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin as LocationIcon
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-green-100 dark:border-gray-700 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">Home</Link>
              <Link to="/donate" className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">Donate Food</Link>
              <a href="#volunteer" className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">Volunteer</a>
              <Link to="/about" className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">About Us</Link>
              <a href="#impact" className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">Our Impact</a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="text-gray-600 dark:text-gray-300">hello@foodshare.org</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <LocationIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="text-gray-600 dark:text-gray-300">123 Hope Street, City, State 12345</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Follow Us</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="p-3 bg-green-100 dark:bg-gray-700 rounded-full text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-gray-600 transition-all">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-3 bg-green-100 dark:bg-gray-700 rounded-full text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-gray-600 transition-all">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-3 bg-green-100 dark:bg-gray-700 rounded-full text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-gray-600 transition-all">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Stay updated with our latest news and impact stories.
            </p>
          </div>
        </div>

        <div className="border-t border-green-100 dark:border-gray-700 pt-8 mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            © 2024 FoodShare. All rights reserved. Made with ❤️ for a better world.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 