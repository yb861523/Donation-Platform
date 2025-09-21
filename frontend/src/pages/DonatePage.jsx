import React, { useState, useEffect } from 'react';
import { API_URLS } from '../config/api';
import { 
  Gift, 
  ArrowLeft, 
  Shirt, 
  Utensils, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle, 
  Users, 
  Heart,
  Star,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';

const DonatePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('food');
  const [donationData, setDonationData] = useState({
    type: '',
    quantity: '',
    location: '',
    date: '',
    time: '',
    description: '',
    contact: ''
  });
  const [stats, setStats] = useState({
    impact: {
      familiesHelped: 2847,
      mealsProvided: 15420,
      clothingItems: 8932,
      successRate: 98
    }
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(API_URLS.stats);
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Error fetching statistics:', error);
        // Keep default values if API fails
      }
    };

    fetchStats();
  }, []);

  const BentoCard = ({ children, className = '', hoverEffect = true }) => (
    <div className={`
      bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-green-100 dark:border-gray-700
      ${hoverEffect ? 'hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02]' : ''}
      transition-all duration-300 ease-out
      ${className}
    `}>
      {children}
    </div>
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to submit a donation.');
      return;
    }

    try {
      const response = await fetch(API_URLS.donations, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          category: selectedCategory,
          type: donationData.type,
          quantity: donationData.quantity,
          location: donationData.location,
          date: donationData.date,
          time: donationData.time,
          description: donationData.description,
          contact: donationData.contact
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Thank you for your donation! We will contact you soon to arrange pickup.');
        // Reset form
        setDonationData({
          type: '',
          quantity: '',
          location: '',
          date: '',
          time: '',
          description: '',
          contact: ''
        });
      } else {
        alert(data.message || 'Error submitting donation. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting donation:', error);
      alert('Network error. Please check your connection and try again.');
    }
  };

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
        
        {/* Header Section */}
        <div className="text-center mb-16 animate-fadeIn">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Gift className="h-16 w-16 text-green-600" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <Heart className="h-3 w-3 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6 leading-tight">
            Make a
            <span className="text-green-600 dark:text-green-400 block">Difference</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Donate food and clothes to help families in need. Every contribution makes a real impact in our community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          
          {/* Category Selection */}
          <BentoCard className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Choose Category</h3>
            <div className="space-y-4">
              <button
                onClick={() => setSelectedCategory('food')}
                className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 flex items-center ${
                  selectedCategory === 'food' 
                    ? 'border-green-500 bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300' 
                    : 'border-gray-200 dark:border-gray-600 hover:border-green-300'
                }`}
              >
                <Utensils className="h-8 w-8 mr-4 text-green-600" />
                <div className="text-left">
                  <div className="font-semibold">Food Donation</div>
                  <div className="text-sm opacity-75">Share meals with families</div>
                </div>
              </button>
              
              <button
                onClick={() => setSelectedCategory('clothes')}
                className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 flex items-center ${
                  selectedCategory === 'clothes' 
                    ? 'border-green-500 bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300' 
                    : 'border-gray-200 dark:border-gray-600 hover:border-green-300'
                }`}
              >
                <Shirt className="h-8 w-8 mr-4 text-blue-600" />
                <div className="text-left">
                  <div className="font-semibold">Clothes Donation</div>
                  <div className="text-sm opacity-75">Provide clothing for those in need</div>
                </div>
              </button>
            </div>
          </BentoCard>

          {/* Donation Form */}
          <BentoCard className="lg:col-span-2">
            <div className="flex items-center mb-6">
              {selectedCategory === 'food' ? (
                <Utensils className="h-8 w-8 text-green-600 mr-3" />
              ) : (
                <Shirt className="h-8 w-8 text-blue-600 mr-3" />
              )}
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                {selectedCategory === 'food' ? 'Food' : 'Clothes'} Donation Form
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {selectedCategory === 'food' ? 'Food Type' : 'Clothing Type'}
                  </label>
                  <input
                    type="text"
                    name="type"
                    value={donationData.type}
                    onChange={handleInputChange}
                    placeholder={selectedCategory === 'food' ? 'e.g., Fresh vegetables, Canned goods' : 'e.g., Winter coats, Children clothes'}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Quantity
                  </label>
                  <input
                    type="text"
                    name="quantity"
                    value={donationData.quantity}
                    onChange={handleInputChange}
                    placeholder={selectedCategory === 'food' ? 'e.g., 5 bags, 10 cans' : 'e.g., 3 items, 1 box'}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Pickup Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="location"
                    value={donationData.location}
                    onChange={handleInputChange}
                    placeholder="Enter your address or preferred pickup location"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      name="date"
                      value={donationData.date}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Preferred Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      name="time"
                      value={donationData.time}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      required
                    >
                      <option value="">Select time</option>
                      <option value="morning">Morning (8AM - 12PM)</option>
                      <option value="afternoon">Afternoon (12PM - 5PM)</option>
                      <option value="evening">Evening (5PM - 8PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Additional Details
                </label>
                <textarea
                  name="description"
                  value={donationData.description}
                  onChange={handleInputChange}
                  placeholder="Any special instructions or additional information..."
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Contact Information
                </label>
                <input
                  type="text"
                  name="contact"
                  value={donationData.contact}
                  onChange={handleInputChange}
                  placeholder="Your phone number or email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-8 rounded-2xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl"
              >
                Submit Donation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </BentoCard>

          {/* Impact Stats */}
          <BentoCard className="lg:col-span-3">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Your Impact</h3>
              <p className="text-gray-600 dark:text-gray-300">See how your donations make a difference</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">{stats.impact?.familiesHelped?.toLocaleString() || '2,847'}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Families Helped</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Utensils className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{stats.impact?.mealsProvided?.toLocaleString() || '15,420'}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Meals Provided</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shirt className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">{stats.impact?.clothingItems?.toLocaleString() || '8,932'}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Clothing Items</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">{stats.impact?.successRate || 98}%</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Success Rate</div>
              </div>
            </div>
          </BentoCard>

          {/* Success Stories */}
          <BentoCard className="lg:col-span-2 bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="relative z-10">
              <Star className="h-12 w-12 mb-4 opacity-90" />
              <h3 className="text-2xl font-bold mb-4">Recent Success Stories</h3>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-green-100 mb-2">"Thanks to your food donations, we were able to feed 50 families during the holiday season."</p>
                  <div className="text-sm text-green-200">- Local Community Center</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-green-100 mb-2">"The winter coats you donated kept 20 children warm during the coldest months."</p>
                  <div className="text-sm text-green-200">- Homeless Shelter</div>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          </BentoCard>

          {/* Quick Actions */}
          <BentoCard className="lg:col-span-1">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-3 bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-xl hover:bg-green-100 dark:hover:bg-green-800 transition-colors flex items-center">
                <CheckCircle className="h-5 w-5 mr-3" />
                Track My Donation
              </button>
              <button className="w-full p-3 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors flex items-center">
                <Users className="h-5 w-5 mr-3" />
                Become a Volunteer
              </button>
              <button className="w-full p-3 bg-purple-50 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors flex items-center">
                <Heart className="h-5 w-5 mr-3" />
                Share Our Mission
              </button>
            </div>
          </BentoCard>

        </div>
      </div>
    </Layout>
  );
};

export default DonatePage; 