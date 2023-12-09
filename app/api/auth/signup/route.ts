import { prisma } from "@/lib/prisma";
import argon from "argon2";
import { transporter } from "@/lib/email";
import { v4 as uuidv4 } from "uuid";
import { signUpFormSchema } from "@/lib/validation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { name, email, password } = await req.json();
        const validation = signUpFormSchema.validate({ name, email, password });
        if (validation.error) {
            return NextResponse.json(
                {
                    error: "Invalid information",
                },
                { status: 401 }
            );
        }
        const user = await prisma.user.findUnique({
            where: {
              email: email,
            },
        });
        if (user) {
            return NextResponse.json(
                {
                    error: "Email is already in use",
                },
                { status: 401 }
            );
        }
        const hashedPassword = await argon.hash(password);
        const token = uuidv4();
        await prisma.user.create({
            data: { email, password: hashedPassword, name },
        });
        await transporter.sendMail({
            from: "Stats Dashboard",
            to: email,
            subject: "Welcome to Our App",
            text: "Thank you for registering. Please verify your email.",
            html: `<b>Thank you for registering. Please verify your email.</b></br><a href="${process.env.NEXTAUTH_URL}verify?email=${email}&code=${token}" target="_blank">Verify your account to login</a>` ,
        });
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 1);
        await prisma.verificationToken.create({
            data: { token, email, expires: expirationDate },
        });
        return NextResponse.json(
            "User created please check email for verification code!"
        );

    } catch (error) {
				console.log(error);
        return NextResponse.json(
            {
                error: "Server error",
            },
            { status: 401 }
        );
    }
}
