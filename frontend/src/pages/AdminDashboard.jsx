import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URLS } from '../config/api';
import {
  LayoutDashboard,
  Users,
  Package,
  MessageSquare,
  BarChart3,
  LogOut,
  Menu,
  X,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Calendar,
  MapPin
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState({
    stats: {
      donations: { total: 0, pending: 0, completed: 0 },
      contacts: { total: 0, new: 0 },
      users: { total: 0 }
    },
    recent: { donations: [], contacts: [] }
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOverview = useCallback(async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(API_URLS.admin.dashboard.overview, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setData(result);
      } else if (response.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('admin');
        navigate('/admin/login');
      }
    } catch (error) {
      console.error('Error fetching overview:', error);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetchOverview();
  }, [navigate, fetchOverview]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');
    navigate('/admin/login');
  };

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'donations', label: 'Donations', icon: Package },
    { id: 'contacts', label: 'Contacts', icon: MessageSquare },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
    <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
          {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <Icon className={`h-8 w-8 ${color.replace('text-', 'text-').replace('-600', '-500')}`} />
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Donations"
          value={data.stats.donations.total}
          icon={Package}
          color="text-blue-600"
        />
        <StatCard
          title="Pending Donations"
          value={data.stats.donations.pending}
          icon={Clock}
          color="text-yellow-600"
        />
        <StatCard
          title="Completed Donations"
          value={data.stats.donations.completed}
          icon={CheckCircle}
          color="text-green-600"
        />
        <StatCard
          title="Total Users"
          value={data.stats.users.total}
          icon={Users}
          color="text-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Donations */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Recent Donations</h3>
          <div className="space-y-4">
            {data.recent.donations.length > 0 ? (
              data.recent.donations.map((donation, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {donation.category} - {donation.type}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {donation.donor?.name || 'Unknown'} • {donation.quantity}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    donation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    donation.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                    donation.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {donation.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No recent donations</p>
            )}
          </div>
        </div>

        {/* Recent Contacts */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Recent Contacts</h3>
          <div className="space-y-4">
            {data.recent.contacts.length > 0 ? (
              data.recent.contacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">{contact.subject}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {contact.name} • {contact.type}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    contact.status === 'new' ? 'bg-red-100 text-red-800' :
                    contact.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                    contact.status === 'resolved' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {contact.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No recent contacts</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
          <h2 className="mt-4 text-2xl font-semibold text-gray-700 dark:text-gray-300">Loading Admin Dashboard...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Admin Panel</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-8 px-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white capitalize">
              {activeTab}
            </h2>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Welcome, Admin
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'donations' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Donations Management</h3>
              <p className="text-gray-600 dark:text-gray-400">Donations management interface coming soon...</p>
            </div>
          )}
          {activeTab === 'contacts' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Contacts Management</h3>
              <p className="text-gray-600 dark:text-gray-400">Contacts management interface coming soon...</p>
            </div>
          )}
          {activeTab === 'users' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Users Management</h3>
              <p className="text-gray-600 dark:text-gray-400">Users management interface coming soon...</p>
            </div>
          )}
          {activeTab === 'analytics' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Analytics Dashboard</h3>
              <p className="text-gray-600 dark:text-gray-400">Analytics dashboard coming soon...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;