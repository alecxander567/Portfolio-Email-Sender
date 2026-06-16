import "dotenv/config";
import express from "express";
import cors from "cors";
import contactRoute from "./routes/contact.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://192.168.1.99:3000",
      "https://portfolio-website-eta-one-70.vercel.app",
      // Add your new backend URL for testing
      "https://portfolio-email-sender-71gf.onrender.com",
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Accept"],
  }),
);
app.use(express.json());

app.use("/api/contact", contactRoute);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong", success: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
