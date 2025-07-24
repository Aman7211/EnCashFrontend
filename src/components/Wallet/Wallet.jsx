import React from 'react';

function Wallet({ balance }) {
  return (
    <div className="bg-green-100 p-4 rounded mb-6 shadow">
      <h2 className="text-xl font-bold">Wallet Balance</h2>
      <p className="text-2xl mt-2">₹{balance.toFixed(2)}</p>
    </div>
  );
}

export default Wallet;
