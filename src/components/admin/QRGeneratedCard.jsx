import QRCodeDisplay from './QRCodeDisplay';

export default function QRGeneratedCard({ generatedQR, printQR }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Generated QR Code</h3>
        <div className="flex justify-center mb-4">
          <QRCodeDisplay code={generatedQR.code} />
        </div>
        <div className="space-y-2 mb-6">
          <p className="text-3xl font-bold text-green-600">₹{generatedQR.amount}</p>
          <p className="text-gray-600">Code: <span className="font-mono font-semibold">{generatedQR.code}</span></p>
          <p className="text-sm text-gray-500">Generated: {generatedQR.timestamp}</p>
        </div>
        <button
          onClick={printQR}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
        >
          <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print QR Code
        </button>
      </div>
    </div>
  );
}
