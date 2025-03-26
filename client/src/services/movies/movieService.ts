import axios from 'axios';
import { MovieListResponse } from '@/types/Movie';

const API_URL = 'http://localhost:5000/api/movies';


export const discoverMovies = async (page: number, token: string) => {
    try {
        const response = await axios.get<MovieListResponse>(`${API_URL}/discover?page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error discovering movies:', error);
        throw error;
    }
}

export const searchMovies = async (query: string, page: number, token: string) => {
    try {
        const response = await axios.get<MovieListResponse>(`${API_URL}/search?query=${query}&page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error searching movies:', error);
        throw error;
    }
}

export const movieService = {
    discoverMovies,
    searchMovies
}
