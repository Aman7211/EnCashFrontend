// import React from 'react'

// function Footer() {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="backdrop-blur-lg bg-white/5 border-t border-white/20 mt-auto">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {/* Brand Section */}
//           <div className="space-y-4">
//             <div className="flex items-center space-x-3">
//               <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-xl shadow-lg">
//                 <Zap className="w-6 h-6 text-white" />
//               </div>
//               <h3 className="text-xl font-bold bg-gradient-to-r from-purple-300 to-emerald-300 bg-clip-text text-transparent">
//                 ModernAuth
//               </h3>
//             </div>
//             <p className="text-gray-400 text-sm leading-relaxed">
//               Empowering businesses with secure, modern authentication solutions. 
//               Built for the future, designed for today.
//             </p>
//             <div className="flex space-x-4">
//               <a href="#" className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 hover:scale-110 group">
//                 <Github className="w-5 h-5 text-gray-400 group-hover:text-white" />
//               </a>
//               <a href="#" className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 hover:scale-110 group">
//                 <Twitter className="w-5 h-5 text-gray-400 group-hover:text-blue-400" />
//               </a>
//               <a href="#" className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 hover:scale-110 group">
//                 <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div className="space-y-4">
//             <h4 className="text-white font-semibold flex items-center">
//               <Sparkles className="w-4 h-4 mr-2 text-purple-400" />
//               Quick Links
//             </h4>
//             <ul className="space-y-2">
//               {['Dashboard', 'User Management', 'Analytics', 'Security', 'API Documentation'].map((link) => (
//                 <li key={link}>
//                   <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center group">
//                     <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
//                     {link}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Support */}
//           <div className="space-y-4">
//             <h4 className="text-white font-semibold flex items-center">
//               <HelpCircle className="w-4 h-4 mr-2 text-emerald-400" />
//               Support
//             </h4>
//             <ul className="space-y-2">
//               {['Help Center', 'Contact Support', 'System Status', 'Privacy Policy', 'Terms of Service'].map((link) => (
//                 <li key={link}>
//                   <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center group">
//                     <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
//                     {link}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div className="space-y-4">
//             <h4 className="text-white font-semibold flex items-center">
//               <Mail className="w-4 h-4 mr-2 text-cyan-400" />
//               Get in Touch
//             </h4>
//             <div className="space-y-3">
//               <div className="flex items-center space-x-3 text-gray-400 text-sm">
//                 <Mail className="w-4 h-4 text-cyan-400" />
//                 <span>support@modernauth.com</span>
//               </div>
//               <div className="flex items-center space-x-3 text-gray-400 text-sm">
//                 <Phone className="w-4 h-4 text-cyan-400" />
//                 <span>+1 (555) 123-4567</span>
//               </div>
//               <div className="flex items-center space-x-3 text-gray-400 text-sm">
//                 <MapPin className="w-4 h-4 text-cyan-400" />
//                 <span>San Francisco, CA</span>
//               </div>
//             </div>
            
//             {/* Newsletter */}
//             <div className="mt-6">
//               <p className="text-gray-400 text-sm mb-3">Stay updated with our latest features</p>
//               <div className="flex">
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 text-sm"
//                 />
//                 <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white rounded-r-lg transition-all duration-300 transform hover:scale-105">
//                   <Mail className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="border-t border-white/10 mt-12 pt-8">
//           <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
//             <div className="text-gray-400 text-sm">
//               © {currentYear} ModernAuth. All rights reserved. Built with ❤️ and innovation.
//             </div>
//             <div className="flex items-center space-x-6 text-sm">
//               <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
//                 Privacy
//               </a>
//               <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
//                 Terms
//               </a>
//               <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
//                 Cookies
//               </a>
//               <div className="flex items-center space-x-2 text-gray-400">
//                 <Sparkles className="w-4 h-4" />
//                 <span>Made with modern web technologies</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer

import React from 'react'

const Footer = () => {
  return (
    <div>Footer</div>
  )
}

export default Footer