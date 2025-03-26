import { Request, RequestHandler, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  return secret;
};

const generateToken = (userId: string) => {
  return jwt.sign({ userId }, getJwtSecret(), {
    expiresIn: '24h',
  });
};

export const register: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    console.log('Register request:', { email, name });

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Registration failed: User already exists:', email);
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Create new user
    const user = new User({
      email,
      password,
      name,
    });

    await user.save();
    console.log('User registered successfully:', { userId: user._id, email: user.email });

    // Generate token
    const token = generateToken(user._id as string);

    const response = {
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      token,
    };
    console.log('Register response:', { userId: user._id, email: user.email });
    res.status(201).json(response);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log('Login request:', { email });

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Login failed: User not found:', email);
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Login failed: Invalid password for user:', email);
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // Generate token
    const token = generateToken(user._id as string);

    const response = {
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      token,
    };
    console.log('Login successful:', { userId: user._id, email: user.email });
    res.json(response);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 