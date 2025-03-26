import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { loginService } from '@/services/auth/loginService';
import BookList from './books/BookList';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await loginService.logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="border-b">
        <div className="container flex h-16 items-center px-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">API Management</h1>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                Books
              </Button>
              {/* Add more API sections here */}
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container py-6">
        <BookList />
      </main>
    </div>
  );
};

export default Home;