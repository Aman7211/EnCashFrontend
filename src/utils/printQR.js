 export default function printQR(generatedQR) {
  if (!generatedQR) return;
  const qrValue = generatedQR.code;

  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html>
      <head>
        <title>QR Code - ${qrValue}</title>
        <style>
          body { 
            font-family: 'Arial', sans-serif; 
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            padding: 40px; 
            background: #f8fafc;
          }
          .qr-container { 
            background: white;
            text-align: center; 
            border: 3px solid #e2e8f0; 
            border-radius: 16px;
            padding: 40px; 
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          }
          h1 { color: #1e293b; margin-bottom: 10px; font-size: 28px; }
          .amount { color: #059669; font-size: 24px; font-weight: bold; margin: 15px 0; }
          .code { color: #6b7280; font-size: 16px; margin: 10px 0; }
          .timestamp { color: #9ca3af; font-size: 14px; margin-top: 20px; }
          img { margin: 20px 0; border: 2px solid #e2e8f0; border-radius: 12px; width: 300px; height: 300px; }
        </style>
      </head>
      <body>
        <div class="qr-container">
          <h1>Payment QR Code</h1>
          <div class="amount">₹${generatedQR.amount}</div>
          <img id="qrImage" src="" alt="QR Code" />
          <div class="code">Code: ${qrValue}</div>
          <div class="timestamp">Generated: ${generatedQR.timestamp}</div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js"></script>
        <script>
          QRCode.toDataURL("${qrValue}", { width: 300, margin: 2 }, function (err, url) {
            if (!err) {
              document.getElementById("qrImage").src = url;
              setTimeout(() => window.print(), 500);
            }
          });
        </script>
      </body>
    </html>
  `);
};