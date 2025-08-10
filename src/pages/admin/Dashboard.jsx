import { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";
import QRGenerator from "../../components/admin/QRGenerator";
import QRGeneratedCard from "../../components/admin/QRGeneratedCard";
import QRList from "../../components/admin/QRList";
import UserList from "../../components/admin/UserList";
import printQR from "../../utils/printQR";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [qrcodes, setQRCodes] = useState([]);
  const [amount, setAmount] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [generatedQR, setGeneratedQR] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to load users");
    }
  };

  const fetchQRCodes = async () => {
    try {
      const res = await API.get("/admin/qrcodes");
      setQRCodes(res.data);
    } catch (err) {
      toast.error("Failed to load QR codes");
    }
  };

const handleDeleteQR = async (code) => {
  try {
    await API.delete(`/admin/qrcode/code/${encodeURIComponent(code)}`);
    toast.success("QR Code deleted");
    fetchQRCodes(); 
  } catch (err) {
    console.error("Delete QR error:", err);
    toast.error("Failed to delete QR Code");
  }
};


  const generateQR = async () => {
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setIsGenerating(true);
    try {
      const res = await API.post("/admin/qrcode/generate", { amount });
      setGeneratedQR({
        code: res.data.code,
        amount: amount,
        timestamp: new Date().toLocaleString(),
      });
      toast.success(`QR Generated: ${res.data.code}`);
      setAmount("");
      fetchQRCodes();
    } catch (err) {
      toast.error("Failed to generate QR");
    } finally {
      setIsGenerating(false);
    }
  };

  const updateUser = async () => {
    try {
      await API.post(`/admin/user/${editingUser._id}/update`, {
        name: editingUser.name,
        wallet: editingUser.wallet,
      });
      toast.success("User updated");
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchQRCodes();
  }, []);

  return (
       <div className="container mx-auto px-6 py-8 max-w-7xl">
         {/* Header */}
           <div className="mb-8">
           <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
             Admin Dashboard
          </h1>
         <p className="text-gray-600">Monitor users, generate QR codes, and manage transactions</p>
         </div>
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <QRGenerator
          amount={amount}
          setAmount={setAmount}
          isGenerating={isGenerating}
          generateQR={generateQR}
        />
        {generatedQR && (
          <QRGeneratedCard
            generatedQR={generatedQR}
            printQR={() => printQR(generatedQR)}
          />
        )}
      </div>
      <UserList
        users={users}
        editingUser={editingUser}
        setEditingUser={setEditingUser}
        updateUser={updateUser}
      />
      <QRList qrcodes={qrcodes} onDelete={handleDeleteQR} />
    </div>
  );
}

// import { useEffect, useState } from 'react';
// import API from '../../services/api';
// import { toast } from 'react-toastify';
// import { QRCodeCanvas } from 'qrcode.react';

// function QRCodeDisplay({ code, size = 200 }) {
//   return (
//     <QRCodeCanvas
//       value={code}
//       size={size}
//       className="border-2 border-gray-200 rounded-xl shadow-sm bg-white"
//     />
//   );
// }

// export default function AdminDashboard() {
//   const [users, setUsers] = useState([]);
//   const [qrcodes, setQRCodes] = useState([]);
//   const [amount, setAmount] = useState('');
//   const [editingUser, setEditingUser] = useState(null);
//   const [generatedQR, setGeneratedQR] = useState(null);
//   const [isGenerating, setIsGenerating] = useState(false);

//   const fetchUsers = async () => {
//     try {
//       const res = await API.get('/admin/users');
//       setUsers(res.data);
//     } catch (err) {
//       toast.error("Failed to load users");
//     }
//   };

//   const fetchQRCodes = async () => {
//     try {
//       const res = await API.get('/admin/qrcodes');
//       setQRCodes(res.data);
//     } catch (err) {
//       toast.error("Failed to load QR codes");
//     }
//   };

