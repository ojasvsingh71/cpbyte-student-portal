import express from "express";
import { config } from "dotenv";

config();

const app = express();

app.use(express.json({ limit: "16kb" }));

app.get("/", (req, res) => {
  return res.send("Hello to server");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
