import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BarcodeScanner from '../components/BarcodeScanner';
import { fetchStudentByBarcode } from '../services/api';

export default function ScannerPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScan = useCallback(
    async (barcodeId: string) => {
      setLoading(true);
      setError(null);

      try {
        const student = await fetchStudentByBarcode(barcodeId);
        navigate(`/students/${student.id}`, { state: { fromScanner: true } });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to lookup student');
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  return (
    <div className="page scanner-page">
      <div className="page-header">
        <h1>Barcode Scanner</h1>
        <p>Scan a student ID card or enter the barcode manually to view their profile.</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {loading && <div className="alert alert-info">Looking up student...</div>}

      <BarcodeScanner onScan={handleScan} onError={setError} />

      <div className="demo-hint">
        <p>Demo barcodes for testing:</p>
        <code>KYE-STU-2024-001</code>
        <code>KYE-STU-2024-002</code>
      </div>
    </div>
  );
}
