import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { movieService } from "@/services/movies/movieService";
import { Movie } from "@/types/Movie";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

const DiscoverMovie: React.FC = () => {
  const { token } = useAuth();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!token) return;

      try {
        setIsLoading(true);
        const response = await movieService.discoverMovies(page, token);
        console.log(response);
        setMovies((prev) =>
          page === 1 ? response.results : [...prev, ...response.results]
        );
        setTotalPages(response.total_pages);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch movies");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [page, token]);

  const loadMore = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const renderMovieCard = (movie: Movie) => (
    <Card
      key={movie.id}
      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="aspect-[2/3] relative">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="object-cover w-full h-full"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold truncate">{movie.title}</h3>
        <p className="text-sm text-muted-foreground">{movie.overview}</p>
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

    if (isLoading) {
      return <div className="text-center py-8">Loading movies...</div>;
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
              {isLoading ? "Loading..." : "Load More"}
            </Button>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Discover Movies</h1>
        <Button>
          <Link to="/movies/search">Search Movies</Link>
        </Button>
      </div>
      {renderContent()}
    </div>
  );
};

export default DiscoverMovie;
