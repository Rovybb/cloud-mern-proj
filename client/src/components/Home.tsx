import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const Home = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome to API Management</h1>
        <Button 
          onClick={handleLogout}
          variant="outline"
          className="cursor-pointer"
        >
          Logout
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Button 
          onClick={() => navigate('/books')}
          className="h-32 text-lg cursor-pointer"
        >
          Manage Books
        </Button>
        {/* Add more navigation buttons here as needed */}
      </div>
    </div>
  );
};

export default Home;