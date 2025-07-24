// import { useState } from 'react';
// import { 
//   Menu, X, Search, Bell, User, Settings, LogOut, 
//   Home, Users, BarChart3, Shield, HelpCircle,
//   Github, Twitter, Linkedin, Mail, Phone, MapPin,
//   ChevronDown, Sparkles, Zap
// } from 'lucide-react';

// function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [isNotificationOpen, setIsNotificationOpen] = useState(false);

//   const notifications = [
//     { id: 1, title: "New user registered", time: "2 min ago", type: "info" },
//     { id: 2, title: "System update available", time: "1 hour ago", type: "warning" },
//     { id: 3, title: "Backup completed", time: "3 hours ago", type: "success" }
//   ];

//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/10 border-b border-white/20 shadow-xl">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div className="flex items-center space-x-3">
//             <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-xl shadow-lg">
//               <Zap className="w-6 h-6 text-white" />
//             </div>
//             <div className="hidden sm:block">
//               <h1 className="text-xl font-bold bg-gradient-to-r from-purple-300 to-emerald-300 bg-clip-text text-transparent">
//                 ModernAuth
//               </h1>
//             </div>
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-8">
//             <a href="#" className="flex items-center space-x-2 text-white hover:text-purple-300 transition-colors duration-200 group">
//               <Home className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
//               <span>Dashboard</span>
//             </a>
//             <a href="#" className="flex items-center space-x-2 text-white hover:text-emerald-300 transition-colors duration-200 group">
//               <Users className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
//               <span>Users</span>
//             </a>
//             <a href="#" className="flex items-center space-x-2 text-white hover:text-cyan-300 transition-colors duration-200 group">
//               <BarChart3 className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
//               <span>Analytics</span>
//             </a>
//             <a href="#" className="flex items-center space-x-2 text-white hover:text-pink-300 transition-colors duration-200 group">
//               <Shield className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
//               <span>Security</span>
//             </a>
//           </nav>

//           {/* Search Bar */}
//           <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
//             <div className="relative w-full">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
//               />
//             </div>
//           </div>

//           {/* Right Side Actions */}
//           <div className="flex items-center space-x-4">
//             {/* Notifications */}
//             <div className="relative">
//               <button
//                 onClick={() => setIsNotificationOpen(!isNotificationOpen)}
//                 className="relative p-2 text-white hover:text-purple-300 transition-colors duration-200 hover:bg-white/10 rounded-lg"
//               >
//                 <Bell className="w-5 h-5" />
//                 <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
//               </button>

//               {/* Notifications Dropdown */}
//               {isNotificationOpen && (
//                 <div className="absolute right-0 mt-2 w-80 backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl shadow-xl overflow-hidden">
//                   <div className="p-4 border-b border-white/10">
//                     <h3 className="text-white font-semibold">Notifications</h3>
//                   </div>
//                   <div className="max-h-64 overflow-y-auto">
//                     {notifications.map((notification) => (
//                       <div key={notification.id} className="p-4 hover:bg-white/5 transition-colors duration-200 border-b border-white/5 last:border-b-0">
//                         <div className="flex items-start space-x-3">
//                           <div className={`w-2 h-2 rounded-full mt-2 ${
//                             notification.type === 'success' ? 'bg-green-500' :
//                             notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
//                           }`}></div>
//                           <div className="flex-1">
//                             <p className="text-white text-sm">{notification.title}</p>
//                             <p className="text-gray-400 text-xs mt-1">{notification.time}</p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Profile Dropdown */}
//             <div className="relative">
//               <button
//                 onClick={() => setIsProfileOpen(!isProfileOpen)}
//                 className="flex items-center space-x-2 p-1 text-white hover:bg-white/10 rounded-lg transition-all duration-200"
//               >
//                 <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full flex items-center justify-center">
//                   <User className="w-4 h-4 text-white" />
//                 </div>
//                 <ChevronDown className="w-4 h-4" />
//               </button>

//               {/* Profile Dropdown Menu */}
//               {isProfileOpen && (
//                 <div className="absolute right-0 mt-2 w-48 backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl shadow-xl overflow-hidden">
//                   <div className="p-4 border-b border-white/10">
//                     <p className="text-white font-semibold">John Doe</p>
//                     <p className="text-gray-400 text-sm">john@example.com</p>
//                   </div>
//                   <div className="py-2">
//                     <a href="#" className="flex items-center space-x-3 px-4 py-2 text-white hover:bg-white/10 transition-colors duration-200">
//                       <User className="w-4 h-4" />
//                       <span>Profile</span>
//                     </a>
//                     <a href="#" className="flex items-center space-x-3 px-4 py-2 text-white hover:bg-white/10 transition-colors duration-200">
//                       <Settings className="w-4 h-4" />
//                       <span>Settings</span>
//                     </a>
//                     <a href="#" className="flex items-center space-x-3 px-4 py-2 text-white hover:bg-white/10 transition-colors duration-200">
//                       <HelpCircle className="w-4 h-4" />
//                       <span>Help</span>
//                     </a>
//                     <hr className="my-2 border-white/10" />
//                     <a href="#" className="flex items-center space-x-3 px-4 py-2 text-red-400 hover:bg-red-500/10 transition-colors duration-200">
//                       <LogOut className="w-4 h-4" />
//                       <span>Sign Out</span>
//                     </a>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="md:hidden p-2 text-white hover:text-purple-300 transition-colors duration-200"
//             >
//               {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <div className="md:hidden py-4 border-t border-white/20">
//             <div className="space-y-2">
//               <a href="#" className="flex items-center space-x-3 px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200">
//                 <Home className="w-4 h-4" />
//                 <span>Dashboard</span>
//               </a>
//               <a href="#" className="flex items-center space-x-3 px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200">
//                 <Users className="w-4 h-4" />
//                 <span>Users</span>
//               </a>
//               <a href="#" className="flex items-center space-x-3 px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200">
//                 <BarChart3 className="w-4 h-4" />
//                 <span>Analytics</span>
//               </a>
//               <a href="#" className="flex items-center space-x-3 px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200">
//                 <Shield className="w-4 h-4" />
//                 <span>Security</span>
//               </a>
//             </div>
            
//             {/* Mobile Search */}
//             <div className="mt-4 px-4">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
//                 />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }

// export default Header;
import React from 'react'

const Header = () => {
  return (
    <div>Header</div>
  )
}

export default Header