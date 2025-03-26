import { Request, RequestHandler, Response } from 'express';

const API_URL = 'https://api.themoviedb.org/3';

export const discoverMovies: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { page = 1 } = req.query;
        const response = await fetch(`${API_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.MOVIE_DB_API_KEY}`,
                    'accept': 'application/json',
                }
            }
        );
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Get movies error:', error);
        res.status(500).json({ message: 'Error fetching movies' });
    }
};

export const searchMovies: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { query, page = 1 } = req.query;
        const response = await fetch(`${API_URL}/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.MOVIE_DB_API_KEY}`,
                    'accept': 'application/json',
                }
            }
        );
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Search movies error:', error);
        res.status(500).json({ message: 'Error searching movies' });
    }
};