//   const generateQR = async () => {
//     if (!amount || amount <= 0) {
//       toast.error("Please enter a valid amount");
//       return;
//     }

//     setIsGenerating(true);
//     try {
//       const res = await API.post('/admin/qrcode/generate', { amount });
//       setGeneratedQR({
//         code: res.data.code,
//         amount: amount,
//         timestamp: new Date().toLocaleString()
//       });
//       toast.success(`QR Generated: ${res.data.code}`);
//       setAmount('');
//       fetchQRCodes();
//     } catch (err) {
//       toast.error("Failed to generate QR");
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//  const printQR = () => {
//   if (!generatedQR) return;

//   const qrValue = generatedQR.code;

//   const printWindow = window.open('', '_blank');
//   printWindow.document.write(`
//     <html>
//       <head>
//         <title>QR Code - ${qrValue}</title>
//         <style>
//           body {
//             font-family: 'Arial', sans-serif;
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             padding: 40px;
//             background: #f8fafc;
//           }
//           .qr-container {
//             background: white;
//             text-align: center;
//             border: 3px solid #e2e8f0;
//             border-radius: 16px;
//             padding: 40px;
//             box-shadow: 0 10px 25px rgba(0,0,0,0.1);
//           }
//           h1 { color: #1e293b; margin-bottom: 10px; font-size: 28px; }
//           .amount { color: #059669; font-size: 24px; font-weight: bold; margin: 15px 0; }
//           .code { color: #6b7280; font-size: 16px; margin: 10px 0; }
//           .timestamp { color: #9ca3af; font-size: 14px; margin-top: 20px; }
//           img { margin: 20px 0; border: 2px solid #e2e8f0; border-radius: 12px; width: 300px; height: 300px; }
//         </style>
//       </head>
//       <body>
//         <div class="qr-container">
//           <h1>Payment QR Code</h1>
//           <div class="amount">₹${generatedQR.amount}</div>
//           <img id="qrImage" src="" alt="QR Code" />
//           <div class="code">Code: ${qrValue}</div>
//           <div class="timestamp">Generated: ${generatedQR.timestamp}</div>
//         </div>
//         <script src="https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js"></script>
//         <script>
//           QRCode.toDataURL("${qrValue}", { width: 300, margin: 2 }, function (err, url) {
//             if (!err) {
//               document.getElementById("qrImage").src = url;
//               setTimeout(() => window.print(), 500);
//             }
//           });
//         </script>
//       </body>
//     </html>
//   `);
// };

//   const updateUser = async () => {
//     try {
//       await API.post(`/admin/user/${editingUser._id}/update`, {
//         name: editingUser.name,
//         wallet: editingUser.wallet
//       });
//       toast.success("User updated");
//       setEditingUser(null);
//       fetchUsers();
//     } catch (err) {
//       toast.error("Update failed");
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//     fetchQRCodes();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
//       <div className="container mx-auto px-6 py-8 max-w-7xl">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
//             Admin Dashboard
//           </h1>
//           <p className="text-gray-600">Monitor users, generate QR codes, and manage transactions</p>
//         </div>

