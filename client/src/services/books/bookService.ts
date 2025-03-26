import { Book } from '@/types/Book';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/books';

export const getBooks = async (search: string, genre: string, token: string) => {
    try {
        const response = await axios.get(`${API_URL}?search=${search}&genre=${genre}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
}

export const getBookById = async (id: string, token: string) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching book:', error);
        throw error;
    }
}

export const createBook = async (book: Book, token: string) => {
    try {
        const response = await axios.post(API_URL, book, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating book:', error);
        throw error;
    }
}

export const updateBook = async (id: string, book: Book, token: string) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, book, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating book:', error);
        throw error;
    }
}

export const deleteBook = async (id: string, token: string) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error;
    }
}

export const bookService = {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
}
