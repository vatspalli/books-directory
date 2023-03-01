import express from "express";
import cors from "cors";
import { readFile } from "fs/promises";

const app = express();
const port = 3000;
const corsOpts = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));

app.get("/getBooks", async (req, res) => {
  const books = JSON.parse(
    await readFile(new URL("../data/books.json", import.meta.url))
  );
  res.send(books);
});

app.listen(port, () => {
  console.log("Listening on port 3000");
});
