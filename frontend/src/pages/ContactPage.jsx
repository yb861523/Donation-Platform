import React, { useState } from 'react';
import { API_URLS } from '../config/api';
import { 
  Mail, 
  ArrowLeft, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle,
  Users,
  Heart,
  Star,
  CheckCircle,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Globe,
  Award,
  Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });

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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_URLS.contact, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setFormData({ name: '', email: '', subject: '', message: '', type: 'general' });
      } else {
        alert(data.message || 'Error sending message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Network error. Please check your connection and try again.');
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "+1 (555) 123-4567",
      description: "Mon-Fri 9AM-6PM"
    },
    {
      icon: Mail,
      title: "Email",
      details: "hello@donationplatform.com",
      description: "We respond within 24 hours"
    },
    {
      icon: MapPin,
      title: "Office",
      details: "123 Community St, City, State 12345",
      description: "Visit us Monday-Friday"
    },
    {
      icon: Clock,
      title: "Hours",
      details: "9:00 AM - 6:00 PM",
      description: "Monday through Friday"
    }
  ];

  const socialLinks = [
    { icon: Facebook, name: "Facebook", color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900" },
    { icon: Twitter, name: "Twitter", color: "text-sky-500", bg: "bg-sky-50 dark:bg-sky-900" },
    { icon: Instagram, name: "Instagram", color: "text-pink-600", bg: "bg-pink-50 dark:bg-pink-900" },
    { icon: Linkedin, name: "LinkedIn", color: "text-blue-700", bg: "bg-blue-50 dark:bg-blue-900" }
  ];

  const faqs = [
    {
      question: "How quickly can you pick up donations?",
      answer: "We typically schedule pickups within 24-48 hours of your request."
    },
    {
      question: "What types of food do you accept?",
      answer: "We accept all non-perishable items, fresh produce, and prepared meals."
    },
    {
      question: "Is there a minimum donation amount?",
      answer: "No minimum required! Every donation, no matter the size, makes a difference."
    },
    {
      question: "How do you ensure food safety?",
      answer: "All donations are inspected and handled according to strict food safety guidelines."
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
              <Mail className="h-16 w-16 text-blue-500" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Heart className="h-3 w-3 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6 leading-tight">
            Get In
            <span className="text-green-600 dark:text-green-400 block">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We'd love to hear from you! Whether you have questions, want to volunteer, or need help with donations, we're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          
          {/* Contact Form */}
          <BentoCard className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <MessageCircle className="h-8 w-8 text-green-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Send us a Message</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Inquiry Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                >
                  <option value="general">General Inquiry</option>
                  <option value="donation">Donation Question</option>
                  <option value="volunteer">Volunteer Opportunity</option>
                  <option value="partnership">Partnership</option>
                  <option value="support">Technical Support</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Brief subject of your message"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us how we can help you..."
                  rows="5"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-8 rounded-2xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl"
              >
                Send Message
                <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </BentoCard>

          {/* Contact Information */}
          <BentoCard className="lg:col-span-1">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Contact Information</h3>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <info.icon className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-white">{info.title}</div>
                    <div className="text-sm text-green-600 dark:text-green-400">{info.details}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">{info.description}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
              <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Follow Us</h4>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`p-3 rounded-xl ${social.bg} ${social.color} hover:scale-105 transition-transform flex items-center justify-center`}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* Office Hours & Location */}
          <BentoCard className="lg:col-span-1">
            <MapPin className="h-10 w-10 text-green-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Visit Our Office</h3>
            <div className="space-y-4">
              <div>
                <div className="font-semibold text-gray-800 dark:text-white mb-2">Address</div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  123 Community Street<br />
                  Helping City, HC 12345<br />
                  United States
                </p>
              </div>
              <div>
                <div className="font-semibold text-gray-800 dark:text-white mb-2">Office Hours</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <div>Monday - Friday: 9:00 AM - 6:00 PM</div>
                  <div>Saturday: 10:00 AM - 4:00 PM</div>
                  <div>Sunday: Closed</div>
                </div>
              </div>
              <button className="w-full bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 py-2 px-4 rounded-xl hover:bg-green-100 dark:hover:bg-green-800 transition-colors text-sm font-medium">
                Get Directions
              </button>
            </div>
          </BentoCard>

          {/* FAQ Section */}
          <BentoCard className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <MessageCircle className="h-8 w-8 text-blue-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Frequently Asked Questions</h3>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-xl p-4">
                  <div className="font-semibold text-gray-800 dark:text-white mb-2">{faq.question}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{faq.answer}</div>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* Response Time */}
          <BentoCard className="lg:col-span-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <Clock className="h-12 w-12 mb-4 opacity-90" />
                <h3 className="text-2xl font-bold mb-2">Quick Response Guarantee</h3>
                <p className="text-blue-100 mb-4">
                  We're committed to responding to all inquiries within 24 hours. For urgent matters, please call us directly.
                </p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-300" />
                    <span className="text-blue-100">24hr Response</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-300" />
                    <span className="text-blue-100">Expert Support</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-300" />
                    <span className="text-blue-100">Always Available</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold mb-2">24h</div>
                <div className="text-blue-100">Response Time</div>
              </div>
            </div>
          </BentoCard>

          {/* Emergency Contact */}
          <BentoCard className="lg:col-span-2 bg-gradient-to-br from-red-500 to-orange-500 text-white">
            <div className="relative z-10">
              <Heart className="h-12 w-12 mb-4 opacity-90" />
              <h3 className="text-2xl font-bold mb-4">Emergency Food Assistance</h3>
              <p className="text-red-100 mb-4">
                If you or someone you know needs immediate food assistance, please call our emergency hotline.
              </p>
              <div className="flex items-center space-x-4">
                <button className="bg-white text-red-600 px-6 py-3 rounded-xl font-semibold hover:bg-red-50 transition-all flex items-center group">
                  Call Emergency Line
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="text-red-100">
                  <div className="font-semibold">+1 (555) 911-FOOD</div>
                  <div className="text-sm">Available 24/7</div>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          </BentoCard>

          {/* Trust Indicators */}
          <BentoCard className="lg:col-span-1">
            <Shield className="h-10 w-10 text-green-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Trust & Security</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                <span className="text-sm text-gray-600 dark:text-gray-300">SSL Encrypted</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Privacy Protected</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                <span className="text-sm text-gray-600 dark:text-gray-300">GDPR Compliant</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Secure Payments</span>
              </div>
            </div>
          </BentoCard>

        </div>
      </div>
    </Layout>
  );
};

export default ContactPage; 