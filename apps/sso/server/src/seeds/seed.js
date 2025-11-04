/* eslint n/no-process-exit: "off" */
import { User } from "../models/user.model.js";
import { connectDB } from "@shared/config/db";
import { logger } from "@shared/utils/logger";
import { env } from "../config/env.js";
import bcrypt from "bcryptjs";

const seedUsers = [
  { userId: "2310001", username: "an.nguyen", mail: "an.nguyen@example.com", password: "123456" },
  { userId: "2310002", username: "kiet.tran", mail: "kiet.tran@example.com", password: "654321" },
  { userId: "2310003", username: "ha.lam", mail: "ha.lam@example.com", password: "112233" },
];

const importData = async () => {
  try {
    await connectDB(env.MONGO_URI);

    await User.deleteMany();

    const hashedUsers = await Promise.all(
      seedUsers.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    );

    await User.insertMany(hashedUsers);
    logger.info("Seed data imported successfully");
    process.exit();
  } catch (error) {
    console.error("Error", error);
    process.exit(1);
  }
};

importData();
