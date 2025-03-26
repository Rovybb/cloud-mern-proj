import { Request, RequestHandler, Response } from 'express';

const API_URL = 'http://localhost:3000/api/book';

export const getBooks: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { search, genre } = req.query;
        console.log('Get books request:', { search, genre });
        const response = await fetch(`${API_URL}?search=${search}&genre=${genre}`);
        const data = await response.json();
        console.log('Get books response:', { count: data.length });
        res.status(200).json(data);
    } catch (error) {
        console.error('Get books error:', error);
        res.status(500).json({ message: 'Error fetching books' });
    }
}

export const getBookById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        console.log('Get book by id request:', { id });
        const response = await fetch(`${API_URL}/${id}`);
        const data = await response.json();
        console.log('Get book by id response:', { id, found: !!data });
        res.status(200).json(data);
    } catch (error) {
        console.error('Get book by id error:', error);
        res.status(500).json({ message: 'Error fetching book' });
    }
}

export const createBook: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { title, author, genre, description } = req.body;
        console.log('Create book request:', { title, author, genre });
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, author, genre, description })
        });
        const data = await response.json();
        console.log('Create book response:', { id: data._id, title: data.title });
        res.status(201).json(data);
    } catch (error) {
        console.error('Create book error:', error);
        res.status(500).json({ message: 'Error creating book' });
    }
}

export const updateBook: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, author, genre, description } = req.body;
        console.log('Update book request:', { id, title, author, genre });
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, author, genre, description })
        });
        console.log('Update book response:', { id, success: response.ok });
        res.status(201).json({ message: 'Book updated successfully' });
    } catch (error) {
        console.error('Update book error:', error);
        res.status(500).json({ message: 'Error updating book' });
    }
}

export const deleteBook: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        console.log('Delete book request:', { id });
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        console.log('Delete book response:', { id, success: response.ok });
        res.status(201).json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error('Delete book error:', error);
        res.status(500).json({ message: 'Error deleting book' });
    }
}