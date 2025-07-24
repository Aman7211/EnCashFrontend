import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [transactions, setTransactions] = useState([]);

  const handleRedeem = async () => {
    try {
      const res = await axios.post('/user/redeem', { code });
      setMessage(`₹${res.data.newBalance} credited successfully`);
      fetchTransactions();
      setCode('');
    } catch (err) {
      setMessage('Invalid or already used code');
    }
  };

  const fetchTransactions = async () => {
    const res = await axios.get('/user/transactions');
    setTransactions(res.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User Dashboard</h2>
        <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded">Logout</button>
      </div>

      <div className="mb-4 p-4 bg-green-100 rounded">
        <h3 className="text-lg font-bold">Wallet Balance</h3>
        <p className="text-2xl">₹{user?.walletBalance?.toFixed(2)}</p>
      </div>

      <div className="mb-4">
        <input
          placeholder="Enter QR Code"
          value={code}
          onChange={e => setCode(e.target.value)}
          className="p-2 border w-full rounded"
        />
        <button onClick={handleRedeem} className="mt-2 w-full bg-green-600 text-white py-2 rounded">Redeem</button>
        {message && <p className="mt-2 text-center">{message}</p>}
      </div>

      <div>
        <h3 className="text-lg font-bold mb-2">Transaction History</h3>
        <ul className="bg-white p-4 rounded shadow">
          {transactions.map((txn, idx) => (
            <li key={idx} className="border-b py-2">
              ₹{txn.amount} - {txn.couponCode} - {new Date(txn.date).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
