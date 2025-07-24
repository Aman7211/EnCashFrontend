import { useEffect, useRef, useState } from 'react';
import axios from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import ReactToPrint from 'react-to-print';

function QRCodeCard({ coupon }) {
  const url = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(coupon.code)}&size=150x150`;

  return (
    <div className="border p-4 rounded shadow mb-4 text-center">
      <img src={url} alt="QR" className="mx-auto mb-2" />
      <p><strong>Code:</strong> {coupon.code}</p>
      <p><strong>Amount:</strong> ₹{coupon.amount}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const [amount, setAmount] = useState('');
  const [coupons, setCoupons] = useState([]);
  const { logout } = useAuth();
  const printRef = useRef();

  const fetchCoupons = async () => {
    const res = await axios.get('/admin/coupons');
    setCoupons(res.data);
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleGenerate = async () => {
    if (!amount || amount <= 0) return alert('Enter valid amount');
    const res = await axios.post('/admin/coupon', { amount: parseFloat(amount) });
    setCoupons([res.data, ...coupons]);
    setAmount('');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded">Logout</button>
      </div>

      <div className="mb-4">
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="p-2 border w-full rounded"
        />
        <button onClick={handleGenerate} className="mt-2 w-full bg-blue-600 text-white py-2 rounded">Generate QR</button>
      </div>

      <div className="my-4">
        <ReactToPrint
          trigger={() => <button className="bg-green-600 text-white px-4 py-2 rounded">Print All QR Codes</button>}
          content={() => printRef.current}
        />
      </div>

      <div ref={printRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {coupons.map(coupon => (
          <QRCodeCard key={coupon.code} coupon={coupon} />
        ))}
      </div>
    </div>
  );
}
