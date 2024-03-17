import { Resend } from "resend";
import { EmailAdmin } from "../../../components/Emails/EmailAdmin";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_KEY);

export async function POST() {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["ignaciofronttest@gmail.com"],
      subject: `Juanse compró un plan`,
      react: EmailAdmin({
        nombre: "Juanse",
        email: "juansegundomartinez@gmail.com",
        dni: "12345678",
      }),
    });

    return Response.json({ message: "Email Sent" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Error" }, { status: 500 });
  }
}
