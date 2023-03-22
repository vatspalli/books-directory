import express from "express";
import cors from "cors";
import { readFile, writeFile } from "fs/promises";

const app = express();
const port = 3000;
const corsOpts = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/getBooks", async (req, res) => {
  const books = JSON.parse(
    await readFile(new URL("../data/books.json", import.meta.url))
  );
  res.send(books);
});

app.post("/deleteBook", async (req, res) => {
  const reqBody = req.body;
  const bookName = reqBody.name;
  const books = JSON.parse(
    await readFile(new URL("../data/books.json", import.meta.url))
  );
  const newBooks = books.filter((element) => {
    return element.title != bookName;
  })
  writeFile(new URL("../data/books.json", import.meta.url), JSON.stringify(newBooks));
  res.send({status: 'Success'});
});

app.post("/addBook", async (req, res) => {
  const reqBody = req.body;
  const book = reqBody.book;
  const books = JSON.parse(
    await readFile(new URL("../data/books.json", import.meta.url))
  );
  books.push(book);
  writeFile(new URL("../data/books.json", import.meta.url), JSON.stringify(books));
  res.send({status: 'Success'});
})

app.listen(port, () => {
  console.log("Listening on port 3000");
});
