import { AuthProvider } from "./contexts/AuthContext"
import AppContent from "./components/AppContent"

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <AppContent />
      </div>
    </AuthProvider>
  )
}

export default App
