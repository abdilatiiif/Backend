import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

// what is a request body? -> contains data sent by the client to the server(POST / PUT requests)

export const signUp = async (req, res, next) => {
  // Implementation sign-up logic

  const session = await mongoose.startSession();
  session.startTransaction(); // atomic operations / updates

  try {
    const { name, email, password } = req.body;

    // Check if user already exists

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    // Hash password - securely store passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUsers = await User.create(
      [{ name, email, password: hashedPassword }],
      { session } // if session error, transaction will not work
    );

    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    // save user to database

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      sucess: true,
      message: "User created successfully",
      data: { token, user: newUsers[0] },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  // Implementation sign-in logic
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("invalid password");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  // Implementation sign-out logic
};
