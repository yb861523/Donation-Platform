import React from 'react';
import { Heart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';

const AboutPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          to="/" 
          className="inline-flex items-center text-green-600 hover:text-green-800 mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </Link>
        
        <div className="text-center">
          <Heart className="h-16 w-16 text-red-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            About Us
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Learn more about our mission to eliminate food waste and hunger in our communities.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage; 