//         {/* QR Code Generator Section */}
//         <div className="grid lg:grid-cols-2 gap-8 mb-8">
//           <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
//             <div className="flex items-center mb-6">
//               <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
//                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                 </svg>
//               </div>
//               <h2 className="text-2xl font-bold text-gray-800">Generate QR Code</h2>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₹)</label>
//                 <input
//                   type="number"
//                   placeholder="Enter amount"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-lg"
//                   value={amount}
//                   onChange={(e) => setAmount(e.target.value)}
//                 />
//               </div>
//               <button
//                 onClick={generateQR}
//                 disabled={isGenerating}
//                 className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
//               >
//                 {isGenerating ? (
//                   <div className="flex items-center justify-center">
//                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                     Generating...
//                   </div>
//                 ) : (
//                   'Generate QR Code'
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Generated QR Code Display */}
//           {generatedQR && (
//             <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
//               <div className="text-center">
//                 <h3 className="text-2xl font-bold text-gray-800 mb-4">Generated QR Code</h3>
//                 <div className="flex justify-center mb-4">
//                   <QRCodeDisplay code={generatedQR.code} amount={generatedQR.amount} />
//                 </div>
//                 <div className="space-y-2 mb-6">
//                   <p className="text-3xl font-bold text-green-600">₹{generatedQR.amount}</p>
//                   <p className="text-gray-600">Code: <span className="font-mono font-semibold">{generatedQR.code}</span></p>
//                   <p className="text-sm text-gray-500">Generated: {generatedQR.timestamp}</p>
//                 </div>
//                 <button
//                   onClick={printQR}
//                   className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
//                 >
//                   <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
//                   </svg>
//                   Print QR Code
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Users Section */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
//           <div className="flex items-center mb-6">
//             <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center mr-4">
//               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800">Users Management</h2>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-gray-200">
//                   <th className="text-left py-4 px-6 font-semibold text-gray-700">Name</th>
//                   <th className="text-left py-4 px-6 font-semibold text-gray-700">Email</th>
//                   <th className="text-left py-4 px-6 font-semibold text-gray-700">Wallet Balance</th>
//                   <th className="text-left py-4 px-6 font-semibold text-gray-700">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map((u) => (
//                   <tr key={u._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
//                     <td className="py-4 px-6">
//                       <div className="flex items-center">
//                         <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold mr-3">
//                           {u.name.charAt(0).toUpperCase()}
//                         </div>
//                         <span className="font-medium text-gray-900">{u.name}</span>
//                       </div>
//                     </td>
//                     <td className="py-4 px-6 text-gray-600">{u.email}</td>
//                     <td className="py-4 px-6">
//                       <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
//                         ₹{u.wallet}
//                       </span>
//                     </td>
//                     <td className="py-4 px-6">
//                       <button
//                         className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
//                         onClick={() => setEditingUser({ ...u })}
//                       >
//                         Edit
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {editingUser && (
//             <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
//               <h3 className="text-xl font-bold text-gray-800 mb-4">Edit User</h3>
//               <div className="grid md:grid-cols-2 gap-4 mb-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
//                   <input
//                     type="text"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     value={editingUser.name}
//                     onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Wallet Balance</label>
//                   <input
//                     type="number"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     value={editingUser.wallet}
//                     onChange={(e) => setEditingUser({ ...editingUser, wallet: e.target.value })}
//                   />
//                 </div>
//               </div>
//               <div className="flex gap-3">
//                 <button
//                   className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
//                   onClick={updateUser}
//                 >
//                   Save Changes
//                 </button>
//                 <button
//                   className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-200"
//                   onClick={() => setEditingUser(null)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* QR Codes Section */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
//           <div className="flex items-center mb-6">
//             <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mr-4">
//               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800">All QR Codes</h2>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-gray-200">
//                   <th className="text-left py-4 px-6 font-semibold text-gray-700">Code</th>
//                   <th className="text-left py-4 px-6 font-semibold text-gray-700">Amount</th>
//                   <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
//                   <th className="text-left py-4 px-6 font-semibold text-gray-700">Used By</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {qrcodes.map((qr) => (
//                   <tr key={qr._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
//                     <td className="py-4 px-6">
//                       <span className="font-mono text-sm bg-gray-100 px-3 py-1 rounded-lg">{qr.code}</span>
//                     </td>
//                     <td className="py-4 px-6">
//                       <span className="font-semibold text-lg text-green-600">₹{qr.amount}</span>
//                     </td>
//                     <td className="py-4 px-6">
//                       {qr.isUsed ? (
//                         <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
//                           <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                           </svg>
//                           Used
//                         </span>
//                       ) : (
//                         <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
//                           <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                           </svg>
//                           Pending
//                         </span>
//                       )}
//                     </td>
//                     <td className="py-4 px-6 text-gray-600">{qr.usedBy || '—'}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
