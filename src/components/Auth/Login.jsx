import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [token, setToken] = useState(null);

  const handleSendOtp = async () => {
    try {
 await axios.post('http://localhost:5000/api/auth/send-otp', { phone });
      if (res.data.success) {
        alert('OTP sent to your phone');
        setStep(2);
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to send OTP');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', { phone, otp });
      if (res.data.success) {
        setToken(res.data.token);
        alert('OTP verified! Logged in.');
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Invalid OTP');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-xl font-semibold mb-4">OTP Login</h1>

        {step === 1 && (
          <>
            <label className="block mb-2 text-sm">Mobile Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91XXXXXXXXXX"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            />
            <button
              onClick={handleSendOtp}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <label className="block mb-2 text-sm">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
              Verify OTP
            </button>
          </>
        )}

        {token && (
          <div className="mt-4 text-green-700 bg-green-100 p-2 rounded">
            ✅ Logged in! <br />
            <strong>JWT:</strong> <small className="break-words">{token}</small>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;


// import { useState } from 'react';
// import { Eye, EyeOff, Mail, Lock, Sparkles } from 'lucide-react';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [focusedField, setFocusedField] = useState('');

//   // Simulated auth functions for demo
//   const login = (token) => console.log('Login with token:', token);
//   const navigate = (path) => console.log('Navigate to:', path);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1500));
//       const mockResponse = {
//         data: {
//           token: 'mock-jwt-token',
//           role: Math.random() > 0.5 ? 'admin' : 'user'
//         }
//       };
      
//       login(mockResponse.data.token);
//       navigate(mockResponse.data.role === 'admin' ? '/admin' : '/user');
//     } catch {
//       alert('Invalid credentials');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
//       {/* Animated background elements */}
//       <div className="absolute inset-0">
//         <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
//         <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
//         <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
//       </div>

//       {/* Floating particles */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(6)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute animate-bounce"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${i * 0.5}s`,
//               animationDuration: `${3 + Math.random() * 2}s`
//             }}
//           >
//             <Sparkles className="w-4 h-4 text-white opacity-30" />
//           </div>
//         ))}
//       </div>

//       <div className="relative z-10 w-full max-w-md">
//         {/* Glassmorphism card */}
//         <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20 transform transition-all duration-300 hover:scale-105">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4 shadow-lg">
//               <Lock className="w-8 h-8 text-white" />
//             </div>
//             <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
//               Welcome Back
//             </h2>
//             <p className="text-gray-300">Sign in to your account</p>
//           </div>
//             <div className="relative group">
//               <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${focusedField === 'email' ? 'text-purple-400' : 'text-gray-500'}`}>
//                 <Mail className="w-5 h-5" />
//               </div>
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 onFocus={() => setFocusedField('email')}
//                 onBlur={() => setFocusedField('')}
//                 className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm hover:bg-white/20"
//                 required
//               />
//               <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ${focusedField === 'email' ? 'w-full' : 'w-0'}`}></div>
//             </div>

//             {/* Password Input */}
//             <div className="relative group my-4">
//               <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${focusedField === 'password' ? 'text-purple-400' : 'text-gray-500'}`}>
//                 <Lock className="w-5 h-5" />
//               </div>
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 onFocus={() => setFocusedField('password')}
//                 onBlur={() => setFocusedField('')}
//                 className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm hover:bg-white/20"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-purple-400 transition-colors duration-200"
//               >
//                 {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//               </button>
//               <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ${focusedField === 'password' ? 'w-full' : 'w-0'}`}></div>
//             </div>

//             {/* Remember me & Forgot password */}
//             <div className="flex items-center justify-between text-sm my-4">
//               <label className="flex items-center text-gray-300 cursor-pointer hover:text-white transition-colors duration-200">
//                 <input type="checkbox" className="sr-only" />
//                 <div className="w-4 h-4 bg-white/10 border border-white/20 rounded flex items-center justify-center mr-2 transition-all duration-200 hover:bg-white/20">
//                   <div className="w-2 h-2 bg-purple-500 rounded opacity-0 transition-opacity duration-200"></div>
//                 </div>
//                 Remember me
//               </label>
//               <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors duration-200">
//                 Forgot password?
//               </a>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full relative group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
//               <span className="relative flex items-center justify-center">
//                 {isLoading ? (
//                   <>
//                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                     Signing in...
//                   </>
//                 ) : (
//                   'Sign In'
//                 )}
//               </span>
//             </button>
//           </div>

//           {/* Divider */}
//           <div className="mt-8 flex items-center">
//             <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
//             <span className="px-4 text-gray-400 text-sm">or continue with</span>
//             <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
//           </div>

//           {/* Social Login */}
//           <div className="mt-6 grid grid-cols-2 gap-4">
//             <button className="flex items-center justify-center px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
//               <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
//                 <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//                 <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//                 <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//                 <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//               </svg>
//               Google
//             </button>
//             <button className="flex items-center justify-center px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
//               <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
//               </svg>
//               Facebook
//             </button>
//           </div>

//           {/* Sign up link */}
//           <p className="mt-8 text-center text-gray-400">
//             Don't have an account?{' '}
//             <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors duration-200 font-medium">
//               Sign up
//             </a>
//           </p>
//         </div>
//       </div>
//   );
// }

// // import { useState } from 'react';
// // import axios from '../../api/axios';
// // import { useNavigate } from 'react-router-dom';
// // import { useAuth } from '../../context/AuthContext';

// // export default function Login() {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const { login } = useAuth();
// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await axios.post('/auth/login', { email, password });
// //       login(res.data.token);
// //       navigate(res.data.role === 'admin' ? '/admin' : '/user');
// //     } catch {
// //       alert('Invalid credentials');
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 bg-white rounded">
// //       <h2 className="text-xl font-bold mb-4">Login</h2>
// //       <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border mb-3" />
// //       <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 border mb-3" />
// //       <button className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
// //     </form>
// //   );
// // }
