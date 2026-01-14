import { useEffect } from 'react';
import { AuthProvider } from "./contexts/AuthContext";
import { OrderProvider } from './contexts/OrderProvider';
import AppContent from "./components/AppContent";
import { initializeMockData } from './services/mockApi';

function App() {
  useEffect(() => {
    initializeMockData();
  }, []);

  return (
    <AuthProvider>
      <OrderProvider>
        <div className="min-h-screen bg-gray-50">
          <AppContent />
        </div>
      </OrderProvider>
    </AuthProvider>
  );
}

export default App;