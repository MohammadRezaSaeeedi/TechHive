import User from "@/models/User";
import { hashPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();
    const { name, lastName, phoneNumber, email, password, gender } = data;

    if (!name || !lastName || !phoneNumber || !email || !password || !gender) {
      return NextResponse.json(
        { error: "Please enter valid information" },
        { status: 422 }
      );
    }
    const existingEmail = await User.findOne({ email });
    const existingPhoneNumber = await User.findOne({ phoneNumber });
    if (existingEmail) {
      return NextResponse.json(
        { error: "There is a user account with email or phone" },
        { status: 422 }
      );
    }

    if (existingPhoneNumber) {
      return NextResponse.json(
        { error: "There is a user account with email or phone" },
        { status: 422 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      name,
      lastName,
      phoneNumber,
      email,
      password: hashedPassword,
      gender,
    });

    return NextResponse.json(
      { message: "New user added successfully " },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "A problem has occurred on the server" },
      { status: 500 }
    );
  }
}
