import { QRCodeCanvas } from 'qrcode.react';

export default function QRCodeDisplay({ code, size = 200 }) {
  return (
    <QRCodeCanvas
      value={code}
      size={size}
      className="border-2 border-gray-200 rounded-xl shadow-sm bg-white"
    />
  );
}
