"use server"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongoose";
// import User from "@/models/User";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import User from "../../../models/users";

export async function adminCreateUser(formData) {
  // 1. Check if the person calling this is an Admin
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized: Only admins can create users.");
  }

  const { email, password, role } = formData;

  await connectDB();

  // 2. Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists.");

  // 3. Hash password and save
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = await User.create({
    email,
    password: hashedPassword,
    role: role || "USER",
    isBlocked: false
  });

  return { success: true, message: `User ${newUser.email} created!` };
}