// lib/seed.js (Run this once manually if needed)
import bcrypt from "bcryptjs";
import { prisma } from "./db";

async function createFirstAdmin() {
  const hashedPassword = await bcrypt.hash("@!admin123", 12);
  await prisma.user.create({
    data: {
      email: "admin@niftyview.com",
      password: hashedPassword,
      role: "ADMIN"
    }
  });
}