import dbConnect from "@/lib/mongodb";
import user from "@/models/user";
import { NextApiRequest, NextApiResponse } from "next";

export const config = { runtime: "nodejs" }; // Ensures Node.js environment

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  if (req.method === "GET") {
    const users = await user.find({});
    return res.status(200).json(users);
  }

  if (req.method === "POST") {
    const { name, email } = req.body;
    const newUser = new user({ name, email });
    await newUser.save();
    return res.status(201).json(newUser);
  }

  res.status(405).json({ message: "Method Not Allowed" });
}
