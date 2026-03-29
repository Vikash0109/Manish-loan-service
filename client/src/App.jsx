import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WhyChooseUsPage from './pages/WhyChooseUsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/why-clients-trust-us" element={<WhyChooseUsPage />} />
      <Route path="/why-choose-us" element={<Navigate to="/why-clients-trust-us" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

