import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { movieService } from '@/services/movies/movieService';
import { useAuth } from '@/hooks/useAuth';
import { Movie } from '@/types/Movie';

const SearchMovie: React.FC = () => {
  const { token } = useAuth();
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setPage(1);
    
    if (!token) {
      setError('Please login to search for movies');
      setIsLoading(false);
      return;
    }

    try {
      const response = await movieService.searchMovies(search, 1, token);
      setMovies(response.results);
      setTotalPages(response.total_pages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search movies');
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = async () => {
    if (!token || page >= totalPages) return;
    
    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const response = await movieService.searchMovies(search, nextPage, token);
      setMovies(prev => [...prev, ...response.results]);
      setPage(nextPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load more movies');
    } finally {
      setIsLoading(false);
    }
  };

  const renderMovieCard = (movie: Movie) => (
    <Card key={movie.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <div className="aspect-[2/3] relative">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="object-cover w-full h-full"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold truncate">{movie.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{movie.overview}</p>
        <p className="text-sm text-muted-foreground">
          {new Date(movie.release_date).getFullYear()}
        </p>
      </CardContent>
    </Card>
  );

  const renderContent = () => {
    if (error) {
      return <div className="text-destructive mb-4">{error}</div>;
    }

    if (isLoading && page === 1) {
      return <div className="text-center py-8">Searching movies...</div>;
    }

    if (movies.length === 0 && search) {
      return <div className="text-center py-8">No movies found</div>;
    }

    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map(renderMovieCard)}
        </div>

        {movies.length > 0 && page < totalPages && (
          <div className="flex justify-center mt-8">
            <Button 
              onClick={loadMore}
              disabled={isLoading}
              className="cursor-pointer"
            >
              {isLoading ? 'Loading...' : 'Load More'}
            </Button>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Search Movies</h1>
      </div>
      
      <Card>
        <CardContent className="p-4">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="space-y-2">
              <Input
                placeholder="Search by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="cursor-pointer"
              />
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full cursor-pointer"
            >
              {isLoading ? 'Searching...' : 'Search Movies'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {renderContent()}
    </div>
  );
};

export default SearchMovie;
