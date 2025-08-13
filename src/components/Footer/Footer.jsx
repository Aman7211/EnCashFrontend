import React from 'react';
import { 
  Wallet, 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Heart,
  ArrowUp,
  Shield,
  Zap,
  Users,
  ExternalLink
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const token = localStorage.getItem('token');
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigate = (path) => {
    // Replace with your actual navigation logic
    console.log(`Navigate to: ${path}`);
  };

  const footerLinks = {
    product: [
      { name: 'Features', href: '/features' },
      { name: 'Security', href: '/security' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'API Documentation', href: '/api' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press Kit', href: '/press' },
      { name: 'Partners', href: '/partners' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
  };

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-500' },
    { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-700' },
  ];

  const features = [
    { icon: Shield, title: 'Bank-level Security', description: 'Your data is protected with enterprise-grade encryption' },
    { icon: Zap, title: 'Lightning Fast', description: 'Experience instant transactions and real-time updates' },
    { icon: Users, title: '24/7 Support', description: 'Our team is here to help you anytime, anywhere' },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
      </div>

      <div className="relative">
        {/* Features Section */}
        {token && 
        <div className="border-b border-gray-700/30 bg-gradient-to-r from-gray-800/30 to-gray-700/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                Why Choose WalletPro?
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Join thousands of users who trust us with their financial journey
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="text-center group cursor-pointer">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl mx-auto mb-6 w-fit group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xl">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed max-w-sm mx-auto">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
         }


        {/* Main Footer Content */}
                {token &&
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-2xl shadow-lg">
                  <Wallet className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">WalletPro</h2>
                  <p className="text-purple-300 font-medium">Financial Freedom Awaits</p>
                </div>
              </div>
              <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                Revolutionizing personal finance with cutting-edge technology, intuitive design, and unmatched security. 
                Your financial journey starts here.
              </p>
              
              {/* Newsletter Signup */}
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50">
                <h3 className="text-lg font-semibold text-white mb-3">Stay Updated</h3>
                <p className="text-gray-300 text-sm mb-4">Get the latest updates and financial tips</p>
                <div className="flex space-x-2">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                  <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-3 rounded-xl font-medium transform hover:scale-105 transition-all duration-200 shadow-lg">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {Object.entries(footerLinks).map(([category, links]) => (
                  <div key={category}>
                    <h3 className="text-lg font-bold text-white mb-6 capitalize bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {category}
                    </h3>
                    <ul className="space-y-4">
                      {links.map((link) => (
                        <li key={link.name}>
                          <button
                            onClick={() => navigate(link.href)}
                            className="text-gray-300 hover:text-white transition-all duration-200 text-sm flex items-center space-x-2 group"
                          >
                            <span className="group-hover:translate-x-1 transition-transform duration-200">
                              {link.name}
                            </span>
                            <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
         }

        {/* Contact Section */}
        <div className="border-y border-gray-700/30 bg-gray-800/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h3>
                <p className="text-gray-300 text-lg mb-6">
                  Join thousands of satisfied users and take control of your finances today.
                </p>
                <button 
                  onClick={() => navigate('/register')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600
                           px-8 py-4 rounded-2xl text-white font-bold text-lg
                           transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 
                           shadow-2xl hover:shadow-purple-500/25"
                >
                  Start Your Journey
                </button>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-colors duration-200">
                  <div className="bg-purple-500/20 p-2 rounded-lg">
                    <Mail className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Email Us</p>
                    <p className="text-gray-300 text-sm">support@walletpro.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-colors duration-200">
                  <div className="bg-green-500/20 p-2 rounded-lg">
                    <Phone className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Call Us</p>
                    <p className="text-gray-300 text-sm">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            
            {/* Social Links */}
            <div className="flex items-center space-x-6">
              <span className="text-gray-400 text-sm font-medium">Follow Us:</span>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <button
                      key={social.name}
                      onClick={() => window.open(social.href, '_blank')}
                      className={`bg-gray-800/50 hover:bg-gray-700/50 p-3 rounded-xl text-gray-400 ${social.color} 
                               transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 
                               border border-gray-700/50 hover:border-gray-600/50 shadow-lg`}
                    >
                      <IconComponent className="h-5 w-5" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Copyright */}
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>© {currentYear} WalletPro. Made with</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <span>in San Francisco</span>
            </div>

            {/* Scroll to Top */}
            <button
              onClick={scrollToTop}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600
                       p-3 rounded-full text-white shadow-lg hover:shadow-xl
                       transform hover:scale-110 hover:-translate-y-1 transition-all duration-300
                       border border-purple-400/30"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Decorative Bottom Border */}
        <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500">
          <div className="h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
        </div>
      </div>
    </footer>
  );
}