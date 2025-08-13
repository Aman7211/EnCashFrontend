import React, { useState } from 'react';
import { Menu, X, Wallet, LogOut, User, Home, CreditCard, BarChart3, Settings, Bell } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = localStorage.getItem('token');
  // In your actual app, use: const token = localStorage.getItem('token');
  const [user] = useState({ name: 'John Doe', email: 'john@example.com' });

  const logout = () => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('email');
    // localStorage.removeItem('isNewUser');
    // navigate('/');
    alert('Logout functionality - implement with your routing solution');
  };

  const navigate = (path) => {
    // Replace with your actual navigation logic
    alert(`Navigate to: ${path}`);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Navigation items
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Transactions', href: '/transactions', icon: CreditCard },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <header className="relative">
      {/* Main Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            
            {/* Logo and Title */}
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => navigate('/')}>
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl group-hover:bg-white/30 transition-all duration-300">
                <Wallet className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
                  Wallet Dashboard
                </h1>
                <p className="text-xs lg:text-sm text-white/80 hidden sm:block">
                  Manage your finances
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            {token ? (
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.href)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white/80 hover:text-white
                             hover:bg-white/10 transition-all duration-200 text-sm font-medium"
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>):''
}

            {/* Right Side Content */}
            <div className="flex items-center space-x-4">
              
              {/* Conditional rendering based on token */}
              {token ? (
                <div className="hidden md:flex items-center space-x-4">
                  {/* Notifications */}
                  <button className="relative bg-white/10 backdrop-blur-sm p-2 rounded-full border border-white/20
                                   hover:bg-white/20 transition-all duration-200">
                    <Bell className="h-5 w-5 text-white" />
                    <div className="absolute -top-1 -right-1 bg-red-500 h-3 w-3 rounded-full border-2 border-white"></div>
                  </button>

                  {/* User Info */}
                  <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                    <div className="bg-white/20 p-1.5 rounded-full">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-white">
                        {user?.name || 'User'}
                      </p>
                      <p className="text-xs text-white/70">
                        {user?.email || 'user@example.com'}
                      </p>
                    </div>
                  </div>

                  {/* Logout Button */}
                  <button 
                    onClick={logout}
                    className="group flex items-center space-x-2 bg-red-500/90 hover:bg-red-500 
                             backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium
                             border border-red-400/30 hover:border-red-300 
                             transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    <LogOut className="h-4 w-4 group-hover:rotate-12 transition-transform duration-200" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-3">
                  <button 
                    onClick={() => navigate('/login')}
                    className="px-4 py-2 text-white/90 hover:text-white font-medium transition-colors duration-200"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => navigate('/register')}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full 
                             text-white font-medium border border-white/30 hover:border-white/50
                             transition-all duration-200"
                  >
                    Get Started
                  </button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="md:hidden bg-white/10 backdrop-blur-sm p-2 rounded-lg border border-white/20
                         hover:bg-white/20 transition-all duration-200"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-white" />
                ) : (
                  <Menu className="h-6 w-6 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Animated Bottom Border */}
        <div className="h-1 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 opacity-70"></div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 right-0 z-50 transform transition-all duration-300 ease-in-out ${
        isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0 pointer-events-none'
      }`}>
        <div className="bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
            
            {/* Mobile Navigation */}
            <div className="space-y-2">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.href);
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-100 
                             rounded-lg transition-colors duration-200"
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Conditional Mobile Content */}
            {token ? (
              <>
                {/* Mobile User Info */}
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {user?.name || 'User'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {user?.email || 'user@example.com'}
                    </p>
                  </div>
                </div>

                {/* Mobile Logout Button */}
                <button 
                  onClick={logout}
                  className="w-full flex items-center justify-center space-x-2 
                           bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700
                           text-white py-3 rounded-xl font-medium
                           transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="space-y-3 pt-2 border-t border-gray-200">
                <button 
                  onClick={() => {
                    navigate('/login');
                    setIsMenuOpen(false);
                  }}
                  className="w-full py-3 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => {
                    navigate('/register');
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600
                           text-white py-3 rounded-xl font-medium
                           transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
}