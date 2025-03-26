import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/auth/AuthProvider';
import { AppRouter } from './router';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppRouter />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
