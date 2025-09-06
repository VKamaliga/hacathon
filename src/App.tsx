import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Homepage from './components/Homepage';
import SellItem from './components/SellItem';
import BuyItems from './components/BuyItems';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-gray-800 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'sell':
        return <SellItem onBack={() => setCurrentPage('home')} />;
      case 'buy':
        return <BuyItems onBack={() => setCurrentPage('home')} />;
      default:
        return <Homepage onNavigate={setCurrentPage} />;
    }
  };

  return renderPage();
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;