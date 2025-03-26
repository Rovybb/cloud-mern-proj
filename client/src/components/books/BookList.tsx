import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BookResponse } from '@/types/Book';
import { bookService } from '@/services/books/bookService';
import { useAuth } from '@/hooks/useAuth';

const GENRES = ['History', 'Fantasy', 'Action'];

const BookList: React.FC = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<BookResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    fetchBooks();
  }, [token, search, genre]);

  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await bookService.getBooks(search, genre, token || localStorage.getItem('token') || '');
      setBooks(data as BookResponse[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch books');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this book?')) {
      return;
    }

    try {
      if (!token) return;
      await bookService.deleteBook(id, token);
      setBooks(books.filter(book => book.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete book');
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Books</h2>
        <Button className="cursor-pointer" onClick={() => navigate('/books/create')}>Add New Book</Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="flex-1">
          <Select value={genre} onValueChange={setGenre}>
            <SelectTrigger className="max-w-sm cursor-pointer">
              <SelectValue placeholder="Select genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="cursor-pointer" value=" ">All Genres</SelectItem>
              {GENRES.map((genre) => (
                <SelectItem className="cursor-pointer" key={genre} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading books...</div>
      ) : error ? (
        <div className="text-center py-8 text-destructive">{error}</div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.genre}</TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    {book.description}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      className="cursor-pointer"
                      variant="ghost" 
                      size="sm"
                      onClick={() => navigate(`/books/edit/${book.id}`)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-destructive hover:text-destructive cursor-pointer"
                      onClick={() => handleDelete(book.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default BookList;
