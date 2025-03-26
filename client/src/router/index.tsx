import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import Home from "@/components/Home";
import BookList from "@/components/books/BookList";
import CreateBook from "@/components/books/CreateBook";
import EditBook from "@/components/books/EditBook";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/books"
        element={
          <PrivateRoute>
            <BookList />
          </PrivateRoute>
        }
      />
      <Route
        path="/books/create"
        element={
          <PrivateRoute>
            <CreateBook />
          </PrivateRoute>
        }
      />
      <Route
        path="/books/edit/:id"
        element={
          <PrivateRoute>
            <EditBook />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
