import React, { useState } from 'react';
import { 
  Heart, 
  ArrowLeft, 
  Users, 
  Target, 
  Award, 
  Globe, 
  TrendingUp, 
  Star,
  Handshake,
  Gift,
  MapPin,
  Calendar,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  Shield,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('mission');

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

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "👩‍💼",
      description: "Passionate about community impact and sustainable solutions."
    },
    {
      name: "Michael Chen",
      role: "Operations Director",
      image: "👨‍💻",
      description: "Expert in logistics and community outreach programs."
    },
    {
      name: "Emily Rodriguez",
      role: "Community Manager",
      image: "👩‍🎓",
      description: "Connects donors with families in need across the city."
    },
    {
      name: "David Thompson",
      role: "Technology Lead",
      image: "👨‍🔬",
      description: "Builds the platform that makes donations seamless."
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "We believe in treating every person with dignity and respect."
    },
    {
      icon: Shield,
      title: "Transparency",
      description: "Every donation is tracked and reported to ensure accountability."
    },
    {
      icon: Handshake,
      title: "Community",
      description: "We build bridges between those who can help and those in need."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We use technology to make giving more efficient and impactful."
    }
  ];

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
              <Heart className="h-16 w-16 text-red-500" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Star className="h-3 w-3 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6 leading-tight">
            About Our
            <span className="text-green-600 dark:text-green-400 block">Mission</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're a community-driven platform dedicated to eliminating food waste and hunger by connecting those who have with those who need.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          
          {/* Mission Statement */}
          <BentoCard className="lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-green-500 to-green-600 text-white relative overflow-hidden">
            <div className="relative z-10">
              <Target className="h-12 w-12 mb-4 opacity-90" />
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h3>
              <p className="text-green-100 mb-6 text-lg leading-relaxed">
                To create a world where no food goes to waste and no one goes hungry. We believe that by connecting communities, we can solve the dual challenges of food waste and food insecurity.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-3 text-green-200" />
                  <span className="text-green-100">Reduce food waste by 50%</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-3 text-green-200" />
                  <span className="text-green-100">Feed 10,000 families monthly</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-3 text-green-200" />
                  <span className="text-green-100">Build sustainable communities</span>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          </BentoCard>

          {/* Stats */}
          <BentoCard className="lg:col-span-1">
            <TrendingUp className="h-10 w-10 text-green-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Our Impact</h3>
            <div className="space-y-3">
              <div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">50K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Meals Donated</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">2,847</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Families Helped</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">98%</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Success Rate</div>
              </div>
            </div>
          </BentoCard>

          {/* Values */}
          <BentoCard className="lg:col-span-1">
            <Lightbulb className="h-10 w-10 text-yellow-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Our Values</h3>
            <div className="space-y-3">
              {values.slice(0, 3).map((value, index) => (
                <div key={index} className="flex items-start">
                  <value.icon className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-sm text-gray-800 dark:text-white">{value.title}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">{value.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* Story */}
          <BentoCard className="lg:col-span-2">
            <Globe className="h-10 w-10 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Our Story</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              Founded in 2020 during the pandemic, we saw the urgent need to connect surplus food with hungry families. 
              What started as a small community initiative has grown into a platform that serves thousands of families 
              across multiple cities.
            </p>
            <div className="flex flex-wrap gap-2">
              {['2020 - Founded', '2021 - 1K Families', '2022 - 5 Cities', '2023 - 10K+ Meals'].map((milestone, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                >
                  {milestone}
                </span>
              ))}
            </div>
          </BentoCard>

          {/* Team Section */}
          <BentoCard className="lg:col-span-2">
            <Users className="h-10 w-10 text-purple-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Meet Our Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="text-2xl mr-3">{member.image}</div>
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-white">{member.name}</div>
                    <div className="text-sm text-green-600 dark:text-green-400">{member.role}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">{member.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* Awards & Recognition */}
          <BentoCard className="lg:col-span-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <Award className="h-12 w-12 mb-4 opacity-90" />
                <h3 className="text-2xl font-bold mb-2">Awards & Recognition</h3>
                <div className="space-y-2 text-blue-100">
                  <div>🏆 Best Community Platform 2023</div>
                  <div>🌟 Social Impact Award 2022</div>
                  <div>💚 Green Innovation Prize 2021</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold mb-2">15+</div>
                <div className="text-blue-100">Awards Won</div>
              </div>
            </div>
          </BentoCard>

          {/* How We Work */}
          <BentoCard className="lg:col-span-2">
            <Gift className="h-10 w-10 text-orange-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">How We Work</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 dark:text-green-400 font-bold">1</span>
                </div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Collect</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300">Gather surplus food and clothes from donors</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">2</span>
                </div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Sort</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300">Organize and quality-check all donations</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">3</span>
                </div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Distribute</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300">Deliver to families and organizations in need</p>
              </div>
            </div>
          </BentoCard>

          {/* Call to Action */}
          <BentoCard className="lg:col-span-2 bg-gradient-to-r from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Join Our Mission</h3>
                <p className="text-green-100 mb-4">
                  Be part of the solution. Together, we can make a difference.
                </p>
                <button className="bg-white text-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition-all flex items-center group">
                  Get Involved
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <Handshake className="h-16 w-16 opacity-30" />
            </div>
          </BentoCard>

        </div>
      </div>
    </Layout>
  );
};

export default AboutPage; 