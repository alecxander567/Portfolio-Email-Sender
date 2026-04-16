import express from "express";
import { Resend } from "resend";

const router = express.Router();

router.post("/", async (req, res) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "alecxanderespaldon21@gmail.com",
      subject: `Portfolio Message from ${name}`,
      html: `
        <h2>New Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    res.status(200).json({ success: true, response });
  } catch (error) {
    console.error("Resend error:", JSON.stringify(error, null, 2));
    res.status(500).json({ error: "Failed to send email" });
  }
});

export default router;
