import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { config } from "dotenv";
import jwt from "jsonwebtoken";

import prisma from "../config/db.js";
import ResponseError from "../types/ResponseError.js";

config();

export const login = asyncHandler(async (req, res) => {
  const { library_id, password } = req.body;

  const user = await prisma.user.findUnique({ where: { library_id } });
  if (!user) throw new ResponseError("User does not exist", 401);

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new ResponseError("Invalid credentials", 401);

  const token = jwt.sign(
    { userId: user.id, library_id: user.library_id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ success: true, message: "Login successfull", data: token });
});

export const register = asyncHandler(async (req, res) => {
  const { name, library_id, email, role, domain_dev, domain_dsa } = req.body;

  const existingUser = await prisma.user.findUnique({ where: { library_id } });
  if (existingUser) throw new ResponseError("User already exists", 400);

  const existingEmail = await prisma.user.findUnique({ where: { email } });
  if (existingEmail) throw new ResponseError("Email already registered", 400);

  // @todo! Generate a random password here
  const hashedPassword = bcrypt.hashSync("TestPass123", 10);

  const user = await prisma.user.create({
    data: {
      name,
      library_id,
      email,
      role,
      domain_dev,
      domain_dsa,
      password: hashedPassword,
    },
  });

  // @todo! Mail the generated password to the user through their email

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: user,
  });
});
