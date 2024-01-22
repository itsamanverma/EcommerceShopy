import connectToDB from "@/database";
import User from "@/models/user";
import { hash } from "bcryptjs";
import Joi from "joi";
import dynamic from "next/dynamic";
import { NextResponse } from "next/server";

const schema = Joi.Object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  await connectToDB();
  const { name, email, password, role } = await req.json();

  const { error } = schema.validate({ name, email, password, role });

  if (error) {
    return NextResponse.json({
      success: false,
      message: email.details[0],
    });
  }

  try {
    let isUserAlreadyExist = await User.findOne({ email });
    if (isUserAlreadyExist) {
      throw new Error("Email already in use, Please Try different Email...");
    } else {
      let hashPassword = await hash(password, 12);
      let user = await User.create({
        name,
        email,
        password: hashPassword,
        role,
      });

      if (user) {
        return NextResponse.json({
          success: true,
          message: "user Successfully Registered ...!",
        });
      }
    }
  } catch (error) {
    throw error;
  }
}
