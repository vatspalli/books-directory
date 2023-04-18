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
  try {
    const books = JSON.parse(
      await readFile(new URL("../data/books.json", import.meta.url))
    );
    res.status(200);
    res.send(books);
  } catch (error) {
    const respError = JSON.parse(JSON.stringify(error));
    respError.message = error?.message;
    res.status(404);
    res.send(respError);
  }
});

app.post("/deleteBook", async (req, res) => {
  const reqBody = req.body;
  const bookName = reqBody.name;
  try {
    const books = JSON.parse(
      await readFile(new URL("../data/books.json", import.meta.url))
    );
    const newBooks = books.filter((element) => {
      return element.title != bookName;
    })
    if(books.length === newBooks.length) {
      throw new Error('No such book exists');
    }
    writeFile(new URL("../data/books.json", import.meta.url), JSON.stringify(newBooks));
    res.status(200);
    res.send({status: 'Success'});
  } catch (error) {
    const respError = JSON.parse(JSON.stringify(error));
    respError.message = error?.message;
    res.status(404);
    res.send(respError);
  }
});

app.post("/addBook", async (req, res) => {
  const reqBody = req.body;
  const book = reqBody.book;
  const file = "../data/books.json";
  try {
    const books = JSON.parse(
      await readFile(new URL(file, import.meta.url))
    );
    books.push(book);
    writeFile(new URL(file, import.meta.url), JSON.stringify(books));
    res.status(200);
    res.send({status: 'Success'});
  } catch (error) {
    const respError = JSON.parse(JSON.stringify(error));
    respError.message = error?.message;
    res.status(404);
    res.send(respError);
  }
})

app.listen(port, () => {
  console.log("Listening on port 3000");
});
