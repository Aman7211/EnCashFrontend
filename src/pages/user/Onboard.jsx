import { useState } from 'react';
import API from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Onboard() {
  const [name, setName] = useState('');
  const email = localStorage.getItem('email');
  const navigate = useNavigate();

  const submit = async () => {
    try {
      await API.post('/user/save-info', { email, name });
      toast.success("User profile saved");
      navigate('/dashboard');
    } catch (err) {
      toast.error("Failed to save info");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded">
      <h2 className="text-xl font-bold mb-4">Complete Your Profile</h2>
      <input
        className="border p-2 w-full mb-4"
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={submit}>
        Save Info
      </button>
    </div>
  );
}
