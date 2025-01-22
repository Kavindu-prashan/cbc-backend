import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Get all users
export function getUser(req, res) {
  User.find()
    .then((userList) => {
      res.status(200).json({ list: userList });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Users not found',
        error: error.message,
      });
    });
}

// Create a new user
export function createUser(req, res) {
  const newUserData = req.body;

  // Admin validation
  if (newUserData.type === 'admin') {
    if (!req.user || req.user.type !== 'admin') {
      return res.status(403).json({
        message: 'Please login as administrator to create admin accounts',
      });
    }
  }

  newUserData.password = bcrypt.hashSync(newUserData.password, 10);

  const user = new User(newUserData);

  user
    .save()
    .then(() => {
      res.json({ message: 'User created' });
    })
    .catch((error) => {
      res.status(400).json({
        message: 'User not created',
        error: error.message,
      });
    });
}

// Login user
export function loginUser(req, res) {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (isPasswordCorrect) {
        const token = jwt.sign(
          {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            isBlocked: user.isBlocked,
            type: user.type,
            profilePicture: user.profilePicture,
          },
          process.env.secret,
          { expiresIn: '1h' }
        );

        res.json({
          message: 'User logged in',
          token,
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            type: user.type,
            profilePicture: user.profilePicture,
            email: user.email,
          },
        });
      } else {
        res.status(401).json({ message: 'Invalid password' });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error logging in', error });
    });
}

// Delete user
export function deleteUser(req, res) {
  User.deleteOne({ email: req.body.email })
    .then(() => {
      res.json({ message: 'User deleted' });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error deleting user', error });
    });
}

// Check admin status
export function isAdmin(req) {
  return req.user && req.user.type === 'admin';
}

// Check customer status
export function isCustomer(user) {
  return user && user.type === 'customer';
}

