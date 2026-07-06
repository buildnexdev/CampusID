import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ScannerPage from './pages/ScannerPage';
import StudentProfilePage from './pages/StudentProfilePage';
import StudentDirectoryPage from './pages/StudentDirectoryPage';
import AddStudentPage from './pages/AddStudentPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/scanner" element={<ScannerPage />} />
          <Route path="/students" element={<StudentDirectoryPage />} />
          <Route path="/add-student" element={<AddStudentPage />} />
          <Route path="/students/:id" element={<StudentProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
