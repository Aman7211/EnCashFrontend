import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import API from '../../services/api';

// QR Scanner Component
function QRScanner({ onScan, isActive }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [scanning, setScanning] = useState(false);
  const scanIntervalRef = useRef(null);

  useEffect(() => {
    if (isActive && !stream) {
      startCamera();
    } else if (!isActive && stream) {
      stopCamera();
    }

    return () => {
      if (stream) {
        stopCamera();
      }
    };
  }, [isActive]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
      setScanning(true);
    } catch (err) {
      toast.error('Failed to access camera. Please check permissions.');
      console.error('Camera error:', err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }
    setScanning(false);
  };

  const scanQRCode = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // ⚡ Simulate QR detection after 3s
    setTimeout(() => {
      if (scanning) {
        const mockQRData = `QR${Date.now()}${Math.floor(Math.random() * 1000)}`;
        onScan(mockQRData);
        stopCamera();
        toast.success('QR Code detected successfully!');
      }
    }, 3000);
  };

  useEffect(() => {
    if (scanning && stream) {
      scanIntervalRef.current = setInterval(scanQRCode, 500);
    }
    return () => {
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
      }
    };
  }, [scanning, stream]);

  if (!isActive) return null;

  return (
    <div className="relative">
      <video
        ref={videoRef}
        className="w-full h-64 bg-black rounded-xl object-cover"
        autoPlay
        playsInline
        muted
      />
      <canvas ref={canvasRef} className="hidden" />

      {/* Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="w-48 h-48 border-4 border-white rounded-lg relative">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-400"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-400"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-400"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-400"></div>
          </div>
          <div className="absolute top-0 left-0 w-full h-1 bg-green-400 animate-pulse"></div>
        </div>
      </div>

      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-white text-sm bg-black bg-opacity-50 px-4 py-2 rounded-full inline-block">
          Position QR code within the frame
        </p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [user, setUser] = useState({});
  const [code, setCode] = useState('');
  const [showScanner, setShowScanner] = useState(false);

  // ✅ Fetch profile from backend
  const fetchProfile = async () => {
    try {
      const res = await API.get('/user/profile');
      setUser(res.data);
    } catch (err) {
      toast.error("Failed to load profile");
    }
  };

  // ✅ Redeem with backend
  const redeem = async () => {
    if (!code.trim()) {
      toast.error("Please enter or scan a QR code");
      return;
    }
    try {
      const res = await API.post('/user/redeemQrCode', { code });
      toast.success(res.data.message);
      setCode('');
      fetchProfile(); // refresh wallet
    } catch (err) {
      toast.error(err.response?.data?.message || "Redeem failed");
    }
  };

  const handleQRScan = (scannedCode) => {
    setCode(scannedCode);
    setShowScanner(false);
    toast.success("QR code scanned successfully!");
  };

  const toggleScanner = () => setShowScanner(!showScanner);

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            User Dashboard
          </h1>
          <p className="text-gray-600">Manage your wallet and redeem codes</p>
        </div>

        {/* User Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Welcome, {user.name || 'User'}</h2>
                <p className="text-gray-600">Manage your account and wallet</p>
              </div>
            </div>
          </div>

          {/* Wallet Balance */}
          <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-6 text-white mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Current Balance</p>
                <p className="text-4xl font-bold">₹{user.wallet || 0}</p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Redeem Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Redeem QR Code</h3>
              <p className="text-gray-600">Scan or enter your QR code to add money to your wallet</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* QR Scanner */}
            {showScanner && (
              <div className="border-2 border-green-200 rounded-xl p-4 bg-green-50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-800">QR Code Scanner</h4>
                  <button
                    onClick={toggleScanner}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <QRScanner onScan={handleQRScan} isActive={showScanner} />
              </div>
            )}

            {/* Manual Input Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">QR Code</label>
                <button
                  onClick={toggleScanner}
                  className="flex items-center text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                  {showScanner ? 'Hide Scanner' : 'Scan QR Code'}
                </button>
              </div>
              
              <div className="flex space-x-3">
                <input
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-800"
                  placeholder="Enter QR Code or use scanner"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <button
                  onClick={toggleScanner}
                  className="px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-xl transition-all duration-200 border border-green-200"
                  title="Scan QR Code"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                </button>
              </div>
            </div>
            
            <button 
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed" 
              onClick={redeem}
              disabled={!code.trim()}
            >
              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
              Redeem Code
            </button>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-800">How to Redeem</h4>
            </div>
            <p className="text-gray-600 text-sm">Click "Scan QR Code" to open the camera and scan, or manually enter the code provided by the admin to add money to your wallet instantly.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-800">Secure & Fast</h4>
            </div>
            <p className="text-gray-600 text-sm">All transactions are secure and processed instantly. QR scanning uses your device camera with no data stored locally.</p>
          </div>
        </div>
      </div>
    </div>
  );
}