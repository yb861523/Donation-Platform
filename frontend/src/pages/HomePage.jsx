import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { API_URLS } from '../config/api';
import { 
  Users, 
  MapPin, 
  Gift, 
  Star, 
  TrendingUp, 
  Handshake, 
  ArrowRight,
  Heart
} from 'lucide-react';

const HomePage = () => {
  const [loading, setLoading] = useState(true);
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
    setLoading(false);
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

  return (
    <Layout>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-800 dark:text-white mb-6 leading-tight">
            Share Food,
            <span className="text-green-600 dark:text-green-400 block">Share Hope</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Together, we can eliminate food waste and hunger by connecting those who have with those who need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          
          <BentoCard className="lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-green-500 to-green-600 text-white relative overflow-hidden">
            <div className="relative z-10">
              <Gift className="h-12 w-12 mb-4 opacity-90" />
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Donate Food Now</h3>
              <p className="text-green-100 mb-6 text-lg">
                Make an immediate impact. Your food donation can feed families in need today.
              </p>
              <button className="bg-white text-green-600 px-8 py-4 rounded-2xl font-semibold hover:bg-green-50 transition-all flex items-center group">
                Start Donating
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          </BentoCard>

          <BentoCard className="lg:col-span-1">
            <Heart className="h-10 w-10 text-red-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Our Mission</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              To create a world where no food goes to waste and no one goes hungry through community-driven solutions.
            </p>
          </BentoCard>

          <BentoCard className="lg:col-span-1">
            <Star className="h-10 w-10 text-yellow-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Success Stories</h3>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">{stats.impact?.mealsProvided?.toLocaleString() || '50,000'}+</div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Meals donated and families helped this year</p>
          </BentoCard>

          <BentoCard className="lg:col-span-2">
            <TrendingUp className="h-10 w-10 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">How It Works</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-600 dark:text-green-400 font-bold text-sm">1</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300">Register</p>
              </div>
              <div>
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-600 dark:text-green-400 font-bold text-sm">2</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300">Donate</p>
              </div>
              <div>
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-600 dark:text-green-400 font-bold text-sm">3</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300">Impact</p>
              </div>
            </div>
          </BentoCard>

          <BentoCard className="lg:col-span-1">
            <Users className="h-10 w-10 text-purple-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Volunteer With Us</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Join our community of volunteers making a difference.
            </p>
            <button className="text-purple-600 dark:text-purple-400 font-semibold text-sm hover:underline">
              Learn More →
            </button>
          </BentoCard>

          <BentoCard className="lg:col-span-1">
            <MapPin className="h-10 w-10 text-green-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Track Donations</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              See the real-time impact of your contributions.
            </p>
            <button className="text-green-600 dark:text-green-400 font-semibold text-sm hover:underline">
              Track Now →
            </button>
          </BentoCard>

          <BentoCard className="lg:col-span-2">
            <Handshake className="h-10 w-10 text-orange-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Partner Organizations</h3>
            <div className="flex flex-wrap gap-2">
              {['Food Bank', 'Local Shelters', 'Community Centers', 'Schools'].map((partner, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium"
                >
                  {partner}
                </span>
              ))}
            </div>
          </BentoCard>
          <BentoCard className="lg:col-span-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Get Involved</h3>
                <p className="text-blue-100 mb-4">
                  Multiple ways to make a difference in your community.
                </p>
                <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all">
                  Join Us Today
                </button>
              </div>
              <Users className="h-16 w-16 opacity-30" />
            </div>
          </BentoCard>

        </div>
      </section>
    </Layout>
  );
};

export default HomePage; 