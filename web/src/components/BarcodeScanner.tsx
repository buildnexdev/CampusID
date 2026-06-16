import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

interface BarcodeScannerProps {
  onScan: (barcodeId: string) => void;
  onError?: (message: string) => void;
}

export default function BarcodeScanner({ onScan, onError }: BarcodeScannerProps) {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [manualInput, setManualInput] = useState('');
  const containerId = 'kye-barcode-scanner';

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      containerId,
      {
        fps: 10,
        qrbox: { width: 280, height: 280 },
        rememberLastUsedCamera: true,
      },
      false
    );

    scanner.render(
      (decodedText) => {
        onScan(decodedText.trim());
        scanner.clear().catch(() => undefined);
      },
      () => undefined
    );

    scannerRef.current = scanner;

    return () => {
      scanner.clear().catch(() => undefined);
    };
  }, [onScan]);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = manualInput.trim();
    if (!value) {
      onError?.('Please enter a barcode ID');
      return;
    }
    onScan(value);
  };

  return (
    <div className="scanner-panel">
      <div id={containerId} className="scanner-viewport" />
      <div className="scanner-divider">
        <span>or enter barcode manually</span>
      </div>
      <form className="manual-entry-form" onSubmit={handleManualSubmit}>
        <input
          type="text"
          placeholder="e.g. KYE-STU-2024-001"
          value={manualInput}
          onChange={(e) => setManualInput(e.target.value)}
        />
        <button type="submit">Lookup Student</button>
      </form>
    </div>
  );
}
