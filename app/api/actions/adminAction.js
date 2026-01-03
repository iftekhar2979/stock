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

export async function getAllUsers(page = 1, limit = 5) {
  try {
    await connectDB();
    const skip = (page - 1) * limit;

    // Get total count for pagination UI
    const totalUsers = await User.countDocuments();
    
    // Fetch paginated users
    const users = await User.find({})
      .select("-password")
      .sort({ createdAt: -1 }) // Newest first
      .skip(skip)
      .limit(limit)
      .lean();
    
    return {
      users: users.map(user => ({
        id: user._id.toString(),
        email: user.email,
        role: user.role,
        isBlocked: user.isBlocked || false,
      })),
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
      totalUsers
    };
  } catch (error) {
    console.error("Fetch Users Error:", error);
    throw new Error("Failed to fetch users");
  }
}