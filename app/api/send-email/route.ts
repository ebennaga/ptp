import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { feature, enabled } = await req.json();

    if (!enabled) {
      return NextResponse.json({ success: false });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, // smtp.mailtrap.io
      port: Number(process.env.MAIL_PORT), // 2525
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
      to: "testskysatn@yahoo.com",
      subject: "Mailtrap Test",
      html: "<p>Email berhasil dikirim 🎉</p>",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
